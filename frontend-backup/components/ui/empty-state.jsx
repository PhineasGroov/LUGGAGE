import React from "react";
import { cn } from "../../lib/utils";

export default function EmptyState({
  icon = null,
  title,
  description,
  action = null,
  className,
}) {
  return (
    <div className={cn("p-12 text-center rounded-3xl border bg-white", className)}>
      {icon && (
        <div className="p-6 rounded-full bg-gray-50 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          {icon}
        </div>
      )}
      {title && <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>}
      {description && <p className="text-gray-600 mb-6 text-lg">{description}</p>}
      {action}
    </div>
  );
}
