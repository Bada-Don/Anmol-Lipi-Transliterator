import React from 'react';

function Message({ text, sender, timestamp, avatar }) {
  const isUser = sender === 'user';

  if (isUser) {
    return (
      <div className="flex items-start justify-end space-x-3">
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="bg-cyan-600/70 backdrop-blur-md p-3 rounded-lg rounded-br-none shadow-md">
            <p className="text-sm sm:text-base text-white">{text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 mr-1 flex justify-end">{timestamp}</span>
        </div>
        <img 
          src={avatar} 
          alt="User Avatar" 
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-purple-400/50 flex-shrink-0 mt-1"
        />
      </div>
    );
  }

  // AI Message
  return (
    <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%]">
      <img 
        src={avatar} 
        alt="AI Avatar" 
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-cyan-400/50 flex-shrink-0 mt-1"
      />
      <div>
        <div className="glass-effect p-3 rounded-lg rounded-tl-none shadow-md">
          <p className="text-sm sm:text-base text-gray-200">{text}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 ml-1">{timestamp}</span>
      </div>
    </div>
  );
}

export default Message;