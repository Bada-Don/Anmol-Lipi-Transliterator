import React, { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

// Add userAvatar prop
function ChatMessages({ messages, isTyping, aiAvatar, userAvatar }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <main id="chatMessages"  className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          text={msg.text}
          sender={msg.sender}
          timestamp={msg.timestamp}
          // Pass the correct avatar based on sender type
          avatar={msg.sender === 'ai' ? aiAvatar : userAvatar}
        />
      ))}
      {isTyping && <TypingIndicator aiAvatar={aiAvatar} />}
      <div ref={messagesEndRef} />
    </main>
  );
}

export default ChatMessages;