'use client';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Layout, Type, ImageIcon, MousePointer, Navigation, PanelBottom, MessageSquare, DollarSign, Mail, Star, GripVertical } from 'lucide-react';

interface ComponentItem {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const components: ComponentItem[] = [
  { type: 'navbar', label: 'Navbar', icon: <Navigation size={18} />, description: 'Top navigation bar' },
  { type: 'hero', label: 'Hero', icon: <Layout size={18} />, description: 'Full-width hero section' },
  { type: 'features', label: 'Features', icon: <Star size={18} />, description: 'Feature highlights grid' },
  { type: 'text', label: 'Text', icon: <Type size={18} />, description: 'Paragraph text block' },
  { type: 'image', label: 'Image', icon: <ImageIcon size={18} />, description: 'Image with caption' },
  { type: 'button', label: 'Button', icon: <MousePointer size={18} />, description: 'Call-to-action button' },
  { type: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} />, description: 'Customer reviews' },
  { type: 'pricing', label: 'Pricing', icon: <DollarSign size={18} />, description: 'Pricing plans' },
  { type: 'contact', label: 'Contact', icon: <Mail size={18} />, description: 'Contact form' },
  { type: 'footer', label: 'Footer', icon: <PanelBottom size={18} />, description: 'Page footer' },
];

function DraggableItem({ item }: { item: ComponentItem }) {
  const { addComponent } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${item.type}`,
    data: { type: item.type, source: 'sidebar' },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? 'opacity-50 shadow-lg' : 'hover:shadow-sm'
      }`}
      onClick={() => addComponent(item.type)}
    >
      <div className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0">
        <GripVertical size={14} className="absolute opacity-0 group-hover:opacity-100" />
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{item.label}</div>
        <div className="text-xs text-gray-400 truncate">{item.description}</div>
      </div>
    </div>
  );
}

export function ComponentLibrary() {
  const { mode } = useBuilderStore();
  const visibleComponents = mode === 'beginner' ? components.slice(0, 6) : components;

  return (
    <div className="w-64 flex-shrink-0 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Components</h2>
        <p className="text-xs text-gray-400 mt-0.5">Click or drag to add</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {visibleComponents.map((item) => (
          <DraggableItem key={item.type} item={item} />
        ))}
        {mode === 'beginner' && (
          <p className="text-xs text-center text-gray-400 pt-2">
            Switch to Advanced mode for more blocks
          </p>
        )}
      </div>
    </div>
  );
}
