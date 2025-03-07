import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from '@components/Navbar'
import Home from '@pages/Home'
import Auth from '@pages/Auth'
import Dashboard from '@pages/Dashboard'
import ThemeTgl from '@components/ThemeTgl'
import '@styles/components.css'

export default function App() {
  return (
    <>
      <Navbar />
      <ThemeTgl />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}
