import React from 'react';

function TypingIndicator({ aiAvatar }) {
  return (
    <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%]" id="typingIndicator">
      <img 
        src={aiAvatar} 
        alt="AI Avatar" 
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-cyan-400/50 flex-shrink-0 mt-1"
      />
      <div>
        <div className="glass-effect p-3 rounded-lg rounded-tl-none shadow-md">
          <div className="flex space-x-1 items-center h-5">
            <span className="typing-dot w-1.5 h-1.5 bg-cyan-300 rounded-full"></span>
            <span className="typing-dot w-1.5 h-1.5 bg-cyan-300 rounded-full"></span>
            <span className="typing-dot w-1.5 h-1.5 bg-cyan-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;