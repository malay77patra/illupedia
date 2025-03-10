import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@contexts/AuthProvider'
import '@styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthProvider >
        <App />
      </AuthProvider >
    </BrowserRouter>
  </StrictMode>,
)
