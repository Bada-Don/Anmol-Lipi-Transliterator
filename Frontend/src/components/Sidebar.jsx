import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3, Info, Mail, BookOpen, Scroll, Languages } from 'lucide-react';

const BASE_API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://anmol-lipi-transliterator.onrender.com/api";

const Logo = () => ( 
    <div className="p-6 py-8 mb-4 border-b border-border-cream dark:border-border-dark">
        <NavLink to="/" className="inline-block">
             <h1 className="text-3xl font-serif font-medium text-anthropic-black dark:text-ivory hover:text-terracotta transition-colors">
                Boliyan
             </h1>
        </NavLink>
    </div>
);

function Sidebar({ onLinkClick }) { 
    const { chatId, sessionId } = useParams();
    const navigate = useNavigate();
    
    const [sessions, setSessions] = useState([]);
    const [editingSessionId, setEditingSessionId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const chats = [
        { id: "anmol-lipi", name: "Anmol Lipi", to: "/chat/anmol-lipi", Icon: Languages },
        { id: "gurbani-hindi", name: "Gurbani Hindi", to: "/chat/gurbani-hindi", Icon: Scroll },
        { id: "prabhki", name: "Prabhki", to: "/chat/prabhki", Icon: BookOpen },
    ];

    useEffect(() => {
        if (chatId) {
            fetchSessions();
        }
        
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
        <div className="flex-1 flex flex-col text-anthropic-black dark:text-warm-silver custom-scrollbar overflow-y-auto bg-ivory dark:bg-dark-surface transition-colors duration-300">
            <Logo />
            
            {/* Tool Selector */}
            <div className="px-4 mb-8">
                <h3 className="px-2 py-1 text-[10px] font-medium text-stone-gray uppercase tracking-widest mb-3">
                    Assistants
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {chats.map(chat => {
                        const { Icon } = chat;
                        return (
                            <button
                                key={chat.id}
                                onClick={() => navigate(chat.to)}
                                className={`p-3 rounded-generous flex flex-col items-center justify-center transition-all ${
                                    chatId === chat.id 
                                    ? 'bg-warm-sand dark:bg-anthropic-black text-anthropic-black dark:text-ivory shadow-ring-warm' 
                                    : 'text-olive-gray dark:text-stone-gray hover:bg-warm-sand/40 dark:hover:bg-anthropic-black/50 hover:text-anthropic-black dark:hover:text-ivory'
                                }`}
                                title={chat.name}
                            >
                                <Icon className="w-6 h-6 mb-2" />
                                <span className="text-[10px] font-medium truncate w-full text-center">{chat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Session History */}
            <div className="px-4 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-[10px] font-medium text-stone-gray uppercase tracking-widest">
                        History
                    </h3>
                    <button 
                        onClick={handleNewChat}
                        className="p-1.5 rounded-comfort bg-terracotta text-ivory hover:bg-coral transition-colors shadow-sm"
                        title="New Chat"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="space-y-0.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                    {sessions.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-stone-gray text-xs italic">No past sessions</p>
                        </div>
                    ) : (
                        sessions.map(session => (
                            <div
                                key={session.id}
                                className={`group relative flex items-center rounded-comfort transition-all duration-200 ${
                                    sessionId === session.id 
                                    ? 'bg-warm-sand dark:bg-anthropic-black text-anthropic-black dark:text-ivory' 
                                    : 'text-olive-gray dark:text-stone-gray hover:bg-warm-sand/30 dark:hover:bg-anthropic-black/30 hover:text-anthropic-black dark:hover:text-ivory'
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
                                            className="bg-parchment dark:bg-deep-dark border border-stone-gray/30 rounded px-1 w-full outline-none text-anthropic-black dark:text-ivory"
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
                                        className="p-1 text-stone-gray hover:text-terracotta transition-colors"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                        onClick={(e) => handleDeleteSession(e, session.id)}
                                        className="p-1 text-stone-gray hover:text-error-crimson transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Static Bottom Links */}
            <div className="mt-auto px-4 py-6 border-t border-border-cream dark:border-border-dark bg-parchment/30 dark:bg-deep-dark/30">
                <nav className="space-y-1">
                    <NavLink to="/about" className="flex items-center px-4 py-2 text-sm text-olive-gray dark:text-stone-gray hover:bg-warm-sand/40 dark:hover:bg-anthropic-black/50 hover:text-anthropic-black dark:hover:text-ivory rounded-comfort transition-all">
                        <Info className="w-4 h-4 mr-3" /> About
                    </NavLink>
                    <NavLink to="/contact" className="flex items-center px-4 py-2 text-sm text-olive-gray dark:text-stone-gray hover:bg-warm-sand/40 dark:hover:bg-anthropic-black/50 hover:text-anthropic-black dark:hover:text-ivory rounded-comfort transition-all">
                        <Mail className="w-4 h-4 mr-3" /> Contact
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;