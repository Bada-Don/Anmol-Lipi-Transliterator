import React from 'react';

const OnlineStatusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-7.5h12.5" />
    </svg>
);

// Accept chatName and aiAvatar as props
function ChatHeader({ chatName = "AURA.AI", aiAvatar = "https://placehold.co/48x48/00c2ff/0a0f1f?text=AI&font=orbitron" }) {
  return (
    <header className="p-4 sm:p-5 border-b border-cyan-500/20 glass-effect flex items-center space-x-4 shadow-lg flex-shrink-0">
      <div className="relative">
        <img
          src={aiAvatar} // Use passed avatar
          alt="AI Avatar"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400 object-cover"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0f1f]"></span>
      </div>
      <div>
        <h1 className="text-lg sm:text-xl font-orbitron font-semibold text-cyan-300">
            {chatName} {/* Use passed name */}
        </h1>
        <p className="text-xs sm:text-sm text-green-400 flex items-center">
          <OnlineStatusIcon />
          Online
        </p>
      </div>
    </header>
  );
}

export default ChatHeader;