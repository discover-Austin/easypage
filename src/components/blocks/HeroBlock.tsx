'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

export function HeroBlock({ component, isSelected }: BlockProps) {
  const { selectComponent, updateComponent } = useBuilderStore();
  const p = component.props;

  const bgStyle = (p.backgroundColor as string)?.includes('from-')
    ? { background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }
    : { backgroundColor: p.backgroundColor as string };

  const handleEdit = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    updateComponent(component.id, { props: { ...p, [field]: e.target.innerText } });
  };

  return (
    <div
      className={`relative w-full cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 ring-offset-0' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
      style={bgStyle}
    >
      <div className="container mx-auto px-6 py-24 text-center max-w-4xl">
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={handleEdit('title')}
          className="text-5xl font-extrabold mb-4 outline-none focus:underline decoration-white/50"
          style={{ color: p.textColor as string }}
        >
          {p.title as string}
        </h1>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={handleEdit('subtitle')}
          className="text-xl mb-8 outline-none opacity-90 max-w-2xl mx-auto"
          style={{ color: p.textColor as string }}
        >
          {p.subtitle as string}
        </p>
        <a
          href={p.buttonUrl as string}
          className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-lg transition-shadow text-lg"
          onClick={(e) => e.preventDefault()}
        >
          {p.buttonText as string}
        </a>
      </div>
    </div>
  );
}
