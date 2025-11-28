'use client';

import { Drawer, Tag } from 'antd';
import { Travel } from '@/types/travel.types';
import { parseLocation } from '@/lib/locationParser';

interface ViewTripDrawerProps {
  open: boolean;
  onClose: () => void;
  travel: Travel | null;
}

export default function ViewTripDrawer({ open, onClose, travel }: ViewTripDrawerProps) {
  if (!travel) return null;

  const origin = parseLocation(travel.origin);
  const destination = parseLocation(travel.destination);

  return (
    <Drawer
      title="Détails du voyage"
      open={open}
      onClose={onClose}
      width={500}
    >
      <div className="space-y-6">
        {/* Départ */}
        <div className="border-b pb-4">
          <label className="text-gray-500 text-xs uppercase tracking-wide mb-2 block">Départ</label>
          <p className="text-xl font-semibold text-gray-900">{origin.city}</p>
          {origin.region && (
            <p className="text-sm text-gray-600 mt-1">
              {origin.district && `${origin.district}, `}
              {origin.region}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">{origin.country}</p>
        </div>

        {/* Destination */}
        <div className="border-b pb-4">
          <label className="text-gray-500 text-xs uppercase tracking-wide mb-2 block">Destination</label>
          <p className="text-xl font-semibold text-gray-900">{destination.city}</p>
          {destination.region && (
            <p className="text-sm text-gray-600 mt-1">
              {destination.district && `${destination.district}, `}
              {destination.region}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">{destination.country}</p>
        </div>

        {/* Date */}
        <div className="border-b pb-4">
          <label className="text-gray-500 text-xs uppercase tracking-wide mb-2 block">Date du voyage</label>
          <p className="text-lg font-medium">
            {new Date(travel.travel_date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Capacité */}
        <div className="border-b pb-4">
          <label className="text-gray-500 text-xs uppercase tracking-wide mb-2 block">Capacité disponible</label>
          <p className="text-lg font-medium">{travel.capacity_kg} kg</p>
        </div>

        {/* Statut */}
        <div className="border-b pb-4">
          <label className="text-gray-500 text-xs uppercase tracking-wide mb-2 block">Statut</label>
          <div className="mt-1">
            <Tag color={new Date(travel.travel_date) > new Date() ? 'blue' : 'gray'}>
              {new Date(travel.travel_date) > new Date() ? 'Planifié' : 'Passé'}
            </Tag>
          </div>
        </div>

        {/* Colis */}
        {travel.packages && travel.packages.length > 0 && (
          <div>
            <label className="text-gray-500 text-xs uppercase tracking-wide mb-2 block">Colis associés</label>
            <p className="text-lg font-medium">{travel.packages.length} colis</p>
          </div>
        )}
      </div>
    </Drawer>
  );
}
