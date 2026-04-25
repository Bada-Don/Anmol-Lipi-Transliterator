import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';

const BASE_API_URL = import.meta.env.DEV
  ? "http://127.0.0.1:5000/api"
  : "https://anmol-lipi-transliterator.onrender.com/api";

const Logo = () => ( 
    <div className="p-4 py-5 mb-4 text-center border-b border-cyan-500/10">
        <NavLink to="/" className="inline-block">
             <h1 className="text-2xl font-orbitron font-bold text-cyan-300 hover:text-cyan-100 transition-colors">
                AURA.AI
             </h1>
        </NavLink>
    </div>
);

function Sidebar({ onLinkClick }) { 
    const { chatId, sessionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [sessions, setSessions] = useState([]);
    const [editingSessionId, setEditingSessionId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const chats = [
        { id: "anmol-lipi", name: "Anmol Lipi", to: "/chat/anmol-lipi", icon: "🗣️" },
        { id: "gurbani-hindi", name: "Gurbani Hindi", to: "/chat/gurbani-hindi", icon: "📜" },
        { id: "prabhki", name: "Prabhki", to: "/chat/prabhki", icon: "📖" },
    ];

    useEffect(() => {
        if (chatId) {
            fetchSessions();
        }
        
        // Listen for custom event to refresh sessions
        const handleRefresh = () => fetchSessions();
        window.addEventListener('sessionUpdate', handleRefresh);
        
        return () => window.removeEventListener('sessionUpdate', handleRefresh);
    }, [chatId, sessionId]);

    const fetchSessions = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/sessions/${chatId}`);
            if (response.ok) {
                const data = await response.json();
                setSessions(data);
            }
        } catch (error) {
            console.error("Error fetching sessions:", error);
        }
    };

    const handleNewChat = () => {
        navigate(`/chat/${chatId}`);
        if (onLinkClick) onLinkClick();
    };

    const handleDeleteSession = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this chat?")) return;
        
        try {
            const response = await fetch(`${BASE_API_URL}/sessions/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setSessions(sessions.filter(s => s.id !== id));
                if (sessionId === id) {
                    navigate(`/chat/${chatId}`);
                }
            }
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    };

    const handleRenameSession = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (editingSessionId === id) {
            if (editTitle.trim()) {
                try {
                    const response = await fetch(`${BASE_API_URL}/sessions/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: editTitle })
                    });
                    if (response.ok) {
                        setSessions(sessions.map(s => s.id === id ? { ...s, title: editTitle } : s));
                    }
                } catch (error) {
                    console.error("Error renaming session:", error);
                }
            }
            setEditingSessionId(null);
        } else {
            const session = sessions.find(s => s.id === id);
            setEditingSessionId(id);
            setEditTitle(session.title);
        }
    };

    return (
        <div className="flex-1 flex flex-col text-gray-200 custom-scrollbar overflow-y-auto">
            <Logo />
            
            {/* Tool Selector */}
            <div className="px-3 mb-6">
                <h3 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    AI Assistants
                </h3>
                <div className="grid grid-cols-3 gap-1 mb-4">
                    {chats.map(chat => (
                        <button
                            key={chat.id}
                            onClick={() => navigate(chat.to)}
                            className={`p-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                                chatId === chat.id 
                                ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                                : 'text-gray-500 hover:bg-cyan-500/10 hover:text-gray-300 border border-transparent'
                            }`}
                            title={chat.name}
                        >
                            <span className="text-xl mb-1">{chat.icon}</span>
                            <span className="text-[10px] font-medium truncate w-full text-center">{chat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Session History */}
            <div className="px-3 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2 px-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Chat History
                    </h3>
                    <button 
                        onClick={handleNewChat}
                        className="p-1.5 rounded-md bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/40 transition-colors border border-cyan-500/20 group"
                        title="New Chat"
                    >
                        <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                    {sessions.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-gray-600 text-xs italic">No past sessions</p>
                        </div>
                    ) : (
                        sessions.map(session => (
                            <div
                                key={session.id}
                                className={`group relative flex items-center rounded-lg transition-all duration-200 ${
                                    sessionId === session.id 
                                    ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/20' 
                                    : 'text-gray-400 hover:bg-cyan-500/10 hover:text-gray-200'
                                }`}
                            >
                                <NavLink
                                    to={`/chat/${chatId}/${session.id}`}
                                    className="flex-1 px-3 py-2.5 text-sm truncate min-w-0"
                                    onClick={onLinkClick}
                                >
                                    {editingSessionId === session.id ? (
                                        <input
                                            autoFocus
                                            className="bg-black/40 border border-cyan-500/50 rounded px-1 w-full outline-none text-cyan-100"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleRenameSession(e, session.id);
                                                if (e.key === 'Escape') setEditingSessionId(null);
                                            }}
                                            onClick={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        session.title
                                    )}
                                </NavLink>
                                
                                <div className={`flex items-center pr-2 ${sessionId === session.id || 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                    <button 
                                        onClick={(e) => handleRenameSession(e, session.id)}
                                        className="p-1 text-gray-500 hover:text-cyan-400 transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {editingSessionId === session.id ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            )}
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={(e) => handleDeleteSession(e, session.id)}
                                        className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Static Bottom Links */}
            <div className="mt-auto px-3 py-4 border-t border-cyan-500/10">
                <nav className="space-y-0.5">
                    <NavLink to="/about" className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-cyan-500/10 hover:text-gray-300 rounded-lg transition-all">
                        <span className="mr-3 text-lg">ℹ️</span> About
                    </NavLink>
                    <NavLink to="/contact" className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-cyan-500/10 hover:text-gray-300 rounded-lg transition-all">
                        <span className="mr-3 text-lg">✉️</span> Contact
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;