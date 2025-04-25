import { ReactNode } from 'react';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function FilterSection({ title, children, className = '' }: FilterSectionProps) {
  return (
    <div className={`${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      {children}
    </div>
  );
}