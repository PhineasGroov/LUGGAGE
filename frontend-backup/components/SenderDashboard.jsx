import React, { useState, useEffect } from 'react';
import { packageAPI, travelAPI } from '../services/api';
// import CreatePackageModal from './CreatePackageModal';

function SenderDashboard() {
  const [myPackages, setMyPackages] = useState([]);
  const [availableTravels, setAvailableTravels] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [packagesResponse, travelsResponse] = await Promise.all([
        packageAPI.getMy(),
        travelAPI.getAll()
      ]);
      setMyPackages(packagesResponse.data);
      setAvailableTravels(travelsResponse.data);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePackageCreated = () => {
    setShowCreateModal(false);
    loadData();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'En attente',
      accepted: 'Accepté',
      in_transit: 'En transit',
      delivered: 'Livré',
      cancelled: 'Annulé'
    };
    return texts[status] || status;
  };

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Section Mes Colis */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes Colis</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + Créer un colis
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myPackages.map(pkg => (
            <div key={pkg.id} className="border rounded-lg p-4 hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{pkg.description}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pkg.status)}`}>
                  {getStatusText(pkg.status)}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Poids: {pkg.weight_kg}kg</p>
                <p>Dimensions: {pkg.dimensions}</p>
                {pkg.travel && (
                  <p className="text-blue-600">
                    Voyage: {pkg.travel.origin} → {pkg.travel.destination}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {myPackages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun colis créé. Créez votre premier colis !
          </div>
        )}
      </div>

      {/* Section Voyages Disponibles */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Voyages disponibles
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableTravels.map(travel => (
            <div key={travel.id} className="border rounded-lg p-4 hover:shadow-md">
              <h3 className="font-semibold mb-2">
                {travel.origin} → {travel.destination}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Date: {new Date(travel.travel_date).toLocaleDateString()}</p>
                <p>Capacité: {travel.capacity_kg}kg</p>
                <p>Voyageur: {travel.traveler.email}</p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
                Proposer un colis
              </button>
            </div>
          ))}
        </div>

        {availableTravels.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun voyage disponible pour le moment.
          </div>
        )}
      </div>

      {/* Modal Création Colis */}
      {showCreateModal && (
        <CreatePackageModal
          onClose={() => setShowCreateModal(false)}
          onPackageCreated={handlePackageCreated}
        />
      )}
    </div>
  );
}

export default SenderDashboard;