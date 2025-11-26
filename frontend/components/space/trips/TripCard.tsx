'use client';

import { Button, Tag, Tooltip } from 'antd';
import { Eye, Edit, Trash, Calendar, Package, MapPin, ArrowRight, MessageSquare, Users } from 'lucide-react';
import { Travel } from '@/types/travel.types';
import { parseLocation } from '@/lib/locationParser';

interface TripCardProps {
  travel: Travel;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TripCard({ travel, onView, onEdit, onDelete }: TripCardProps) {
  const origin = parseLocation(travel.origin);
  const destination = parseLocation(travel.destination);
  const travelDate = new Date(travel.travel_date);
  const isPast = travelDate < new Date();

  return (
    <div className="h-full bg-white rounded border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Header compact (1 ligne) */}
      <div className="px-4 py-2 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-600 shrink-0" />
          <span className="text-sm font-medium text-gray-900">
            {travelDate.toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })} à {travelDate.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <Tag color={isPast ? 'default' : 'blue'} className="m-0! text-xs">
          {isPast ? '✓ Effectué' : '📅 Planifié'}
        </Tag>
      </div>

      {/* Itinéraire horizontal compact */}
      <div className="px-4 py-3 bg-linear-to-r from-gray-50 to-green-50">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Départ */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{origin.city}</p>
              <p className="text-xs text-gray-600 truncate">{origin.country}</p>
            </div>
          </div>

          {/* Flèche */}
          <ArrowRight className="h-5 w-5 text-gray-400 shrink-0" />

          {/* Arrivée */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <MapPin className="h-4 w-4 text-green-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{destination.city}</p>
              <p className="text-xs text-gray-600 truncate">{destination.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer compact: Infos + Actions */}
      <div className="px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
        {/* Infos gauche */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
            <Package className="h-3 w-3 text-gray-600 shrink-0" />
            <span className="text-xs font-semibold text-gray-900">{travel.capacity_kg} kg</span>
          </div>
          
          {travel.packages && travel.packages.length > 0 && (
            <Tag color="green" className="m-0! text-xs! py-0!">
              {travel.packages.length} colis
            </Tag>
          )}
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-1">
          {/* Futures fonctionnalités (désactivées) */}
          <Tooltip title="Conversations (bientôt disponible)">
            <Button
              type="text"
              size="small"
              disabled
              icon={<MessageSquare className="h-4 w-4" />}
              className="opacity-50"
            />
          </Tooltip>
          <Tooltip title="Demandes de colis (bientôt disponible)">
            <Button
              type="text"
              size="small"
              disabled
              icon={<Users className="h-4 w-4" />}
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
              onClick={() => onView(travel.id)}
              className="hover:bg-blue-50 hover:text-blue-600"
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button
              type="text"
              size="small"
              icon={<Edit className="h-4 w-4" />}
              onClick={() => onEdit(travel.id)}
              className="hover:bg-blue-50 hover:text-blue-600"
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button
              type="text"
              size="small"
              danger
              icon={<Trash className="h-4 w-4" />}
              onClick={() => onDelete(travel.id)}
              className="hover:bg-red-50"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
