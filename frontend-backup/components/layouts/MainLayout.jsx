import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RoleSwitcher from '../RoleSwitcher';
import { Button } from '../ui/button';
import { Package, Home, Plane, MessageSquare, User, LogOut } from 'lucide-react';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-0">
      {/* Header - Mobile Optimized */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo - Responsive sizing */}
            <Link to="/home" className="flex items-center gap-2 sm:gap-3 group">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md group-hover:shadow-lg transition-shadow">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LUGGAGE
              </span>
            </Link>

            {/* Navigation - Desktop only */}
            <nav className="hidden md:flex items-center gap-2">
              <Link 
                to="/home" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive('/home') 
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </Link>
              <Link 
                to="/my-trips" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive('/my-trips') 
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span className="text-sm">My Activity</span>
              </Link>
              <Link 
                to="/chat" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive('/chat') 
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Messages</span>
              </Link>
            </nav>

            {/* User Menu - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/profile" className="hidden sm:block">
                <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} className="rounded-xl hover:bg-red-50 hover:text-red-600 h-9 w-9">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Role Switcher - Scrollable on small screens */}
          {user && (
            <div className="py-2 sm:py-3 md:py-4 border-t border-gray-100 overflow-x-auto">
              <RoleSwitcher />
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Responsive padding */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {children}
      </main>

      {/* Mobile Navigation - Enhanced */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-4 h-16">
          <Link 
            to="/home" 
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive('/home') ? 'text-blue-600' : 'text-gray-500 active:text-gray-700'
            }`}
          >
            <Home className={`w-5 h-5 ${isActive('/home') ? 'fill-blue-600' : ''}`} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link 
            to="/my-trips" 
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive('/my-trips') ? 'text-blue-600' : 'text-gray-500 active:text-gray-700'
            }`}
          >
            <Plane className={`w-5 h-5 ${isActive('/my-trips') ? 'fill-blue-600' : ''}`} />
            <span className="text-[10px] font-medium">Activity</span>
          </Link>
          <Link 
            to="/chat" 
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive('/chat') ? 'text-blue-600' : 'text-gray-500 active:text-gray-700'
            }`}
          >
            <MessageSquare className={`w-5 h-5 ${isActive('/chat') ? 'fill-blue-600' : ''}`} />
            <span className="text-[10px] font-medium">Messages</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive('/profile') ? 'text-blue-600' : 'text-gray-500 active:text-gray-700'
            }`}
          >
            <User className={`w-5 h-5 ${isActive('/profile') ? 'fill-blue-600' : ''}`} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
