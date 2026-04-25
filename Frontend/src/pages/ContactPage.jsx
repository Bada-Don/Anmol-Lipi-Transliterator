import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const LinkedinIcon = ({ size = 20 }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

function ContactPage() {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }
        console.log('Form data submitted:', formData);
        alert(`Thank you, ${formData.name}! Your message has been received.`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 text-anthropic-black dark:text-warm-silver transition-colors duration-300">
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-center text-anthropic-black dark:text-ivory mb-12 transition-colors">
                Connect with Boliyan
            </h1>

            <div className="flex flex-col md:flex-row items-stretch gap-12 bg-white dark:bg-dark-surface p-8 sm:p-12 rounded-featured border border-border-cream dark:border-border-dark shadow-whisper transition-colors duration-300">
                {/* Information Area */}
                <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col justify-center">
                   <img
                     src="https://placehold.co/400x400/f5f4ed/c96442?text=Boliyan+Support&font=georgia"
                     alt="Contact Illustration"
                     className="w-full h-auto rounded-featured object-cover shadow-sm"
                   />
                   <div className="mt-8 space-y-4">
                      <p className="text-stone-gray dark:text-warm-silver text-sm leading-relaxed italic transition-colors">
                        "Communication is the bridge between confusion and clarity."
                      </p>
                      <div className="flex flex-wrap gap-4 mt-6">
                        <a href="mailto:harshitashwani@gmail.com" className="p-3 rounded-full bg-parchment dark:bg-anthropic-black text-terracotta hover:bg-warm-sand dark:hover:bg-dark-surface transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/harshit-singla-7b459522a" className="p-3 rounded-full bg-parchment dark:bg-anthropic-black text-terracotta hover:bg-warm-sand dark:hover:bg-dark-surface transition-colors">
                            <LinkedinIcon size={20} />
                        </a>

                      </div>
                   </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} id="contactform" className="w-full md:w-2/3 space-y-8">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-xs font-medium uppercase tracking-widest text-stone-gray dark:text-warm-silver ml-1 transition-colors">Name</label>
                           <input
                               type="text"
                               name="name"
                               placeholder="Your name"
                               value={formData.name}
                               onChange={handleChange}
                               className="w-full p-4 bg-parchment/50 dark:bg-anthropic-black/50 text-anthropic-black dark:text-ivory placeholder-stone-gray/50 border border-border-warm dark:border-border-dark rounded-generous focus:ring-1 focus:ring-focus-blue focus:border-focus-blue outline-none transition-all"
                               required
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-medium uppercase tracking-widest text-stone-gray dark:text-warm-silver ml-1 transition-colors">Email</label>
                           <input
                               type="email"
                               name="email"
                               placeholder="email@example.com"
                               value={formData.email}
                               onChange={handleChange}
                               className="w-full p-4 bg-parchment/50 dark:bg-anthropic-black/50 text-anthropic-black dark:text-ivory placeholder-stone-gray/50 border border-border-warm dark:border-border-dark rounded-generous focus:ring-1 focus:ring-focus-blue focus:border-focus-blue outline-none transition-all"
                               required
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-medium uppercase tracking-widest text-stone-gray dark:text-warm-silver ml-1 transition-colors">Message</label>
                           <textarea
                               name="message"
                               placeholder="How can we help you?"
                               value={formData.message}
                               onChange={handleChange}
                               rows="4"
                               className="w-full p-4 bg-parchment/50 dark:bg-anthropic-black/50 text-anthropic-black dark:text-ivory placeholder-stone-gray/50 border border-border-warm dark:border-border-dark rounded-generous focus:ring-1 focus:ring-focus-blue focus:border-focus-blue outline-none transition-all resize-none custom-scrollbar"
                               required
                           />
                        </div>
                     </div>
                     <button
                         type="submit"
                         id="submit"
                         className="w-full sm:w-auto px-10 py-4 bg-terracotta hover:bg-coral text-ivory rounded-generous font-medium transition-all shadow-sm active:scale-95"
                     >
                         Send Message
                     </button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;