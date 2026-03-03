'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

interface NavLink {
  label: string;
  url: string;
}

export function NavbarBlock({ component, isSelected }: BlockProps) {
  const { selectComponent } = useBuilderStore();
  const p = component.props;
  const links = p.links as NavLink[];

  return (
    <div
      className={`w-full cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
      style={{ backgroundColor: p.backgroundColor as string }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        <div className="text-xl font-bold" style={{ color: p.textColor as string }}>
          {p.logo as string}
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="font-medium hover:opacity-70 transition-opacity"
              style={{ color: p.textColor as string }}
              onClick={(e) => e.preventDefault()}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={p.ctaUrl as string}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          {p.ctaText as string}
        </a>
      </div>
    </div>
  );
}
