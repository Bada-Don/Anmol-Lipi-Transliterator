import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-parchment dark:bg-deep-dark transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-96 border-r border-border-cream dark:border-border-dark bg-ivory dark:bg-dark-surface transition-colors duration-300">
            <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar (Off-canvas) */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ease-in-out ${sidebarOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-anthropic-black/20 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
          aria-hidden="true" 
          onClick={toggleSidebar}
        ></div>
        
        {/* Sidebar content */}
        <div className={`fixed inset-y-0 left-0 max-w-[280px] w-full bg-ivory dark:bg-dark-surface border-r border-border-cream dark:border-border-dark shadow-2xl transition-transform duration-500 ease-in-out transform flex flex-col h-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <button
              onClick={toggleSidebar}
              className="absolute top-6 right-[-50px] p-2 bg-ivory dark:bg-dark-surface rounded-r-lg text-olive-gray dark:text-warm-silver hover:text-terracotta focus:outline-none border-y border-r border-border-cream dark:border-border-dark shadow-md md:hidden"
              aria-label="Close sidebar"
          >
              <X className="h-6 w-6" />
          </button>
           <Sidebar onLinkClick={toggleSidebar} />
        </div>
      </div>



      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 bg-parchment/80 dark:bg-deep-dark/80 backdrop-blur-md border-b border-border-cream dark:border-border-dark flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 text-olive-gray dark:text-warm-silver hover:text-terracotta focus:outline-none"
                    aria-label="Open sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-3 text-2xl font-serif font-medium text-anthropic-black dark:text-ivory md:ml-0 md:hidden">Boliyan</h1>
            </div>
            
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-warm-sand dark:hover:bg-dark-surface text-olive-gray dark:text-warm-silver transition-all shadow-sm border border-border-cream dark:border-border-dark bg-white dark:bg-anthropic-black"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}



export default MainLayout;