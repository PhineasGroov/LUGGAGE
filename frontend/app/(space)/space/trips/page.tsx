'use client';

import { useState } from 'react';
import { Button, Form, message, Modal } from 'antd';
import { Plus } from 'lucide-react';
import dayjs from 'dayjs';
import { useMyTravels, useTravelMutations } from '@/hooks/useTravels';
import type { Travel } from '@/types/travel.types';
import TripsList from '@/components/space/trips/TripsList';
import CreateTripDrawer from '@/components/space/trips/CreateTripDrawer';
import EditTripDrawer from '@/components/space/trips/EditTripDrawer';
import ViewTripDrawer from '@/components/space/trips/ViewTripDrawer';

export default function TripsPage() {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Travel | null>(null);
  const [form] = Form.useForm();
  const { travels, isLoading: loading } = useMyTravels();
  const { createTravel, updateTravel, deleteTravel } = useTravelMutations();

  const handleViewTrip = (id: number) => {
    const trip = travels.find(t => t.id === id);
    if (trip) {
      setSelectedTrip(trip);
      setIsViewDrawerOpen(true);
    }
  };

  const handleEditTrip = (id: number) => {
    const trip = travels.find(t => t.id === id);
    if (trip) {
      setSelectedTrip(trip);
      form.setFieldsValue({
        departure: trip.origin,
        destination: trip.destination,
        date: dayjs(trip.travel_date),
        capacity: trip.capacity_kg,
      });
      setIsEditDrawerOpen(true);
    }
  };

  const handleCreateTrip = async (values: any) => {
    try {
      await createTravel({
        origin: values.departure,
        destination: values.destination,
        travel_date: values.date.format('YYYY-MM-DD'),
        capacity_kg: values.capacity,
      });
      message.success('Voyage créé avec succès !');
      setIsCreateDrawerOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création du voyage');
    }
  };

  const handleUpdateTrip = async (values: any) => {
    if (!selectedTrip) return;
    try {
      await updateTravel(selectedTrip.id, {
        origin: values.departure,
        destination: values.destination,
        travel_date: values.date.format('YYYY-MM-DD'),
        capacity_kg: values.capacity,
      });
      message.success('Voyage modifié avec succès !');
      setIsEditDrawerOpen(false);
      form.resetFields();
      setSelectedTrip(null);
    } catch (error) {
      message.error('Erreur lors de la modification du voyage');
    }
  };

  const handleDeleteTrip = (id: number) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer ce voyage ?',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: async () => {
        try {
          await deleteTravel(id);
          message.success('Voyage supprimé avec succès !');
        } catch (error) {
          message.error('Erreur lors de la suppression du voyage');
        }
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Mes Voyages</h3>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => setIsCreateDrawerOpen(true)}
        >
          Nouveau voyage
        </Button>
      </div>

      <TripsList
        travels={travels}
        loading={loading}
        onView={handleViewTrip}
        onEdit={handleEditTrip}
        onDelete={handleDeleteTrip}
      />

      <CreateTripDrawer
        open={isCreateDrawerOpen}
        onClose={() => {
          setIsCreateDrawerOpen(false);
          form.resetFields();
        }}
        onSubmit={handleCreateTrip}
        form={form}
      />

      <EditTripDrawer
        open={isEditDrawerOpen}
        onClose={() => {
          setIsEditDrawerOpen(false);
          form.resetFields();
          setSelectedTrip(null);
        }}
        onSubmit={handleUpdateTrip}
        form={form}
      />

      <ViewTripDrawer
        open={isViewDrawerOpen}
        onClose={() => {
          setIsViewDrawerOpen(false);
          setSelectedTrip(null);
        }}
        travel={selectedTrip}
      />
    </div>
  );
}
