import React from 'react';

function TypingIndicator({ aiAvatar }) {
  return (
    <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%] mb-6" id="typingIndicator">
      <img 
        src={aiAvatar} 
        alt="AI Avatar" 
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-warm dark:border-border-dark flex-shrink-0 mt-1 shadow-sm transition-colors"
      />
      <div>
        <div className="bg-white dark:bg-anthropic-black p-4 rounded-generous rounded-tl-none border border-border-cream dark:border-border-dark shadow-whisper transition-colors duration-300">
          <div className="flex space-x-2 items-center h-5">
            <span className="typing-dot w-1.5 h-1.5 bg-terracotta rounded-full"></span>
            <span className="typing-dot w-1.5 h-1.5 bg-terracotta rounded-full"></span>
            <span className="typing-dot w-1.5 h-1.5 bg-terracotta rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}



export default TypingIndicator;