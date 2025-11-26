'use client';

import { Drawer, Tag } from 'antd';
import { Package as PackageType } from '@/types/package.types';
import { parseLocation } from '@/lib/locationParser';

interface ViewPackageDrawerProps {
  open: boolean;
  onClose: () => void;
  pkg: PackageType | null;
}

export default function ViewPackageDrawer({ open, onClose, pkg }: ViewPackageDrawerProps) {
  if (!pkg) return null;

  const destination = pkg.destination ? parseLocation(pkg.destination) : null;

  return (
    <Drawer
      title="Détails du colis"
      open={open}
      onClose={onClose}
      width={700}
    >
      <div className="space-y-6">
        {/* Description */}
        <div className="border-b pb-4">
          <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">Description</h3>
          <p className="text-base font-medium leading-relaxed">{pkg.description}</p>
        </div>
        
        {/* Destination */}
        {destination && (
          <div className="border-b pb-4">
            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">Destination</h3>
            <p className="text-xl font-semibold text-gray-900">{destination.city}</p>
            {destination.region && (
              <p className="text-sm text-gray-600 mt-1">
                {destination.district && `${destination.district}, `}
                {destination.region}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">{destination.country}</p>
          </div>
        )}
        
        {/* Poids et Dimensions */}
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">Poids</h3>
            <p className="text-lg font-medium">{pkg.weight_kg} kg</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">Dimensions</h3>
            <p className="text-lg font-medium">{pkg.dimensions || 'Standard'}</p>
          </div>
        </div>

        {/* Statut */}
        <div className="border-b pb-4">
          <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-2">Statut</h3>
          <Tag color={
            pkg.status === 'delivered' ? 'green' :
            pkg.status === 'in_transit' ? 'purple' :
            pkg.status === 'accepted' ? 'blue' :
            pkg.status === 'cancelled' ? 'red' : 'orange'
          }>
            {pkg.status === 'pending' && 'En attente'}
            {pkg.status === 'accepted' && 'Accepté'}
            {pkg.status === 'in_transit' && 'En transit'}
            {pkg.status === 'delivered' && 'Livré'}
            {pkg.status === 'cancelled' && 'Annulé'}
          </Tag>
        </div>

        {/* Voyage associé */}
        {pkg.travel && (() => {
          const travelOrigin = parseLocation(pkg.travel.origin);
          const travelDestination = parseLocation(pkg.travel.destination);
          
          return (
            <div>
              <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-3">Voyage associé</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Départ</p>
                    <p className="font-semibold">{travelOrigin.city}</p>
                    <p className="text-xs text-gray-500">{travelOrigin.country}</p>
                  </div>
                  <div className="text-gray-400 mx-4">→</div>
                  <div>
                    <p className="text-sm text-gray-500">Arrivée</p>
                    <p className="font-semibold">{travelDestination.city}</p>
                    <p className="text-xs text-gray-500">{travelDestination.country}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </Drawer>
  );
}
