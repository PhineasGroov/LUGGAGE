import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white shadow-sm"
    >
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex size-8 items-center justify-center text-navy"
          >
            <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              />
            </svg>
          </motion.div>
          <h1 className="text-xl font-semibold text-navy">LUGGAGE</h1>
        </Link>
        
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-gray-600 hover:text-navy transition-colors">
              Trouver un voyageur
            </Link>
            <Link to="/create-trip" className="text-gray-600 hover:text-navy transition-colors">
              Proposer un voyage
            </Link>
          </nav>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-navy transition-colors"
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-navy transition-colors"
            >
              <Bell className="h-5 w-5" />
            </motion.button>
          </>
        )}
        
        {isAuthenticated ? (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="rounded-lg bg-navy px-5 py-2 text-sm font-medium text-white hover:bg-navy/90 transition-colors"
          >
            Déconnexion
          </motion.button>
        ) : (
          <motion.div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="text-navy hover:text-navy/90 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              to="/register"
              className="rounded-lg bg-gold px-5 py-2 text-sm font-medium text-navy hover:bg-gold/90 transition-colors"
            >
              S'inscrire
            </Link>
          </motion.div>
        )}
        
        <button className="md:hidden p-2 text-gray-600 hover:text-navy transition-colors">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </motion.header>
  );
}

export default Header;