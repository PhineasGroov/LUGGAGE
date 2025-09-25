import React from 'react';
import { useAuth } from '../context/AuthContext';
import SenderDashboard from '../components/SenderDashboard';
import TravelerDashboard from '../components/TravelerDashboard';
import RoleSwitcher from '../components/RoleSwitcher';

const Dashboard = () => {
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
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <RoleSwitcher />
        </div>
        
        <div className="mt-8">
          {user?.current_role === 'sender' ? (
            <SenderDashboard />
          ) : (
            <TravelerDashboard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;