import React from 'react';
import { useAuth } from '../context/AuthContext';
import TravelerDashboard from '../components/TravelerDashboard';
import SenderDashboard from '../components/SenderDashboard';
import Header from '../components/Header';

function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user?.email}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'traveler' ? 
              'Gérez vos voyages et acceptez des colis à transporter' : 
              'Créez des colis et trouvez des voyageurs pour les transporter'
            }
          </p>
        </div>

        {/* Dashboard spécifique au rôle */}
        {user?.role === 'traveler' ? (
          <TravelerDashboard />
        ) : (
          <SenderDashboard />
        )}
      </div>
    </div>
  );
}

export default Dashboard;