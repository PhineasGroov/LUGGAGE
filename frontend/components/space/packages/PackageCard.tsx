'use client';

import { Button, Tag, Tooltip } from 'antd';
import { Eye, Edit, Trash, MapPin, Weight, Package as PackageIcon, Ruler, MessageSquare } from 'lucide-react';
import { Package as PackageType } from '@/types/package.types';
import { parseLocation } from '@/lib/locationParser';

interface PackageCardProps {
  pkg: PackageType;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PackageCard({ pkg, onView, onEdit, onDelete }: PackageCardProps) {
  const destination = pkg.destination ? parseLocation(pkg.destination) : null;
  
  const statusConfig = {
    pending: { color: 'orange', text: 'En attente', icon: '⏳', gradient: 'from-orange-50 to-yellow-50' },
    accepted: { color: 'blue', text: 'Accepté', icon: '✓', gradient: 'from-blue-50 to-cyan-50' },
    in_transit: { color: 'purple', text: 'En transit', icon: '🚚', gradient: 'from-purple-50 to-pink-50' },
    delivered: { color: 'green', text: 'Livré', icon: '✅', gradient: 'from-green-50 to-emerald-50' },
    cancelled: { color: 'red', text: 'Annulé', icon: '❌', gradient: 'from-red-50 to-rose-50' },
  };
  
  const status = statusConfig[pkg.status] || statusConfig.pending;

  return (
    <div className="h-full bg-white rounded-xs border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Header compact (1 ligne) */}
      <div className="px-4 py-2 border-b bg-gray-50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
            <PackageIcon className="h-4 w-4 text-gray-600 shrink-0" />
            <p className="text-sm font-medium text-gray-900 truncate">{pkg.description}</p>
          </div>
          <Tag color={status.color} className="m-0! text-xs! shrink-0">
            {status.icon} {status.text}
          </Tag>
      </div>

      {/* Corps compact avec destination et infos */}
      <div className={`px-4 py-3 bg-linear-to-r ${status.gradient}`}>
        <div className="flex items-center gap-4 flex-wrap">
            {/* Destination */}
            {destination && (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <MapPin className="h-4 w-4 text-gray-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{destination.city}</p>
                  <p className="text-xs text-gray-600 truncate">{destination.country}</p>
                </div>
              </div>
            )}

            {/* Poids et dimensions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow-sm">
                <Weight className="h-3 w-3 text-blue-600 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">{pkg.weight_kg} kg</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow-sm">
                <Ruler className="h-3 w-3 text-purple-600 shrink-0" />
                <span className="text-xs font-semibold text-gray-900">{pkg.dimensions || 'Standard'}</span>
              </div>
            </div>
          </div>
      </div>

      {/* Footer compact: Voyage assigné + Actions */}
      <div className="px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
        {/* Voyage assigné */}
        <div className="flex items-center gap-2">
            {pkg.travel ? (
              <>
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
                <span className="text-xs font-medium text-green-700">Voyage assigné</span>
              </>
            ) : (
              <span className="text-xs text-gray-500">Aucun voyage</span>
            )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
            {/* Futures fonctionnalités */}
            <Tooltip title="Conversation (bientôt disponible)">
              <Button
                type="text"
                size="small"
                disabled
                icon={<MessageSquare className="h-4 w-4" />}
                className="opacity-50"
              />
            </Tooltip>

            {/* Séparateur */}
            <div className="h-4 w-px bg-gray-300 mx-1" />

            {/* Actions CRUD */}
            <Tooltip title="Voir">
              <Button
                type="text"
                size="small"
                icon={<Eye className="h-4 w-4" />}
                onClick={() => onView(pkg.id)}
                className="hover:bg-purple-50 hover:text-purple-600"
              />
            </Tooltip>
            <Tooltip title="Modifier">
              <Button
                type="text"
                size="small"
                icon={<Edit className="h-4 w-4" />}
                onClick={() => onEdit(pkg.id)}
                className="hover:bg-purple-50 hover:text-purple-600"
              />
            </Tooltip>
            <Tooltip title="Supprimer">
              <Button
                type="text"
                size="small"
                danger
                icon={<Trash className="h-4 w-4" />}
                onClick={() => onDelete(pkg.id)}
                className="hover:bg-red-50"
              />
            </Tooltip>
          </div>
      </div>
    </div>
  );
}
