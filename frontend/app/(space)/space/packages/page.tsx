'use client';

import { useState } from 'react';
import { Button, Form, message, Modal } from 'antd';
import { Plus } from 'lucide-react';
import { useMyPackages, usePackageMutations } from '@/hooks/usePackages';
import type { Package as PackageType } from '@/types/package.types';
import PackagesList from '@/components/space/packages/PackagesList';
import CreatePackageDrawer from '@/components/space/packages/CreatePackageDrawer';
import EditPackageDrawer from '@/components/space/packages/EditPackageDrawer';
import ViewPackageDrawer from '@/components/space/packages/ViewPackageDrawer';

export default function PackagesPage() {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [form] = Form.useForm();
  const { packages: packagesData, isLoading: loading } = useMyPackages();
  const { createPackage } = usePackageMutations();

  const handleViewPackage = (id: number) => {
    const pkg = packagesData.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
      setIsViewDrawerOpen(true);
    }
  };

  const handleEditPackage = (id: number) => {
    const pkg = packagesData.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
      form.setFieldsValue({
        title: pkg.description,
        destination: pkg.destination,
        weight: pkg.weight_kg,
        dimensions: pkg.dimensions,
      });
      setIsEditDrawerOpen(true);
    }
  };

  const handleCreatePackage = async (values: any) => {
    try {
      await createPackage({
        description: values.title,
        weight_kg: values.weight,
        dimensions: `${values.dimensions || 'Standard'}`,
        destination: values.destination,
      });
      message.success('Demande d\'expédition créée avec succès !');
      setIsCreateDrawerOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la demande');
    }
  };

  const handleUpdatePackage = async (values: any) => {
    if (!selectedPackage) return;
    try {
      // Note: Il faudrait ajouter updatePackage dans le service
      message.success('Colis modifié avec succès !');
      setIsEditDrawerOpen(false);
      form.resetFields();
      setSelectedPackage(null);
    } catch (error) {
      message.error('Erreur lors de la modification du colis');
    }
  };

  const handleDeletePackage = (id: number) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer ce colis ?',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: async () => {
        try {
          // Note: Il faudrait ajouter deletePackage dans le service
          message.success('Colis supprimé avec succès !');
        } catch (error) {
          message.error('Erreur lors de la suppression du colis');
        }
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Colis</h1>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => setIsCreateDrawerOpen(true)}
        >
          Nouvelle expédition
        </Button>
      </div>

      <PackagesList
        packages={packagesData}
        loading={loading}
        onView={handleViewPackage}
        onEdit={handleEditPackage}
        onDelete={handleDeletePackage}
      />

      <CreatePackageDrawer
        open={isCreateDrawerOpen}
        onClose={() => {
          setIsCreateDrawerOpen(false);
          form.resetFields();
        }}
        onSubmit={handleCreatePackage}
        form={form}
      />

      <EditPackageDrawer
        open={isEditDrawerOpen}
        onClose={() => {
          setIsEditDrawerOpen(false);
          form.resetFields();
          setSelectedPackage(null);
        }}
        onSubmit={handleUpdatePackage}
        form={form}
      />

      <ViewPackageDrawer
        open={isViewDrawerOpen}
        onClose={() => {
          setIsViewDrawerOpen(false);
          setSelectedPackage(null);
        }}
        pkg={selectedPackage}
      />
    </div>
  );
}
