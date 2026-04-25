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
            const formattedHistory = historyData.map((msg) => ({
              id: msg.id,
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

  const addMessageToChat = (text, sender, avatar, id = null) => {
    const newMessage = {
      id: id || (Date.now() + Math.random()), 
      text, 
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage.id;
  };

  const handleSendMessage = async (text, isRetry = false) => {
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

    if (!isRetry) {
      addMessageToChat(text, 'user', USER_AVATAR);
    }
    
    setInputValue(''); 
    setIsTyping(true);
    
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

      const { transliterated_text, user_msg_id, ai_msg_id } = responseData;

      if (transliterated_text) {
        setMessages(prev => {
          const updated = [...prev];
          // Update the ID of the last user message if it was a new send
          if (!isRetry) {
            for (let i = updated.length - 1; i >= 0; i--) {
              if (updated[i].sender === 'user') {
                updated[i].id = user_msg_id;
                break;
              }
            }
          }
          // Add or Update AI message
          updated.push({
            id: ai_msg_id,
            text: transliterated_text,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: chatConfig.avatar
          });
          return updated;
        });
      } else if (responseData.error) {
        const code = responseData.code ? ` [${responseData.code}]` : '';
        addMessageToChat(`⚠️ ${responseData.error}${code}`, 'ai', chatConfig.avatar);
      }
    } catch (error) {
      console.error("Error calling transliteration API:", error);
      addMessageToChat("Boliyan is having trouble connecting. Please check the backend.", 'ai', chatConfig.avatar);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = async (messageId) => {
    const msgIndex = messages.findIndex(m => m.id === messageId);
    if (msgIndex === -1 || messages[msgIndex].sender !== 'user') return;

    // In-place: Discard all subsequent messages
    const keptMessages = messages.slice(0, msgIndex + 1);
    setMessages(keptMessages);
    
    // Resend
    await handleSendMessage(messages[msgIndex].text, true);
  };

  const handleEdit = async (messageId) => {
    const msg = messages.find(m => m.id === messageId);
    if (!msg || msg.sender !== 'user') return;

    const newText = window.prompt("Edit your message and resend:", msg.text);
    if (newText !== null && newText.trim() !== "" && newText !== msg.text) {
      try {
        // If it's a numeric ID (from DB), sync with backend
        if (typeof messageId === 'number' || !isNaN(Number(messageId))) {
          const dbId = parseInt(messageId);
          await fetch(`${BASE_API_URL}/messages/${dbId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText })
          });
        }
        
        // Update local state and trigger in-place retry
        setMessages(prev => {
          const msgIndex = prev.findIndex(m => m.id === messageId);
          if (msgIndex === -1) return prev;
          const updated = prev.slice(0, msgIndex + 1);
          updated[msgIndex].text = newText;
          return updated;
        });
        
        // Trigger the regeneration
        await handleSendMessage(newText, true);
      } catch (error) {
        console.error("Error editing message:", error);
      }
    }
  };


  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <div className="w-full h-full bg-ivory dark:bg-dark-surface shadow-whisper rounded-featured flex flex-col overflow-hidden border border-border-cream dark:border-border-dark transition-colors duration-300">
        <ChatHeader chatName={chatConfig.name} aiAvatar={chatConfig.avatar} />
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          aiAvatar={chatConfig.avatar}
          userAvatar={USER_AVATAR}
          onRetry={handleRetry}
          onEdit={handleEdit}
        />
        <ChatFooter
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          isFunctional={chatConfig.isFunctional}
        />
      </div>
    </div>
  );
}




export default ChatPage;