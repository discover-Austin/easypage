'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

export function TextBlock({ component, isSelected }: BlockProps) {
  const { selectComponent, updateComponent } = useBuilderStore();
  const p = component.props;

  return (
    <div
      className={`w-full cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateComponent(component.id, { props: { ...p, content: e.target.innerText } })}
          className="outline-none"
          style={{
            fontSize: p.fontSize as string,
            textAlign: p.textAlign as React.CSSProperties['textAlign'],
            color: p.color as string,
            lineHeight: '1.8',
          }}
        >
          {p.content as string}
        </p>
      </div>
    </div>
  );
}
