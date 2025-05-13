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

           {/* Chat route with a dynamic chatId parameter */}
           <Route path="chat/:chatId" element={<ChatPage />} />

           <Route path="about" element={<AboutPage />} />
           <Route path="contact" element={<ContactPage />} />

           {/* Optional: Add a 404 Not Found route */}
           <Route path="*" element={
             <div className="text-center p-10">
               <h1 className="text-3xl font-orbitron text-red-400">404 - Not Found</h1>
               <p className="text-gray-300 mt-2">The page you are looking for does not exist.</p>
             </div>
            } />
        </Route>
      </Routes>
  );
}

export default App;