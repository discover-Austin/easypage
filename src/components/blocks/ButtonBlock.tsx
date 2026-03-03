'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

export function ButtonBlock({ component, isSelected }: BlockProps) {
  const { selectComponent } = useBuilderStore();
  const p = component.props;

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const variant = (p.variant as string) || 'primary';
  const size = (p.size as string) || 'medium';

  return (
    <div
      className={`w-full cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      <div className={`py-8 px-6 flex ${p.fullWidth ? 'justify-stretch' : 'justify-center'}`}>
        <a
          href={p.url as string}
          className={`inline-block rounded-lg font-semibold transition-colors ${variants[variant as keyof typeof variants] || variants.primary} ${sizes[size as keyof typeof sizes] || sizes.medium} ${p.fullWidth ? 'w-full text-center' : ''}`}
          onClick={(e) => e.preventDefault()}
        >
          {p.text as string}
        </a>
      </div>
    </div>
  );
}
