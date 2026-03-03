'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

export function ImageBlock({ component, isSelected }: BlockProps) {
  const { selectComponent } = useBuilderStore();
  const p = component.props;

  return (
    <div
      className={`w-full cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="rounded-xl overflow-hidden shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src as string}
            alt={p.alt as string}
            className="w-full h-auto max-h-96"
            style={{ objectFit: p.objectFit as React.CSSProperties['objectFit'] }}
          />
        </div>
        {(p.caption as string) && (
          <p className="text-center text-sm text-gray-500 mt-3 italic">{p.caption as string}</p>
        )}
      </div>
    </div>
  );
}
