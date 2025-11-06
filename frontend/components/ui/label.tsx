// Wrapper pour remplacer @/components/ui/label
import { ReactNode } from 'react';

export const Label = ({ children, htmlFor, ...props }: { children: ReactNode; htmlFor?: string; [key: string]: any }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-foreground mb-2 block" {...props}>
    {children}
  </label>
);
