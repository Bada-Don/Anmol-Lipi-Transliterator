import React, { useState } from 'react';

function Message({ text, sender, timestamp, avatar }) {
  const isUser = sender === 'user';

  const [isPunjabi, setIsPunjabi] = useState(true);

  if (isUser) {
    return (
      <div className="flex items-start justify-end space-x-3 mb-6">
        <div className="max-w-[85%] sm:max-w-[75%] flex flex-col items-end">
          <div className="bg-terracotta p-4 rounded-generous rounded-tr-none shadow-sm">
            <p className="text-base md:text-xl text-ivory leading-relaxed">{text}</p>
          </div>
          <span className="text-[10px] text-stone-gray dark:text-warm-silver mt-1.5 font-medium uppercase tracking-wider">{timestamp}</span>
        </div>
        <img
          src={avatar}
          alt="User Avatar"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-warm dark:border-border-dark flex-shrink-0 mt-1 shadow-sm"
        />
      </div>
    );
  }

  // AI Message
  return (
    <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%] mb-6">
      <img
        src={avatar}
        alt="AI Avatar"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-warm dark:border-border-dark flex-shrink-0 mt-1 shadow-sm"
      />
      <div className='flex flex-col'>
        <div className="bg-white dark:bg-anthropic-black p-4 rounded-generous rounded-tl-none border border-border-cream dark:border-border-dark shadow-whisper transition-colors duration-300">
          <p style={{
            fontFamily: `${isPunjabi ? "AnmolLipi" : "Inter, sans-serif"}`
          }} className="text-base md:text-xl text-anthropic-black dark:text-ivory leading-relaxed transition-colors duration-300">{text}</p>
        </div>
        <div className='flex gap-4 items-center mt-2 px-1'>
          <div className="text-[10px] text-stone-gray dark:text-warm-silver font-medium uppercase tracking-wider">{timestamp}</div>
          <button 
            onClick={() => setIsPunjabi(!isPunjabi)} 
            className='text-[10px] font-medium uppercase tracking-widest text-terracotta hover:text-coral transition-colors'
          >
            {isPunjabi ? "English" : "Punjabi"}
          </button>
        </div>
      </div>
    </div >
  );
}



export default Message;