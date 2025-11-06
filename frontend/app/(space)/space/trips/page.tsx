'use client';

import { useState } from 'react';
import { Table, Button, Tag, Space, Modal, Form, Input, DatePicker, InputNumber, message } from 'antd';
import { Plus, Eye, Edit, Trash } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';

interface Trip {
  key: string;
  id: string;
  departure: string;
  destination: string;
  date: string;
  capacity: number;
  status: string;
  price: number;
}

export default function TripsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Données de démonstration
  const trips: Trip[] = [
    {
      key: '1',
      id: 'TRP-001',
      departure: 'Paris',
      destination: 'Lyon',
      date: '2025-11-05',
      capacity: 5,
      status: 'Actif',
      price: 25,
    },
    {
      key: '2',
      id: 'TRP-002',
      departure: 'Marseille',
      destination: 'Paris',
      date: '2025-11-10',
      capacity: 3,
      status: 'Planifié',
      price: 30,
    },
  ];

  const columns: ColumnsType<Trip> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Départ',
      dataIndex: 'departure',
      key: 'departure',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Capacité',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity) => `${capacity} kg`,
    },
    {
      title: 'Prix/kg',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} €`,
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'Actif' ? 'green' : 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<Eye className="h-4 w-4" />} size="small" />
          <Button icon={<Edit className="h-4 w-4" />} size="small" />
          <Button icon={<Trash className="h-4 w-4" />} size="small" danger />
        </Space>
      ),
    },
  ];

  const handleCreateTrip = async (values: any) => {
    try {
      console.log('Nouveau voyage:', values);
      message.success('Voyage créé avec succès !');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création du voyage');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Voyages</h1>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Nouveau voyage
        </Button>
      </div>

      <Table columns={columns} dataSource={trips} />

      <Modal
        title="Créer un nouveau voyage"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTrip}
        >
          <Form.Item
            name="departure"
            label="Ville de départ"
            rules={[{ required: true, message: 'Veuillez saisir la ville de départ' }]}
          >
            <Input placeholder="Paris" />
          </Form.Item>

          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: 'Veuillez saisir la destination' }]}
          >
            <Input placeholder="Lyon" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date du voyage"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacité disponible (kg)"
            rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
          >
            <InputNumber min={1} max={50} className="w-full" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Prix par kg (€)"
            rules={[{ required: true, message: 'Veuillez saisir le prix' }]}
          >
            <InputNumber min={1} max={100} className="w-full" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={4} placeholder="Informations complémentaires..." />
          </Form.Item>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setIsModalOpen(false)}>
                Annuler
              </Button>
              <Button type="primary" htmlType="submit">
                Créer le voyage
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
