import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Package, Plane, MapPin, Calendar, Plus } from 'lucide-react';
import { travelAPI, packageAPI } from '../services/api';

const MyTrips = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const userMode = user?.current_role || 'sender';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userMode === 'traveler') {
          // Fetch user's trips (to be implemented with my-travels endpoint)
          const response = await travelAPI.getAll();
          setTrips(response.data);
        } else {
          // Fetch user's packages
          const response = await packageAPI.getMy();
          setPackages(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {userMode === 'traveler' ? 'My Trips ✈️' : 'My Packages 📦'}
          </h1>
          <p className="text-gray-600 mt-1 text-lg">
            {userMode === 'traveler' 
              ? 'Manage your trips and deliveries' 
              : 'Track your package deliveries'}
          </p>
        </div>
        <Link to={userMode === 'traveler' ? '/create-trip' : '/create-package'}>
          <Button className="gap-2 h-12 px-6 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
            {userMode === 'traveler' ? 'Add Trip' : 'Send Package'}
          </Button>
        </Link>
      </div>

      {/* Content */}
      {userMode === 'traveler' ? (
        trips.length > 0 ? (
          <div className="grid gap-4">
            {trips.map((trip) => (
              <Card key={trip.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-green-50 border-green-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-xl text-gray-800">{trip.origin}</span>
                      <span className="text-gray-400 font-bold">→</span>
                      <span className="font-bold text-xl text-gray-800">{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 ml-14">
                      <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{new Date(trip.travel_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                        <Package className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{trip.capacity_kg}kg capacity</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shadow-sm">Pending</Badge>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-gradient-to-br from-white to-green-50 border-green-100 shadow-lg">
            <div className="p-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Plane className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">No trips yet</h3>
            <p className="text-gray-600 mb-6 text-lg">Create your first trip to start earning!</p>
            <Link to="/create-trip">
              <Button className="h-12 px-8 rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Add Your First Trip
              </Button>
            </Link>
          </Card>
        )
      ) : (
        packages.length > 0 ? (
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-blue-50 border-blue-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-xl text-gray-800">{pkg.description}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 ml-14">
                      <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm font-medium">
                        {pkg.weight_kg}kg
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm font-medium">
                        {pkg.dimensions}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      pkg.status === 'delivered' ? 'default' : 
                      pkg.status === 'accepted' ? 'secondary' : 
                      'outline'
                    }
                    className="shadow-sm"
                  >
                    {pkg.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-gradient-to-br from-white to-blue-50 border-blue-100 shadow-lg">
            <div className="p-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Package className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">No packages yet</h3>
            <p className="text-gray-600 mb-6 text-lg">Send your first package to get started!</p>
            <Link to="/create-package">
              <Button className="h-12 px-8 rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Send Your First Package
              </Button>
            </Link>
          </Card>
        )
      )}
    </div>
  );
};

export default MyTrips;
