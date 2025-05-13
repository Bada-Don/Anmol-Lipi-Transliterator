import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatFooter from '../components/ChatFooter';

// ... (AI_AVATAR constants, FLASK_API_URL, getChatConfig remain the same)
const AI_AVATAR_ANMOL = "https://placehold.co/40x40/00c2ff/0a0f1f?text=AL&font=orbitron";
const AI_AVATAR_GURBANI = "https://placehold.co/40x40/ffab00/0a0f1f?text=GH&font=orbitron";
const AI_AVATAR_PRABHKI = "https://placehold.co/40x40/f50057/0a0f1f?text=P&font=orbitron";
const USER_AVATAR = "https://placehold.co/40x40/7f5af0/ffffff?text=U&font=inter";
const FLASK_API_URL = "https://anmol-lipi-transliterator.onrender.com/api/transliterate";

const getChatConfig = (chatId) => { /* ... same as before ... */
    switch (chatId) {
        case 'anmol-lipi':
            return {
                name: 'AURA.AI - Anmol Lipi',
                avatar: AI_AVATAR_ANMOL,
                initialMessage: "Hello! I am Aura, your Anmol Lipi assistant. Send English text for transliteration.",
                isFunctional: true,
            };
        case 'gurbani-hindi':
            return {
                name: 'AURA.AI - Gurbani Hindi',
                avatar: AI_AVATAR_GURBANI,
                initialMessage: "Welcome to Gurbani Hindi. This chat is currently under development.",
                isFunctional: false,
            };
        case 'prabhki':
            return {
                name: 'AURA.AI - Prabhki',
                avatar: AI_AVATAR_PRABHKI,
                initialMessage: "Welcome to Prabhki. This chat is currently under development.",
                isFunctional: false,
            };
        default:
            return {
                name: 'AURA.AI - Unknown Chat',
                avatar: AI_AVATAR_ANMOL,
                initialMessage: "This chat does not exist or is unavailable.",
                isFunctional: false,
            };
    }
};


function ChatPage() {
    const { chatId } = useParams();
    const chatConfig = getChatConfig(chatId);

    const [messages, setMessages] = useState([ /* ... same initialization ... */
      {
        id: Date.now(),
        text: chatConfig.initialMessage,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: chatConfig.avatar,
      }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => { /* ... same as before ... */
        setMessages([
            {
                id: Date.now(),
                text: chatConfig.initialMessage,
                sender: "ai",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: chatConfig.avatar,
            }
        ]);
        setInputValue('');
    }, [chatId, chatConfig.initialMessage, chatConfig.avatar]);

    const addMessageToChat = (text, sender, avatar) => { /* ... same as before ... */
        const newMessage = {
          id: Date.now() + Math.random(), text, sender,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };
    const handleSendMessage = async (text) => { /* ... same as before ... */
        if (!text.trim() || !chatConfig.isFunctional) {
            if (!chatConfig.isFunctional) {
                addMessageToChat("This chat is not active for sending messages.", 'ai', chatConfig.avatar);
            }
            return;
        }
        addMessageToChat(text, 'user', USER_AVATAR);
        setInputValue(''); setIsTyping(true);
        try {
          const response = await fetch(FLASK_API_URL, {
            method: 'POST', headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ text: text }),
          });
          let responseData;
          if (!response.ok) {
            let errorMsg = `Aura encountered an issue (HTTP ${response.status}).`;
            try {
                responseData = await response.json();
                if (responseData && responseData.error) { errorMsg = responseData.error; }
            } catch (e) { /* Ignore */ }
            addMessageToChat(errorMsg, 'ai', chatConfig.avatar);
            setIsTyping(false); return;
          }
          responseData = await response.json();
          if (responseData.transliterated_text) {
            addMessageToChat(responseData.transliterated_text, 'ai', chatConfig.avatar);
          } else if (responseData.error) {
            addMessageToChat(responseData.error, 'ai', chatConfig.avatar);
          } else {
            addMessageToChat("Aura received an unexpected response.", 'ai', chatConfig.avatar);
          }
        } catch (error) {
          console.error("Error calling transliteration API:", error);
          addMessageToChat("Aura is having trouble connecting. Please check the backend.", 'ai', chatConfig.avatar);
        } finally {
          setIsTyping(false);
        }
    };
    const findLastAiMessageText = () => { /* ... same as before ... */
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].sender === 'ai') { return messages[i].text; }
        }
        return null;
    };
    const lastAiMessageText = findLastAiMessageText();

  return (
    // This outer div should fill the available height in the main content area
    // The max-w-4xl and mx-auto will center it horizontally if there's extra space.
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col"> {/* h-full to use available vertical space */}
        {/* The actual chat box, designed to also fill height */}
        <div className="w-full h-full bg-black/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 rounded-xl flex flex-col overflow-hidden border border-cyan-500/20">
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