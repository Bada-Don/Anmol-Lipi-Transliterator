// Frontend/src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const linkStyle = "px-3 py-2 rounded-md text-sm font-medium transition duration-300";
    const activeStyle = "bg-cyan-600/50 text-white shadow-md";
    const inactiveStyle = "text-gray-300 hover:bg-cyan-700/30 hover:text-white";

    return (
        // Removed max-w-2xl mx-auto from here
        <nav className="glass-effect rounded-b-lg border-b border-cyan-500/20 p-3 mb-4">
            <div className="flex justify-center space-x-4">
                <NavLink
                    to="/"
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
                >
                    Chat
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                     className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;