import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'sender'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
      role: formData.role
    });

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="pb-6 text-center text-3xl font-bold">Créer votre compte</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-4 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Role selector */}
        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-4 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="sender">🚀 Expéditeur - J'envoie des colis</option>
            <option value="traveler">✈️ Voyageur - Je transporte des colis</option>
          </select>
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-4 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-4 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Submit button */}
        <button 
          type="submit"
          disabled={loading}
          className="mb-6 w-full rounded-md bg-black py-3 text-base font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>
      </form>

      <p className="mb-4 text-center text-sm text-gray-500">Ou s'inscrire avec</p>

      {/* Social buttons */}
      <div className="flex flex-col gap-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium hover:bg-gray-50">
          <FcGoogle className="h-5 w-5" />
          <span>Continuer avec Google</span>
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium hover:bg-gray-50">
          <FaFacebook className="h-5 w-5 text-[#1877F2]" />
          <span>Continuer avec Facebook</span>
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        Déjà un compte ?{' '}
        <Link to="/login" className="text-black underline font-medium">
          Se connecter
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-gray-500">
        En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
      </p>
    </AuthLayout>
  );
}

export default Register;