import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js'; // Import Typed.js

function Footer() {
    const typedElement = useRef(null); // Ref for the span where typing happens
    const typedInstance = useRef(null); // Ref to store the Typed instance

    useEffect(() => {
        const options = {
            strings: ['© Made with ❤️ by <span class="text-purple-400 font-semibold">Harshit Singla</span>'],
            typeSpeed: 70,
            backSpeed: 30,
            backDelay: 2500,
            startDelay: 500,
            loop: true,
            smartBackspace: true,
            contentType: 'html', // Important for rendering the span correctly
        };

        // Ensure the element exists before initializing Typed
        if (typedElement.current) {
            // Destroy previous instance if it exists (for strict mode, hot reloading)
            if (typedInstance.current) {
                 typedInstance.current.destroy();
            }
            // Initialize Typed.js
            typedInstance.current = new Typed(typedElement.current, options);
        }

        // Cleanup function to destroy Typed instance on component unmount
        return () => {
            if (typedInstance.current) {
                typedInstance.current.destroy();
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount


    return (
        <footer className="py-4 mt-8 text-center text-gray-400 text-sm">
            {/* The span where Typed.js will inject the text */}
            <p className="footer-text" id="footer">
                <span ref={typedElement}></span>
            </p>
        </footer>
    );
}

export default Footer;