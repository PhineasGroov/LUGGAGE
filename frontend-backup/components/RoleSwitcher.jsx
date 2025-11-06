import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api.js';
import { toast } from 'sonner';

const RoleSwitcher = () => {
  const { user, updateUser } = useAuth();

  const switchRole = async (newRole) => {
    try {
      const response = await userAPI.switchRole(newRole);
      updateUser(response.data);
      toast.success(`Switched to ${newRole} mode!`);
    } catch (error) {
      console.error('Failed to switch role:', error);
      toast.error('Failed to switch role. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-2xl border border-gray-200">
      <span className="text-sm text-gray-600 font-medium">Je veux :</span>
      <div className="flex gap-2">
        <button 
          onClick={() => switchRole('sender')}
          className={`group px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 font-semibold ${
            user?.current_role === 'sender' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105' 
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md active:scale-95'
          }`}
        >
          <span className="text-lg">📦</span>
          <span className="text-sm">Envoyer un colis</span>
        </button>
        <button 
          onClick={() => switchRole('traveler')}
          className={`group px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 font-semibold ${
            user?.current_role === 'traveler' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105' 
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md active:scale-95'
          }`}
        >
          <span className="text-lg">✈️</span>
          <span className="text-sm">Proposer un voyage</span>
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;