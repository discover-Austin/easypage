'use client';
import React from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { BuilderComponent } from '@/lib/types/builder';
import { HeroBlock } from '../blocks/HeroBlock';
import { FeaturesBlock } from '../blocks/FeaturesBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ImageBlock } from '../blocks/ImageBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import { NavbarBlock } from '../blocks/NavbarBlock';
import { FooterBlock } from '../blocks/FooterBlock';
import { TestimonialsBlock } from '../blocks/TestimonialsBlock';
import { PricingBlock } from '../blocks/PricingBlock';
import { ContactFormBlock } from '../blocks/ContactFormBlock';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Trash2, GripVertical } from 'lucide-react';

function renderBlock(component: BuilderComponent, isSelected: boolean) {
  const props = { component, isSelected };
  switch (component.type) {
    case 'hero': return <HeroBlock {...props} />;
    case 'features': return <FeaturesBlock {...props} />;
    case 'text': return <TextBlock {...props} />;
    case 'image': return <ImageBlock {...props} />;
    case 'button': return <ButtonBlock {...props} />;
    case 'navbar': return <NavbarBlock {...props} />;
    case 'footer': return <FooterBlock {...props} />;
    case 'testimonials': return <TestimonialsBlock {...props} />;
    case 'pricing': return <PricingBlock {...props} />;
    case 'contact': return <ContactFormBlock {...props} />;
    default: return null;
  }
}

function SortableComponent({ component, isSelected }: { component: BuilderComponent; isSelected: boolean }) {
  const { removeComponent, selectComponent } = useBuilderStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected ? 'z-10' : ''}`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-blue-600 rounded-md shadow-lg overflow-hidden">
          <div
            {...attributes}
            {...listeners}
            className="p-1.5 text-white cursor-grab active:cursor-grabbing hover:bg-blue-700"
            title="Drag to reorder"
          >
            <GripVertical size={14} />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeComponent(component.id); selectComponent(null); }}
            className="p-1.5 text-white hover:bg-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
      {!isSelected && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 bg-gray-700/80 rounded p-1 cursor-grab active:cursor-grabbing transition-opacity"
        >
          <GripVertical size={12} className="text-white" />
        </div>
      )}
      {renderBlock(component, isSelected)}
    </div>
  );
}

export function BuilderCanvas() {
  const { pages, currentPageId, selectedComponentId, selectComponent, previewMode } = useBuilderStore();
  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const components = currentPage?.components || [];

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' });

  const canvasWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div
      className="flex-1 overflow-auto bg-gray-200 flex justify-center p-6"
      onClick={() => selectComponent(null)}
    >
      <div
        className={`${canvasWidths[previewMode]} min-h-full bg-white shadow-xl transition-all duration-300 relative rounded-sm overflow-hidden`}
        ref={setNodeRef}
      >
        {components.length === 0 ? (
          <div className={`flex items-center justify-center h-full min-h-[500px] ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-400' : 'border-2 border-dashed border-gray-300'} transition-colors`}>
            <div className="text-center text-gray-400 p-8">
              <div className="text-5xl mb-4">📦</div>
              <div className="text-lg font-medium text-gray-500">Empty canvas</div>
              <div className="text-sm">Drag a component here to get started</div>
            </div>
          </div>
        ) : (
          <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className={`relative ${isOver ? 'ring-2 ring-blue-400 ring-inset' : ''}`}>
              {components.map((component) => (
                <SortableComponent
                  key={component.id}
                  component={component}
                  isSelected={selectedComponentId === component.id}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
