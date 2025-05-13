import React, { useState } from 'react';

const SendIcon = () => ( /* ... same as before ... */
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);
const CopyIcon = () => ( /* ... same as before ... */
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625-2.25-2.25m0 0L15.75 15m2.25 2.25-2.25 2.25M15.75 15l2.25 2.25M4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25Z" />
    </svg>
);

// Add isFunctional prop
function ChatFooter({ inputValue, onInputChange, onSendMessage, lastAiMessageText, isFunctional = true }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFunctional) {
            onSendMessage(inputValue);
        }
    };

    const handleCopy = () => {
        if (lastAiMessageText) {
            navigator.clipboard.writeText(lastAiMessageText)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy message.');
                });
        }
    };

    return (
        <footer className="p-3 sm:p-4 border-t border-cyan-500/20 glass-effect flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 sm:space-x-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder={isFunctional ? "Communicate with AURA.AI..." : "Chat not active..."}
                    className="flex-1 p-3 bg-transparent text-gray-100 placeholder-gray-500 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all duration-300 ease-in-out shadow-input-glow text-sm sm:text-base"
                    disabled={!isFunctional} // Disable input if chat is not functional
                />
                <button
                    type="submit"
                    className={`p-3 rounded-lg transition-all duration-300 ease-in-out 
                        ${isFunctional 
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-button-glow-hover'
                            : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                        }`}
                    aria-label="Send Message"
                    disabled={!isFunctional}
                >
                    <SendIcon />
                </button>
                <button
                    type="button"
                    title={lastAiMessageText ? (isCopied ? "Copied!" : "Copy Last AI Message") : "No AI message to copy"}
                    className={`p-3 rounded-lg transition-all duration-300 ease-in-out 
                        ${!lastAiMessageText 
                            ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                            : isCopied 
                                ? 'bg-green-500/80 text-white'
                                : 'bg-purple-600/70 hover:bg-purple-500/90 text-white hover:shadow-button-glow-hover'
                        }`}
                    onClick={handleCopy}
                    disabled={!lastAiMessageText || isCopied}
                    aria-label={lastAiMessageText ? (isCopied ? "Copied AI message" : "Copy last AI message") : "Copy button disabled"}
                >
                    {isCopied ? (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                         </svg>
                    ) : (
                         <CopyIcon />
                    )}
                </button>
            </form>
        </footer>
    );
}

export default ChatFooter;