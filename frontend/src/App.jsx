import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [count, setCount] = useState(0)

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes protégées (à créer plus tard) */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <div className="p-8">Dashboard (à créer)</div> : 
              <Navigate to="/login" />
          } 
        />
        
        {/* Redirection par défaut */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Navigate to="/login" />
          } 
        />
      </Routes>
    </>
  )
}

export default App
