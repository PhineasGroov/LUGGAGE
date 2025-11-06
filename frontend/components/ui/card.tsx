// Wrapper pour remplacer @/components/ui/card par Ant Design Card
import { Card as AntCard } from 'antd';
import { ReactNode } from 'react';

export const Card = ({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) => (
  <AntCard className={className} {...props}>
    {children}
  </AntCard>
);

export const CardContent = ({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) => (
  <div className={className} {...props}>
    {children}
  </div>
);
