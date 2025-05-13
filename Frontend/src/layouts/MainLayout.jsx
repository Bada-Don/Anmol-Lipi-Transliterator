import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const HamburgerIcon = ({ onClick }) => ( /* ... same as before ... */
    <button
        onClick={onClick}
        className="md:hidden p-2 text-gray-300 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
        aria-label="Open sidebar"
    >
        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
);

const CloseIcon = ({ onClick }) => ( /* ... same as before ... */
     <button
        onClick={onClick}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-cyan-300 focus:outline-none"
        aria-label="Close sidebar"
    >
        <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);


function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#070a15]">
      {/* Sidebar for Desktop - Increase width here */}
      <div className="hidden md:flex md:flex-shrink-0">
        {/* Apply the new width to the container holding the Sidebar */}
        <div className="flex flex-col w-96"> {/* Changed from md:w-72 (or similar) to w-96 */}
            <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar (Off-canvas) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true" onClick={toggleSidebar}></div>
          
          {/* Sidebar Panel - Increase max-width here for mobile if desired */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0a0f1f]/95 backdrop-blur-md border-r border-cyan-500/20 shadow-2xl"> {/* Changed max-w-xs to max-w-sm */}
             <CloseIcon onClick={toggleSidebar} />
             <Sidebar onLinkClick={toggleSidebar} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden p-3 bg-[#0a0f1f]/80 backdrop-blur-md border-b border-cyan-500/10 flex items-center sticky top-0 z-30">
            <HamburgerIcon onClick={toggleSidebar} />
            <h1 className="ml-3 text-lg font-orbitron text-cyan-400">AURA.AI</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient-bg p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;