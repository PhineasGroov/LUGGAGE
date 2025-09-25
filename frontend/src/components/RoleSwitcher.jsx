import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api.js';

const RoleSwitcher = () => {
  const { user, updateUser } = useAuth();

  const switchRole = async (newRole) => {
    try {
      const response = await userAPI.switchRole(newRole);
      updateUser(response.data);
    } catch (error) {
      console.error('Failed to switch role:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
      <span className="text-gray-600 font-medium">Je veux :</span>
      <button 
        onClick={() => switchRole('sender')}
        className={`px-4 py-2 rounded-md transition-colors ${
          user?.current_role === 'sender' 
            ? 'bg-blue-500 text-white shadow-md' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        📦 Envoyer un colis
      </button>
      <button 
        onClick={() => switchRole('traveler')}
        className={`px-4 py-2 rounded-md transition-colors ${
          user?.current_role === 'traveler' 
            ? 'bg-green-500 text-white shadow-md' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        ✈️ Proposer un voyage
      </button>
    </div>
  );
};

export default RoleSwitcher;