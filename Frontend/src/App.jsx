import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Page Components
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

// Import Main Layout
import MainLayout from './layouts/MainLayout'; // Adjusted path

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
           {/* Default route redirects to Anmol Lipi chat */}
           <Route index element={<Navigate to="/chat/anmol-lipi" replace />} />

           {/* Chat route with dynamic chatId and optional sessionId */}
           <Route path="chat/:chatId/:sessionId?" element={<ChatPage />} />

           <Route path="about" element={<AboutPage />} />
           <Route path="contact" element={<ContactPage />} />

           <Route path="*" element={
             <div className="text-center p-20">
               <h1 className="text-6xl font-serif font-medium text-anthropic-black">404</h1>
               <p className="text-olive-gray mt-4 text-xl">The page you are looking for does not exist.</p>
             </div>
            } />

        </Route>
      </Routes>
  );
}

export default App;