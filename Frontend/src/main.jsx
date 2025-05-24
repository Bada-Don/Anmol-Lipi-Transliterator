import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx'
import './index.css'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Optional: prompt user to refresh
    console.log('New content available, refresh the page!')
  },
  onOfflineReady() {
    console.log('App is ready to work offline.')
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App with BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)