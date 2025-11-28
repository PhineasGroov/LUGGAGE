'use client';

import { Drawer, Form, Input, Button, Space } from 'antd';
import LocationInput from '@/components/shared/LocationInput';

interface EditPackageDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  form: any;
}

export default function EditPackageDrawer({ open, onClose, onSubmit, form }: EditPackageDrawerProps) {
  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Drawer
      title="Modifier le colis"
      open={open}
      onClose={handleClose}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Description du colis"
          rules={[
            {
              required: true,
              message: 'Veuillez entrer une description',
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="destination"
          label="Destination"
          rules={[{ required: true, message: 'Veuillez entrer la destination' }]}
        >
          <LocationInput placeholder="Rechercher une destination..." />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Poids (kg)"
          rules={[{ required: true, message: 'Veuillez entrer le poids' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="dimensions" label="Dimensions (optionnel)">
          <Input placeholder="ex: 30x20x10 cm" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Mettre à jour
            </Button>
            <Button onClick={handleClose}>Annuler</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
