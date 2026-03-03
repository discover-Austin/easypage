'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export function FeaturesBlock({ component, isSelected }: BlockProps) {
  const { selectComponent } = useBuilderStore();
  const p = component.props;
  const features = p.features as Feature[];

  return (
    <div
      className={`w-full bg-gray-50 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">{p.title as string}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
