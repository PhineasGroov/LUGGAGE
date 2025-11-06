import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Package, MapPin, Weight, DollarSign } from 'lucide-react';
import { packageAPI } from '../services/api';

const CreatePackage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    description: '',
    weight_kg: '',
    dimensions: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.description || !formData.weight_kg || !formData.dimensions) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await packageAPI.create({
        description: formData.description,
        weight_kg: parseFloat(formData.weight_kg),
        dimensions: formData.dimensions,
      });

      navigate('/my-trips');
    } catch (err) {
      console.error('Error creating package:', err);
      setError(err.response?.data?.detail || 'Failed to create package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-8 animate-fadeIn">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Package className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Send a Package
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Tell us about your package and we'll find the perfect traveler</p>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 mb-6 shadow-sm">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Details */}
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <div className="p-2 rounded-xl bg-blue-50">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            Package Information
          </h2>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">Weight (kg) *</Label>
              <div className="relative">
                <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="5.0"
                  value={formData.weight_kg}
                  onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                  className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions" className="text-sm font-semibold text-gray-700">Dimensions (e.g., 30x20x10 cm) *</Label>
              <Input
                id="dimensions"
                type="text"
                placeholder="30x20x10"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your package contents (be honest for customs purposes)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 transition-all resize-none"
                required
              />
            </div>
          </div>
        </Card>

        {/* Important Notes */}
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="font-bold mb-3 flex items-center gap-2 text-amber-900">
            <span className="text-xl">⚠️</span>
            Important Guidelines
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 list-none">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Prohibited items: Weapons, drugs, flammable materials, perishables</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>All packages are subject to customs regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Ensure proper packaging to prevent damage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>Insurance is recommended for valuable items</span>
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
            className="flex-1 h-12 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </span>
            ) : (
              'Create Package'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePackage;
