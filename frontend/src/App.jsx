import React from 'react'
import { Routes, Route } from "react-router-dom"
import { useAuth } from '@contexts/AuthProvider'
import Navbar from '@components/Navbar'
import SiteLayout from '@components/SiteLayout'
import Home from '@pages/Home'
import Auth from '@pages/Auth'
import Dashboard from '@pages/Dashboard'
import '@styles/components.css'

export default function App() {
  const { accessToken, setAccessToken } = useAuth();

  return (
    <>
      {accessToken ?
        (
          <>
            <Navbar />
            <SiteLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes >
            </SiteLayout>
          </>
        ) :
        <Auth setAccessToken={setAccessToken} />
      }
    </>
  )
}
