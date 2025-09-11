import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="pb-6 text-center text-3xl font-bold">Se connecter à votre compte</h2>

      <form onSubmit={handleSubmit}>
        {/* Message d'erreur */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <p className="mb-6 text-sm text-gray-600 underline cursor-pointer">
          Mot de passe oublié ?
        </p>

        {/* Sign in button */}
        <button 
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <p className="mb-4 mt-6 text-center text-sm text-gray-500">Ou se connecter avec</p>

      {/* Social buttons */}
      <div className="flex flex-col gap-3">
        <button className="social-btn">
          <FcGoogle className="h-5 w-5" />
          <span>Continuer avec Google</span>
        </button>
        <button className="social-btn">
          <FaFacebook className="h-5 w-5 text-[#1877F2]" />
          <span>Continuer avec Facebook</span>
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-black underline font-medium">
          Créer un compte
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;