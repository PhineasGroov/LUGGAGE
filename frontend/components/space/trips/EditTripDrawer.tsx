'use client';

import { Drawer, Form, Input, DatePicker, InputNumber, Button, Space } from 'antd';
import LocationInput from '@/components/shared/LocationInput';

interface EditTripDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  form: any;
}

export default function EditTripDrawer({ open, onClose, onSubmit, form }: EditTripDrawerProps) {
  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Drawer
      title="Modifier le voyage"
      open={open}
      onClose={handleClose}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="departure"
          label="Ville de départ"
          rules={[{ required: true, message: 'Veuillez saisir la ville de départ' }]}
        >
          <LocationInput placeholder="Rechercher une ville de départ..." />
        </Form.Item>

        <Form.Item
          name="destination"
          label="Destination"
          rules={[{ required: true, message: 'Veuillez saisir la destination' }]}
        >
          <LocationInput placeholder="Rechercher une destination..." />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date et heure du voyage"
          rules={[{ required: true, message: 'Veuillez sélectionner une date et heure' }]}
        >
          <DatePicker 
            className="w-full" 
            format="DD/MM/YYYY HH:mm" 
            showTime={{ format: 'HH:mm' }}
          />
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Capacité disponible (kg)"
          rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
        >
          <InputNumber min={1} max={50} className="w-full" />
        </Form.Item>

        <Form.Item>
          <Space className="w-full justify-end">
            <Button onClick={handleClose}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Modifier
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
