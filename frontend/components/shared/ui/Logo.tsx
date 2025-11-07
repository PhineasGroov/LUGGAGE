"use client";

import Link from "next/link";
import { Package } from "lucide-react";

interface LogoProps {
  withText?: boolean;
  href?: string;
  className?: string;
  size?: number;
}

const Logo = ({
  withText = true,
  href = "/",
  className = "",
  size = 32,
}: LogoProps) => (
  <Link href={href} className={`flex items-center gap-2 group ${className}`}>
    <div
      className="bg-primary rounded-lg p-2 group-hover:bg-primary-light transition-smooth flex items-center justify-center"
      style={{ height: size, width: size }}
    >
      <Package
        className="text-primary-foreground"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />
    </div>
    {withText && (
      <span
        className="font-bold text-foreground"
        style={{
          fontSize: size > 24 ? size * 0.7 : 18,
        }}
      >
        Luggage
      </span>
    )}
  </Link>
);

export default Logo;
