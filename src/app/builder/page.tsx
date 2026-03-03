'use client';
import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { useBuilderStore } from '@/lib/store/builderStore';
import { ComponentLibrary } from '@/components/builder/ComponentLibrary';
import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { Toolbar } from '@/components/builder/Toolbar';
import { PreviewFrame } from '@/components/builder/PreviewFrame';
import { OnboardingWizard } from '@/components/builder/OnboardingWizard';
import { ThemePanel } from '@/components/builder/ThemePanel';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ComponentType } from '@/lib/types/builder';
import { Layout } from 'lucide-react';

function BuilderContent() {
  useKeyboardShortcuts();
  const { addComponent, reorderComponents } = useBuilderStore();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeData = active.data.current;

    // Dragging from sidebar
    if (activeData?.source === 'sidebar') {
      addComponent(activeData.type as ComponentType);
      return;
    }

    // Reordering on canvas
    if (active.id !== over.id) {
      reorderComponents(String(active.id), String(over.id));
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Allow drop over canvas zone
    const { over } = event;
    if (over?.id === 'canvas-drop-zone') {
      // Will be handled in dragEnd
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex-1 flex overflow-hidden">
        <ComponentLibrary />
        <BuilderCanvas />
        <PropertiesPanel />
      </div>
      <DragOverlay>
        {activeId && activeId.startsWith('sidebar-') && (
          <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 opacity-90">
            <Layout size={14} />
            Adding block...
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default function BuilderPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      <Toolbar />
      <BuilderContent />
      <PreviewFrame />
      <OnboardingWizard />
      <ThemePanel />
    </div>
  );
}
