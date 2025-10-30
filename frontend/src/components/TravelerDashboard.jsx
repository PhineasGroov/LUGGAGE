import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { travelAPI, packageAPI } from '../services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge } from './ui/card';
import { Badge } from './ui/badge';
import { Plane, Package, Calendar, MapPin, Weight, Box } from 'lucide-react';

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
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-navy to-navy/90 text-white">
          <CardHeader>
            <CardTitle className="text-white">Voyages actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{travels.length}</div>
            <p className="text-white/80">Voyages planifiés</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gold to-gold/90">
          <CardHeader>
            <CardTitle className="text-navy">Colis transportés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy">
              {travels.reduce((acc, travel) => acc + (travel.packages?.length || 0), 0)}
            </div>
            <p className="text-navy/80">Total des colis</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Capacité disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green">
              {travels.reduce((acc, travel) => acc + travel.capacity_kg, 0)}kg
            </div>
            <p className="text-gray-600">Capacité totale</p>
          </CardContent>
        </Card>
      </div>

      {/* Section Mes Voyages */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-navy">Mes Voyages</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gold text-navy px-4 py-2 rounded-lg hover:bg-gold/90 font-medium flex items-center gap-2"
          >
            <Plane className="h-4 w-4" />
            Créer un voyage
          </motion.button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {travels.map((travel, index) => (
              <motion.div
                key={travel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-navy" />
                        {travel.origin} → {travel.destination}
                      </CardTitle>
                      <Badge variant="warning" className="flex items-center gap-1">
                        <Weight className="h-3 w-3" />
                        {travel.capacity_kg}kg
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(travel.travel_date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      {travel.packages?.length || 0} colis transportés
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {travels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Plane className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600">
              Aucun voyage créé. Commencez votre aventure !
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="mt-4 bg-navy text-white px-6 py-2 rounded-lg hover:bg-navy/90"
            >
              Créer mon premier voyage
            </motion.button>
          </motion.div>
        )}
      </section>

      {/* Section Colis à accepter */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-navy mb-6">
          Colis disponibles pour transport
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {packages
              .filter(pkg => pkg.status === 'pending')
              .map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <Box className="h-4 w-4 text-navy" />
                          {pkg.description}
                        </CardTitle>
                        <Badge variant="ghost">
                          {pkg.weight_kg}kg
                        </Badge>
                      </div>
                      <CardDescription>
                        Dimensions: {pkg.dimensions}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Expéditeur: {pkg.sender.email}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-green text-white py-2 rounded-lg hover:bg-green/90 font-medium"
                      >
                        Accepter ce colis
                      </motion.button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {packages.filter(pkg => pkg.status === 'pending').length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600">
              Aucun colis en attente de transport pour le moment.
            </p>
          </motion.div>
        )}
      </section>

      {/* Modal Création Voyage */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateTravelModal
            onClose={() => setShowCreateModal(false)}
            onTravelCreated={handleTravelCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default TravelerDashboard;