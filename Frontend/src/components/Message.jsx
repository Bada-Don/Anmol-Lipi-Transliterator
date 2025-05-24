import React, { useState } from 'react';

function Message({ text, sender, timestamp, avatar }) {
  const isUser = sender === 'user';

  const [isPunjabi, setIsPunjabi] = useState(true);

  if (isUser) {
    return (
      <div className="flex items-start justify-end space-x-3">
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="bg-cyan-600/70 backdrop-blur-md p-3 rounded-lg rounded-br-none shadow-md">
            <p className="text-base md:text-2xl text-white">{text}</p>
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
      <div className='flex flex-col'>
        <div className="glass-effect p-3 rounded-lg rounded-tl-none shadow-md">
          <p style={{
            fontFamily: `${isPunjabi ? "AnmolLipi" : "Arial"}`
          }} className="text-base md:text-2xl text-gray-200">{text}</p>
        </div>
        <div className='flex gap-2 items-center p-2'>
          <div className="text-xs text-gray-500 mt-1 ml-1">{timestamp}</div>
          <div onClick={
            () => setIsPunjabi(!isPunjabi)
          } className='text-white cursor-pointer'>{`Change To ${isPunjabi ? "English" : "Punjabi"}`}</div>
        </div>
      </div>
    </div >
  );
}

export default Message;