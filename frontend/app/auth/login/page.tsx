'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { User, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', {
        username: values.username,
        password: values.password,
      });
      
      // Stocker le token dans les cookies
      document.cookie = `token=${response.data.access_token}; path=/; max-age=86400`;
      
      message.success('Connexion réussie !');
      router.push('/space/dashboard');
    } catch (error: any) {
      message.error(error.response?.data?.detail || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">Connexion</Title>
          <Text type="secondary">Accédez à votre espace Luggage</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Veuillez saisir votre nom d\'utilisateur' }]}
          >
            <Input
              prefix={<User className="h-4 w-4" />}
              placeholder="Nom d'utilisateur"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Veuillez saisir votre mot de passe' }]}
          >
            <Input.Password
              prefix={<Lock className="h-4 w-4" />}
              placeholder="Mot de passe"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Se connecter
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Pas encore de compte ?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700">
                S'inscrire
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
