'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-dark shadow-md hover:shadow-lg',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-dark shadow-md hover:shadow-lg',
        outline:
          'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'hover:bg-muted hover:text-foreground',
        cta: 'gradient-accent text-white shadow-lg hover:shadow-xl hover:scale-105',
      },
      size: {
        sm: 'h-9 px-4 py-2',
        md: 'h-11 px-6 py-2',
        lg: 'h-12 px-8 py-3',
        xl: 'h-14 px-10 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = `${buttonVariants({ variant, size })} ${className || ''}`;
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...(children.props as any),
        className: `${classes} ${(children.props as any).className || ''}`,
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
