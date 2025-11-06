'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Select } from 'antd';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      
      message.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      router.push('/auth/login');
    } catch (error: any) {
      message.error(error.response?.data?.detail || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2!">Inscription</Title>
          <Text type="secondary">Créez votre compte Luggage</Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Veuillez saisir un nom d\'utilisateur' },
              { min: 3, message: 'Minimum 3 caractères' }
            ]}
          >
            <Input
              prefix={<User className="h-4 w-4" />}
              placeholder="Nom d'utilisateur"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Veuillez saisir votre email' },
              { type: 'email', message: 'Email invalide' }
            ]}
          >
            <Input
              prefix={<Mail className="h-4 w-4" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Veuillez saisir un mot de passe' },
              { min: 6, message: 'Minimum 6 caractères' }
            ]}
          >
            <Input.Password
              prefix={<Lock className="h-4 w-4" />}
              placeholder="Mot de passe"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Veuillez confirmer votre mot de passe' },
              ({ getFieldValue }: any) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Les mots de passe ne correspondent pas'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<Lock className="h-4 w-4" />}
              placeholder="Confirmer le mot de passe"
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Veuillez sélectionner un rôle' }]}
          >
            <Select placeholder="Je suis...">
              <Option value="sender">Expéditeur (j'envoie des colis)</Option>
              <Option value="traveler">Voyageur (je transporte des colis)</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Créer mon compte
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Déjà un compte ?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                Se connecter
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
