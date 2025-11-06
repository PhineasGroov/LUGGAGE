'use client';

import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
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

const { Header, Sider, Content } = Layout;

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
        className="!shadow-md"
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link href="/space/dashboard">
            <h1 className="text-xl font-bold text-blue-600">Luggage</h1>
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="!border-r-0"
        />
      </Sider>

      <Layout>
        <Header className="!bg-white !px-6 !shadow-sm flex items-center justify-between">
          <div className="text-lg font-semibold">
            {pathname === '/space/dashboard' && 'Dashboard'}
            {pathname === '/space/trips' && 'Mes Voyages'}
            {pathname === '/space/packages' && 'Mes Colis'}
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" className="flex items-center gap-2">
              <Avatar icon={<User className="h-4 w-4" />} />
              <span>Mon compte</span>
            </Button>
          </Dropdown>
        </Header>

        <Content className="m-6">
          <div className="bg-white p-6 rounded-lg shadow-sm min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
