import React, { useState } from 'react';

import { Copy, RotateCcw, Edit3, Check } from 'lucide-react';

function Message({ id, text, sender, timestamp, avatar, onCopy, onRetry, onEdit }) {
  const isUser = sender === 'user';
  const [isPunjabi, setIsPunjabi] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy(text);
    setTimeout(() => setCopied(false), 2000);
  };

  const actionButtonClass = "p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-stone-gray dark:text-warm-silver hover:text-terracotta dark:hover:text-terracotta transition-all";

  if (isUser) {
    return (
      <div className="flex items-start justify-end space-x-3 mb-6 group">
        <div className="max-w-[85%] sm:max-w-[75%] flex flex-col items-end">
          <div className="bg-terracotta p-4 rounded-generous rounded-tr-none shadow-sm relative">
            <p className="text-base md:text-xl text-ivory leading-relaxed">{text}</p>
          </div>
          <div className='flex items-center gap-3 mt-1.5'>
            <span className="text-[10px] text-stone-gray dark:text-warm-silver font-medium uppercase tracking-wider">{timestamp}</span>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
               <button onClick={() => onRetry?.(id)} className={actionButtonClass} title="Retry">
                 <RotateCcw className="w-3.5 h-3.5" />
               </button>
               <button onClick={() => onEdit?.(id)} className={actionButtonClass} title="Edit">
                 <Edit3 className="w-3.5 h-3.5" />
               </button>
               <button onClick={handleCopy} className={actionButtonClass} title="Copy">
                 {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
               </button>
            </div>
          </div>
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
    <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%] mb-6 group">
      <img
        src={avatar}
        alt="AI Avatar"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-warm dark:border-border-dark flex-shrink-0 mt-1 shadow-sm"
      />
      <div className='flex flex-col'>
        <div className="bg-white dark:bg-anthropic-black p-4 rounded-generous rounded-tl-none border border-border-cream dark:border-border-dark shadow-whisper transition-colors duration-300 relative">
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
          <button 
            onClick={handleCopy} 
            className={`${actionButtonClass} opacity-0 group-hover:opacity-100`}
            title="Copy"
          >
             {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}




export default Message;