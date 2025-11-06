'use client';

import { useState } from 'react';
import { Table, Button, Tag, Space, Modal, Form, Input, DatePicker, InputNumber, Select, Upload, message } from 'antd';
import { Plus, Eye, Edit, Trash, Inbox } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;
const { Option } = Select;

interface Package {
  key: string;
  id: string;
  destination: string;
  weight: number;
  status: string;
  date: string;
  budget: number;
}

export default function PackagesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Données de démonstration
  const packages: Package[] = [
    {
      key: '1',
      id: 'PKG-001',
      destination: 'Paris',
      weight: 2.5,
      status: 'En transit',
      date: '2025-10-28',
      budget: 50,
    },
    {
      key: '2',
      id: 'PKG-002',
      destination: 'Lyon',
      weight: 5,
      status: 'En attente',
      date: '2025-10-30',
      budget: 75,
    },
    {
      key: '3',
      id: 'PKG-003',
      destination: 'Marseille',
      weight: 3,
      status: 'Livré',
      date: '2025-10-25',
      budget: 60,
    },
  ];

  const columns: ColumnsType<Package> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Poids',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight) => `${weight} kg`,
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => `${budget} €`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'Livré' ? 'green' :
          status === 'En transit' ? 'blue' :
          'orange';
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

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => false,
    onChange(info: any) {
      message.success(`${info.file.name} ajouté`);
    },
  };

  const handleCreatePackage = async (values: any) => {
    try {
      console.log('Nouveau colis:', values);
      message.success('Demande d\'expédition créée avec succès !');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la demande');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Colis</h1>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Nouvelle expédition
        </Button>
      </div>

      <Table columns={columns} dataSource={packages} />

      <Modal
        title="Créer une demande d'expédition"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreatePackage}
        >
          <Form.Item
            name="title"
            label="Titre du colis"
            rules={[{ required: true, message: 'Veuillez saisir un titre' }]}
          >
            <Input placeholder="Ex: Documents importants" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="departure"
              label="Ville de départ"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Input placeholder="Paris" />
            </Form.Item>

            <Form.Item
              name="destination"
              label="Destination"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Input placeholder="Lyon" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="weight"
              label="Poids approximatif (kg)"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <InputNumber min={0.1} max={50} step={0.1} className="w-full" />
            </Form.Item>

            <Form.Item
              name="budget"
              label="Budget (€)"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <InputNumber min={1} max={500} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            name="deliveryDate"
            label="Date de livraison souhaitée"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Catégorie"
            rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
          >
            <Select placeholder="Sélectionner une catégorie">
              <Option value="documents">Documents</Option>
              <Option value="electronics">Électronique</Option>
              <Option value="clothing">Vêtements</Option>
              <Option value="food">Nourriture</Option>
              <Option value="other">Autre</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description détaillée"
            rules={[{ required: true, message: 'Veuillez décrire votre colis' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Décrivez votre colis, dimensions, fragilité, etc."
            />
          </Form.Item>

          <Form.Item
            name="photos"
            label="Photos du colis (optionnel)"
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <Inbox className="h-12 w-12 mx-auto" />
              </p>
              <p className="ant-upload-text">Cliquez ou glissez des images ici</p>
              <p className="ant-upload-hint">
                Format acceptés: JPG, PNG (max 5MB)
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setIsModalOpen(false)}>
                Annuler
              </Button>
              <Button type="primary" htmlType="submit">
                Créer la demande
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
