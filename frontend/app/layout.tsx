import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luggage - Livraison collaborative',
  description: 'Plateforme de livraison collaborative entre voyageurs et expéditeurs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className=''>
      <body>
        <AntdRegistry>
          <ConfigProvider
            locale={frFR}
            theme={{
              token: {
                colorPrimary: 'hsl(215, 70%, 35%)',
                colorSuccess: 'hsl(150, 60%, 45%)',
                colorWarning: 'hsl(25, 95%, 55%)',
                colorError: 'hsl(0, 84.2%, 60.2%)',
                borderRadius: 8,
                colorBgContainer: 'hsl(0, 0%, 100%)',
                colorText: 'hsl(220, 20%, 15%)',
                colorBorder: 'hsl(215, 20%, 88%)',
              },
              components: {
                Button: {
                  primaryShadow: '0 4px 6px -1px hsl(215 70% 35% / 0.1)',
                },
                Input: {
                  controlHeight: 44,
                },
              },
            }}
          >
            <AuthProvider>
              {children}
            </AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
