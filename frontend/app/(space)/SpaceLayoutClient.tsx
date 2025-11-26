'use client';

import { Layout, Menu, Avatar, Dropdown, Button, Breadcrumb, theme } from 'antd';
import {
  LayoutDashboard,
  Send,
  Plane,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';
import Logo from '@/components/shared/ui/Logo';

const { Header, Content, Footer } = Layout;

export default function SpaceLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/auth/login');
  };

  const menuItems = [
    {
      key: '/space/dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: <Link href="/space/dashboard">Dashboard</Link>,
    },
    {
      key: '/space/trips',
      icon: <Plane className="h-4 w-4" />,
      label: <Link href="/space/trips">Mes Voyages</Link>,
    },
    {
      key: '/space/packages',
      icon: <Send className="h-4 w-4" />,
      label: <Link href="/space/packages">Mes Colis</Link>,
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <User className="h-4 w-4" />,
      label: 'Mon profil',
    },
    {
      key: 'settings',
      icon: <Settings className="h-4 w-4" />,
      label: 'Paramètres',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut className="h-4 w-4" />,
      label: 'Déconnexion',
      onClick: handleLogout,
      danger: true,
    },
  ];

  const breadcrumbItems = [
    { title: 'Accueil', href: '/space/dashboard' },
    ...(pathname === '/space/trips'
      ? [{ title: 'Mes Voyages' }]
      : pathname === '/space/packages'
      ? [{ title: 'Mes Colis' }]
      : [{ title: 'Dashboard' }]),
  ];

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          background: '#fff',
          padding: '0 2px',
          boxShadow: '0 2px 8px #f0f1f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ marginRight: 24 }}>
          <Logo size={32} withText={false} />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0, borderRight: 0 }}
        />
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Button type="text" className="flex items-center gap-2">
            <Avatar icon={<User className="h-4 w-4" />} />
            <span>Mon compte</span>
          </Button>
        </Dropdown>
      </Header>
      <Content style={{ padding: '0 20px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={breadcrumbItems}
        />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        LUGGAGE ©{new Date().getFullYear()} Créé par ton équipe
      </Footer>
    </Layout>
  );
}
