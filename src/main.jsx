import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ColorDropdownProvider } from './Context/Theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorDropdownProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ColorDropdownProvider>
  </StrictMode>,
)
