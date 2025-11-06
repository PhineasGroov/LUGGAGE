'use client';

import { Row, Col, Card, Statistic, Typography, Table, Tag, Button } from 'antd';
import {
  Send,
  Plane,
  CheckCircle,
  Clock,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

const { Title } = Typography;

export default function DashboardPage() {
  // Données de démonstration
  const stats = [
    { title: 'Colis actifs', value: 3, icon: <Send className="h-4 w-4" />, color: '#1890ff' },
    { title: 'Voyages en cours', value: 2, icon: <Plane className="h-4 w-4" />, color: '#52c41a' },
    { title: 'Livraisons réussies', value: 12, icon: <CheckCircle className="h-4 w-4" />, color: '#faad14' },
    { title: 'En attente', value: 1, icon: <Clock className="h-4 w-4" />, color: '#f5222d' },
  ];

  const recentPackages = [
    {
      key: '1',
      id: 'PKG-001',
      destination: 'Paris',
      status: 'En transit',
      date: '2025-10-28',
    },
    {
      key: '2',
      id: 'PKG-002',
      destination: 'Lyon',
      status: 'En attente',
      date: '2025-10-30',
    },
    {
      key: '3',
      id: 'PKG-003',
      destination: 'Marseille',
      status: 'Livré',
      date: '2025-10-25',
    },
  ];

  const columns = [
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'Livré' ? 'green' :
          status === 'En transit' ? 'blue' :
          'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="mb-0!">Tableau de bord</Title>
        <div className="flex gap-2">
          <Link href="/space/packages/new">
            <Button type="primary" icon={<Send className="h-4 w-4" />}>
              Nouveau colis
            </Button>
          </Link>
          <Link href="/space/trips/new">
            <Button icon={<Plane className="h-4 w-4" />}>
              Nouveau voyage
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Activité récente */}
      <Card title="Activité récente" className="mb-6">
        <Table
          dataSource={recentPackages}
          columns={columns}
          pagination={false}
        />
      </Card>

      {/* Actions rapides */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title="Expédition"
            extra={<Plus className="h-4 w-4" />}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-gray-600">
              Créez une nouvelle demande d'expédition et trouvez un voyageur
            </p>
            <Link href="/space/packages/new">
              <Button type="link" className="p-0!">
                Créer une demande →
              </Button>
            </Link>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Transport"
            extra={<Plus className="h-4 w-4" />}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-gray-600">
              Proposez un voyage et gagnez de l'argent en transportant des colis
            </p>
            <Link href="/space/trips/new">
              <Button type="link" className="p-0!">
                Proposer un voyage →
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
