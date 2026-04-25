import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://anmol-lipi-transliterator.onrender.com";

// Accept chatName and aiAvatar as props
function ChatHeader({ chatName = "Boliyan", aiAvatar = "/ai-avatar.png" }) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${BASE_URL}/`);
        if (response.ok) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch (err) {
        setIsOnline(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 15000); // Check every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="p-4 sm:p-6 border-b border-border-cream dark:border-border-dark bg-ivory dark:bg-dark-surface flex items-center space-x-4 flex-shrink-0 transition-colors duration-300">
      <div className="relative">
        <img
          src={aiAvatar}
          alt="AI Avatar"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-border-warm dark:border-border-dark object-cover shadow-sm transition-colors duration-300"
        />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-medium text-anthropic-black dark:text-ivory">
            {chatName}
        </h1>
        <p className={`text-[10px] sm:text-xs font-medium uppercase tracking-widest flex items-center mt-1 transition-colors duration-500 ${isOnline ? 'text-green-600 dark:text-green-400' : 'text-stone-gray opacity-50'}`}>
          {isOnline ? '• System Online' : '• Connecting to Server...'}
        </p>
      </div>
    </header>
  );
}





export default ChatHeader;