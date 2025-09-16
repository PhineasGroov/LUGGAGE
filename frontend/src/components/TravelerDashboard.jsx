import React, { useState, useEffect } from 'react';
import { travelAPI, packageAPI } from '../services/api';
// import CreateTravelModal from './CreateTravelModal';

function TravelerDashboard() {
  const [travels, setTravels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [travelsResponse, packagesResponse] = await Promise.all([
        travelAPI.getAll(),
        packageAPI.getAll()
      ]);
      setTravels(travelsResponse.data);
      setPackages(packagesResponse.data);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTravelCreated = () => {
    setShowCreateModal(false);
    loadData(); // Recharger les données
  };

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Section Mes Voyages */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes Voyages</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + Créer un voyage
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {travels.map(travel => (
            <div key={travel.id} className="border rounded-lg p-4 hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{travel.origin} → {travel.destination}</h3>
                <span className="text-sm text-gray-500">{travel.capacity_kg}kg</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Date: {new Date(travel.travel_date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Colis transportés: {travel.packages?.length || 0}
              </p>
            </div>
          ))}
        </div>

        {travels.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun voyage créé. Créez votre premier voyage !
          </div>
        )}
      </div>

      {/* Section Colis à accepter */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Colis disponibles pour transport
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages
            .filter(pkg => pkg.status === 'pending') // Seulement les colis en attente
            .map(pkg => (
              <div key={pkg.id} className="border rounded-lg p-4 hover:shadow-md">
                <h3 className="font-semibold mb-2">{pkg.description}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Poids: {pkg.weight_kg}kg</p>
                  <p>Dimensions: {pkg.dimensions}</p>
                  <p>Expéditeur: {pkg.sender.email}</p>
                </div>
                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm">
                  Accepter ce colis
                </button>
              </div>
            ))}
        </div>

        {packages.filter(pkg => pkg.status === 'pending').length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun colis en attente de transport.
          </div>
        )}
      </div>

      {/* Modal Création Voyage */}
      {showCreateModal && (
        <CreateTravelModal
          onClose={() => setShowCreateModal(false)}
          onTravelCreated={handleTravelCreated}
        />
      )}
    </div>
  );
}

export default TravelerDashboard;