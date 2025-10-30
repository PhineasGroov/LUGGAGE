import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginNew from './pages/LoginNew';
import Register from './pages/Register';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CreatePackage from './pages/CreatePackage';
import CreateTrip from './pages/CreateTrip';
import MyTrips from './pages/MyTrips';
import MainLayout from './components/layouts/MainLayout';
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<LoginNew />} />
      <Route path="/register" element={<Register />} />
      
      {/* Routes protégées avec layout */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/create-package" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <CreatePackage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/create-trip" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <CreateTrip />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/my-trips" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyTrips />
            </MainLayout>
          </ProtectedRoute>
        } 
      />

      {/* Placeholder routes */}
      <Route 
        path="/chat" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-2">Messages</h2>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-2">Profile</h2>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/explore" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Explore />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/help" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-2">Help & Support</h2>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Ancien dashboard pour compatibilité */}
      <Route 
        path="/dashboard" 
        element={<Navigate to="/home" replace />} 
      />
      
      {/* Redirection par défaut */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

export default App;

