import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatFooter from '../components/ChatFooter';

// ... (AI_AVATAR constants, FLASK_API_URL, getChatConfig remain the same)
const AI_AVATAR_BOLIYAN = "/ai-avatar.png";
const USER_AVATAR = "https://ui-avatars.com/api/?name=User&background=e8e6dc&color=4d4c48&bold=true";
const BASE_API_URL = import.meta.env.DEV
  ? "http://127.0.0.1:5000/api"
  : "https://anmol-lipi-transliterator.onrender.com/api";

const TRANSLITERATE_API_URL = `${BASE_API_URL}/transliterate`;
const HISTORY_API_URL = `${BASE_API_URL}/history`;

const getChatConfig = (chatId) => {
  switch (chatId) {
    case 'anmol-lipi':
      return {
        name: 'Boliyan - Anmol Lipi',
        avatar: AI_AVATAR_BOLIYAN,
        initialMessage: "hYlo jI AMgryzI iv`c ku`J vI ilKo qy mYN ausnU pMjwbI iv`c ilK` dW gw",
        isFunctional: true,
      };
    case 'gurbani-hindi':
      return {
        name: 'Boliyan - Gurbani Hindi',
        avatar: AI_AVATAR_BOLIYAN,
        initialMessage: "Welcome to Gurbani Hindi. This chat is currently under development.",
        isFunctional: false,
      };
    case 'prabhki':
      return {
        name: 'Boliyan - Prabhki',
        avatar: AI_AVATAR_BOLIYAN,
        initialMessage: "Welcome to Prabhki. This chat is currently under development.",
        isFunctional: false,
      };
    default:
      return {
        name: 'Boliyan - Unknown Chat',
        avatar: AI_AVATAR_ANMOL,
        initialMessage: "This chat does not exist or is unavailable.",
        isFunctional: false,
      };
  }
};


function ChatPage() {
  const { chatId, sessionId } = useParams();
  const navigate = useNavigate();
  const chatConfig = getChatConfig(chatId);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const initialMsg = {
        id: 'initial',
        text: chatConfig.initialMessage,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: chatConfig.avatar,
      };

      if (sessionId) {
        try {
          const response = await fetch(`${HISTORY_API_URL}/${sessionId}`);
          if (response.ok) {
            const historyData = await response.json();
            const formattedHistory = historyData.map((msg, index) => ({
              id: `history-${index}`,
              text: msg.text,
              sender: msg.sender,
              timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              avatar: msg.sender === 'ai' ? chatConfig.avatar : USER_AVATAR,
            }));
            setMessages([initialMsg, ...formattedHistory]);
          } else {
            setMessages([initialMsg]);
          }
        } catch (error) {
          console.error("Error fetching history:", error);
          setMessages([initialMsg]);
        }
      } else {
        setMessages([initialMsg]);
      }
    };

    loadSession();
    setInputValue('');
  }, [chatId, sessionId, chatConfig.initialMessage, chatConfig.avatar]);

  const addMessageToChat = (text, sender, avatar) => {
    const newMessage = {
      id: Date.now() + Math.random(), text, sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || !chatConfig.isFunctional) {
      if (!chatConfig.isFunctional) {
        addMessageToChat("This chat is not active for sending messages.", 'ai', chatConfig.avatar);
      }
      return;
    }

    let activeSessionId = sessionId;
    const isNewSession = !activeSessionId;

    if (isNewSession) {
        activeSessionId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
        navigate(`/chat/${chatId}/${activeSessionId}`, { replace: true });
        window.dispatchEvent(new Event('sessionUpdate'));
    }

    addMessageToChat(text, 'user', USER_AVATAR);
    setInputValue(''); setIsTyping(true);
    
    try {
      const response = await fetch(TRANSLITERATE_API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ 
            text: text, 
            session_id: activeSessionId,
            chat_type: chatId
        }),
      });
      
      let responseData;
      if (!response.ok) {
        let errorMsg = `Boliyan encountered an issue (HTTP ${response.status}).`;
        let errorCode = null;
        try {
          responseData = await response.json();
          if (responseData && responseData.error) { errorMsg = responseData.error; }
          if (responseData && responseData.code) { errorCode = responseData.code; }
        } catch (e) { }
        const displayMsg = errorCode ? `⚠️ ${errorMsg}\n\n[Error: ${errorCode}]` : `⚠️ ${errorMsg}`;
        addMessageToChat(displayMsg, 'ai', chatConfig.avatar);
        setIsTyping(false); return;
      }

      responseData = await response.json();
      
      if (isNewSession) {
        window.dispatchEvent(new Event('sessionUpdate'));
      }

      if (responseData.transliterated_text) {
        addMessageToChat(responseData.transliterated_text, 'ai', chatConfig.avatar);
      } else if (responseData.error) {
        const code = responseData.code ? ` [${responseData.code}]` : '';
        addMessageToChat(`⚠️ ${responseData.error}${code}`, 'ai', chatConfig.avatar);
      } else {
        addMessageToChat("Boliyan received an unexpected response.", 'ai', chatConfig.avatar);
      }
    } catch (error) {
      console.error("Error calling transliteration API:", error);
      addMessageToChat("Boliyan is having trouble connecting. Please check the backend.", 'ai', chatConfig.avatar);
    } finally {
      setIsTyping(false);
    }
  };

  const findLastAiMessageText = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'ai') { return messages[i].text; }
    }
    return null;
  };
  
  const lastAiMessageText = findLastAiMessageText();

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <div className="w-full h-full bg-ivory dark:bg-dark-surface shadow-whisper rounded-featured flex flex-col overflow-hidden border border-border-cream dark:border-border-dark transition-colors duration-300">
        <ChatHeader chatName={chatConfig.name} aiAvatar={chatConfig.avatar} />
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          aiAvatar={chatConfig.avatar}
          userAvatar={USER_AVATAR}
        />
        <ChatFooter
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          lastAiMessageText={lastAiMessageText}
          isFunctional={chatConfig.isFunctional}
        />
      </div>
    </div>
  );
}




export default ChatPage;