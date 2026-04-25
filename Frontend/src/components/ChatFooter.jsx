import React, { useState } from 'react';
import { Send, Copy, Check } from 'lucide-react';



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
        <footer className="p-4 sm:p-6 bg-parchment dark:bg-deep-dark border-t border-border-cream dark:border-border-dark flex-shrink-0 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center space-x-3">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder={isFunctional ? "Communicate with Boliyan..." : "Chat not active..."}
                        className="w-full p-4 bg-white dark:bg-anthropic-black text-anthropic-black dark:text-ivory placeholder-stone-gray border border-border-warm dark:border-border-dark rounded-generous focus:ring-1 focus:ring-focus-blue focus:border-focus-blue outline-none transition-all shadow-sm text-sm sm:text-base"
                        disabled={!isFunctional}
                    />
                </div>
                
                <button
                    type="submit"
                    className={`p-4 rounded-generous transition-all shadow-sm
                        ${isFunctional 
                            ? 'bg-terracotta hover:bg-coral text-ivory'
                            : 'bg-warm-sand dark:bg-dark-surface text-stone-gray dark:text-warm-silver cursor-not-allowed'
                        }`}
                    aria-label="Send Message"
                    disabled={!isFunctional}
                >
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                
                {lastAiMessageText && (
                    <button
                        type="button"
                        title={isCopied ? "Copied!" : "Copy Last Response"}
                        className={`p-4 rounded-generous transition-all shadow-sm 
                            ${isCopied 
                                ? 'bg-terracotta text-ivory'
                                : 'bg-warm-sand dark:bg-anthropic-black text-anthropic-black dark:text-ivory hover:bg-stone-gray/10 dark:hover:bg-warm-sand/10'
                            }`}
                        onClick={handleCopy}
                        disabled={isCopied}
                    >
                        {isCopied ? <Check className="w-5 h-5 sm:w-6 sm:h-6" /> : <Copy className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </button>
                )}
            </form>
        </footer>
    );
}



export default ChatFooter;