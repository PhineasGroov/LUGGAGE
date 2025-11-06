import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Plane, Package } from 'lucide-react';
import { travelAPI } from '../services/api';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    travel_date: '',
    capacity_kg: 10,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.origin || !formData.destination || !formData.travel_date) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await travelAPI.create({
        origin: formData.origin,
        destination: formData.destination,
        travel_date: formData.travel_date,
        capacity_kg: formData.capacity_kg,
      });

      navigate('/my-trips');
    } catch (err) {
      console.error('Error creating trip:', err);
      setError(err.response?.data?.detail || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-8 animate-fadeIn">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
            <Plane className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Add a Trip
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Earn money by delivering packages on your route</p>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 mb-6 shadow-sm">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Travel Details */}
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <div className="p-2 rounded-xl bg-green-50">
              <Plane className="w-5 h-5 text-green-600" />
            </div>
            Travel Information
          </h2>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="origin" className="text-sm font-semibold text-gray-700">Departure City *</Label>
              <Input
                id="origin"
                type="text"
                placeholder="Los Angeles, CA"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-green-400 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">Arrival City *</Label>
              <Input
                id="destination"
                type="text"
                placeholder="Tokyo, Japan"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-green-400 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travel_date" className="text-sm font-semibold text-gray-700">Travel Date *</Label>
              <Input
                id="travel_date"
                type="date"
                value={formData.travel_date}
                onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-green-400 transition-all"
                required
              />
            </div>
          </div>
        </Card>

        {/* Capacity & Pricing */}
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <div className="p-2 rounded-xl bg-blue-50">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            Delivery Capacity
          </h2>

          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-gray-700">Maximum Weight (kg)</Label>
                <span className="text-xl font-bold text-green-600 bg-green-50 px-4 py-1.5 rounded-xl">
                  {formData.capacity_kg} kg
                </span>
              </div>
              <Slider
                value={[formData.capacity_kg]}
                onValueChange={(v) => setFormData({ ...formData, capacity_kg: v[0] })}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                💡 Adjust based on your available luggage space
              </p>
            </div>
          </div>
        </Card>

        {/* Earning Potential */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="font-bold mb-3 flex items-center gap-2 text-green-900">
            <span className="text-xl">💰</span>
            Potential Earnings
          </h3>
          <p className="text-sm text-green-800">
            You can carry up to <strong>{formData.capacity_kg}kg</strong>. Earnings will depend on package requests and distance.
          </p>
        </Card>

        {/* Important Notes */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="font-bold mb-3 flex items-center gap-2 text-blue-900">
            <span className="text-xl">ℹ️</span>
            Traveler Guidelines
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 list-none">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>You can accept or decline any delivery request</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Always verify package contents before accepting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Keep packages secure during transit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Payment is released after successful delivery</span>
            </li>
          </ul>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)} 
            className="flex-1 h-12 rounded-xl hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1 h-12 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </span>
            ) : (
              'Add Trip & Find Packages'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
