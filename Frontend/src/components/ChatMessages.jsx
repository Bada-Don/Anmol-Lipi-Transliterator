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
    <main id="chatMessages" className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar bg-ivory dark:bg-dark-surface transition-colors duration-300">
      {messages.length === 0 && !isTyping ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-serif font-medium text-anthropic-black dark:text-ivory mb-6 opacity-20 transition-colors">
            Boliyan
          </h2>
          <p className="text-stone-gray dark:text-warm-silver max-w-sm leading-relaxed transition-colors italic">
            Transliteration as a literary craft. Begin by typing your thoughts in Roman script.
          </p>
        </div>
      ) : (
        <>
          {messages.map((msg) => (
            <Message
              key={msg.id}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              avatar={msg.sender === 'ai' ? aiAvatar : userAvatar}
            />
          ))}
          {isTyping && <TypingIndicator aiAvatar={aiAvatar} />}
        </>
      )}
      <div ref={messagesEndRef} />
    </main>
  );
}


export default ChatMessages;