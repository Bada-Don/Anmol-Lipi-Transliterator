import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Logo = () => ( 
    <div className="p-4 py-5 mb-4 text-center border-b border-cyan-500/10">
        <NavLink to="/" className="inline-block">
             <h1 className="text-2xl font-orbitron font-bold text-cyan-300 hover:text-cyan-100 transition-colors">
                AURA.AI
             </h1>
        </NavLink>
    </div>
);

const SidebarLink = ({ to, children, isChatLink = false, onLinkClick }) => { 
    const location = useLocation();
    const isActive = isChatLink ? location.pathname.startsWith(to) : location.pathname === to;

    const baseStyle = "flex items-center px-4 py-2.5 my-1 rounded-lg transition-colors duration-200 ease-in-out text-sm";
    const activeStyle = "bg-cyan-600/20 text-cyan-100 font-medium shadow-sm";
    const inactiveStyle = "text-gray-400 hover:bg-cyan-500/10 hover:text-gray-200";

    const handleClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
    };

    return (
        <NavLink
            to={to}
            className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
            onClick={handleClick}
        >
            {children}
        </NavLink>
    );
};

function Sidebar({ onLinkClick }) { 
    const chats = [
        { id: "anmol-lipi", name: "Anmol Lipi", to: "/chat/anmol-lipi", icon: "🗣️" },
        { id: "gurbani-hindi", name: "Gurbani Hindi", to: "/chat/gurbani-hindi", icon: "📜" },
        { id: "prabhki", name: "Prabhki", to: "/chat/prabhki", icon: "📖" },
    ];

    const navLinks = [
        { name: "About", to: "/about", icon: "ℹ️" },
        { name: "Contact", to: "/contact", icon: "✉️" },
    ];

    return (
        <div className="flex-1 flex flex-col text-gray-200 custom-scrollbar overflow-y-auto">
            <Logo />
            <div className="px-3 mb-6">
                <h3 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    AI Assistants
                </h3>
                <nav className="space-y-0.5">
                    {chats.map(chat => (
                        <SidebarLink key={chat.id} to={chat.to} isChatLink={true} onLinkClick={onLinkClick}>
                           <span className="mr-3 text-lg">{chat.icon}</span> {chat.name}
                        </SidebarLink>
                    ))}
                </nav>
            </div>
            <div className="mt-auto px-3 py-4 border-t border-cyan-500/10">
                 <h3 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Menu
                </h3>
                <nav className="space-y-0.5">
                    {navLinks.map(link => (
                         <SidebarLink key={link.name} to={link.to} onLinkClick={onLinkClick}>
                            <span className="mr-3 text-lg">{link.icon}</span> {link.name}
                         </SidebarLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;