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
import { useMyTravels } from '@/hooks/useTravels';
import { useMyPackages } from '@/hooks/usePackages';
import type { PackageStatus } from '@/types/package.types';

const { Title } = Typography;

export default function DashboardPage() {
  const { travels, isLoading: loadingTravels } = useMyTravels();
  const { packages, isLoading: loadingPackages } = useMyPackages();
  const loading = loadingTravels || loadingPackages;

  // Calcul des statistiques réelles
  const stats = [
    { 
      title: 'Colis actifs', 
      value: packages.filter(p => p.status === 'pending' || p.status === 'accepted').length,
      icon: <Send className="h-4 w-4" />, 
      color: '#1890ff' 
    },
    { 
      title: 'Voyages en cours', 
      value: travels.filter(t => new Date(t.travel_date) > new Date()).length,
      icon: <Plane className="h-4 w-4" />, 
      color: '#52c41a' 
    },
    { 
      title: 'Livraisons réussies', 
      value: packages.filter(p => p.status === 'delivered').length,
      icon: <CheckCircle className="h-4 w-4" />, 
      color: '#faad14' 
    },
    { 
      title: 'En attente', 
      value: packages.filter(p => p.status === 'pending').length,
      icon: <Clock className="h-4 w-4" />, 
      color: '#f5222d' 
    },
  ];

  // Activité récente (derniers colis)
  const recentPackages = packages.slice(0, 5).map(pkg => ({
    key: pkg.id.toString(),
    id: `PKG-${pkg.id}`,
    destination: pkg.destination || 'N/A',
    status: pkg.status,
    date: new Date(pkg.created_at || '').toLocaleDateString('fr-FR'),
  }));

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
      render: (status: PackageStatus) => {
        const statusMap = {
          pending: { color: 'orange', text: 'En attente' },
          accepted: { color: 'blue', text: 'Accepté' },
          in_transit: { color: 'purple', text: 'En transit' },
          delivered: { color: 'green', text: 'Livré' },
          cancelled: { color: 'red', text: 'Annulé' },
        };
        const { color, text } = statusMap[status] || statusMap.pending;
        return <Tag color={color}>{text}</Tag>;
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
          loading={loading}
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
