import React, { useState } from 'react';

// Placeholder icons (replace with actual SVGs or FontAwesome if preferred)
const PlaceholderIcon = ({ color = 'currentColor', size = '24' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill={color} fillOpacity="0.3"/>
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" stroke={color} strokeWidth="1.5"/>
        <path d="M17 17l-2.5-2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
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
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }
        // In a real app, you'd send this data to a backend API
        console.log('Form data submitted:', formData);
        alert(`Thank you, ${formData.name}! Your message has been logged to the console.`);
        setFormData({ name: '', email: '', message: '' }); // Clear form
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 text-gray-200">
            <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-cyan-300 mb-8">
                Ways To Contact Me
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 glass-effect p-6 sm:p-8 rounded-lg border border-cyan-500/20">
                {/* Illustration - replace with your actual image */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                   <img
                     // src="./Contact Illustration.png" // Use direct import or public folder path
                     src="https://placehold.co/300x300/0a0f1f/00c2ff?text=Contact+Art&font=orbitron"
                     alt="Contact Illustration"
                     className="w-full h-auto max-w-xs mx-auto md:max-w-full rounded-md object-cover opacity-80"
                   />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} id="contactform" className="w-full md:w-2/3 space-y-5">
                     <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 bg-transparent text-gray-100 placeholder-gray-400 border-b-2 border-cyan-500/40 focus:border-cyan-400 focus:outline-none transition duration-300"
                            required
                        />
                     </div>
                     <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                             className="w-full p-3 bg-transparent text-gray-100 placeholder-gray-400 border-b-2 border-cyan-500/40 focus:border-cyan-400 focus:outline-none transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            placeholder="Enter Your Message Here"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 bg-transparent text-gray-100 placeholder-gray-400 border-b-2 border-cyan-500/40 focus:border-cyan-400 focus:outline-none transition duration-300 resize-none custom-scrollbar"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        id="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-button-glow-hover"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Other Contact Links */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                <a href="mailto:harshitashwani@gmail.com" target="_blank" rel="noopener noreferrer" title="Gmail"
                   className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition duration-300 text-purple-300 hover:text-white">
                    {/* Replace with actual Gmail SVG */}
                    <PlaceholderIcon color="#db4437" size="28"/>
                </a>
                 <a href="https://www.linkedin.com/in/harshit-singla-7b459522a" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                    className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition duration-300 text-purple-300 hover:text-white">
                    {/* Replace with actual LinkedIn SVG */}
                    <PlaceholderIcon color="#0077b5" size="28"/>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="Discord" className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition duration-300 text-purple-300 hover:text-white">
                    {/* Add Discord Link and Icon */}
                    <PlaceholderIcon color="#7289da" size="28"/>
                </a>
                <a href="https://github.com/Bada-Don/8" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition duration-300 text-purple-300 hover:text-white">
                    {/* Replace with actual GitHub SVG */}
                    <PlaceholderIcon color="#ffffff" size="28"/>
                </a>
                {/* Add others like Instagram, WhatsApp if needed */}
                 <a href="https://www.instagram.com/harshitsingla.exe/#" target="_blank" rel="noopener noreferrer" title="Instagram"
                    className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-500/50 transition duration-300 text-purple-300 hover:text-white">
                     <PlaceholderIcon color="#e4405f" size="28"/>
                 </a>
                 {/* Consider privacy for WhatsApp link */}
                 {/* <a href="https://web.whatsapp.com/send?phone=7696513958" target="_blank">...</a> */}

            </div>
        </div>
    );
}

export default ContactPage;