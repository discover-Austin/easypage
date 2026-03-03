'use client';
import React from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { exportToZip } from '@/lib/utils/exportUtils';
import {
  Monitor, Tablet, Smartphone, Undo2, Redo2, Eye, Download,
  Plus, Palette, FileText
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';

export function Toolbar() {
  const {
    pages, currentPageId, previewMode, mode, history,
    setPreviewMode, setMode, undo, redo, theme,
    setPreviewOpen, setThemePanelOpen, newPage, setPageName,
  } = useBuilderStore();

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const componentCount = currentPage?.components.length || 0;

  const handleExport = async () => {
    await exportToZip(pages, theme, currentPageId || pages[0]?.id);
  };

  const [editingName, setEditingName] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(currentPage?.name || 'My Page');

  React.useEffect(() => {
    setNameValue(currentPage?.name || 'My Page');
  }, [currentPage?.name]);

  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-2 z-30 flex-shrink-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
          <FileText size={14} className="text-white" />
        </div>
        <span className="font-bold text-gray-800 text-sm">EasyPage</span>
      </div>

      <div className="h-5 w-px bg-gray-200 mx-1" />

      {/* Page name */}
      <div className="flex items-center gap-1.5">
        {editingName ? (
          <input
            autoFocus
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={() => { setPageName(nameValue); setEditingName(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { setPageName(nameValue); setEditingName(false); } }}
            className="px-2 py-0.5 text-sm border border-blue-500 rounded-md outline-none w-36"
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="px-2 py-0.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md truncate max-w-36"
          >
            {currentPage?.name}
          </button>
        )}
        <span className="text-xs text-gray-400">({componentCount} blocks)</span>
      </div>

      <div className="h-5 w-px bg-gray-200 mx-1" />

      {/* Undo/Redo */}
      <Tooltip content="Undo (Ctrl+Z / Cmd+Z)">
        <Button variant="ghost" size="sm" onClick={undo} disabled={history.past.length === 0} className="!px-2">
          <Undo2 size={14} />
        </Button>
      </Tooltip>
      <Tooltip content="Redo (Ctrl+Y / Cmd+Shift+Z)">
        <Button variant="ghost" size="sm" onClick={redo} disabled={history.future.length === 0} className="!px-2">
          <Redo2 size={14} />
        </Button>
      </Tooltip>

      <div className="h-5 w-px bg-gray-200 mx-1" />

      {/* Preview modes */}
      <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
        {([
          { mode: 'desktop' as const, icon: <Monitor size={13} /> },
          { mode: 'tablet' as const, icon: <Tablet size={13} /> },
          { mode: 'mobile' as const, icon: <Smartphone size={13} /> },
        ] as const).map(({ mode: m, icon }) => (
          <Tooltip key={m} content={m.charAt(0).toUpperCase() + m.slice(1)}>
            <button
              onClick={() => setPreviewMode(m)}
              className={`p-1.5 rounded transition-colors ${previewMode === m ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {icon}
            </button>
          </Tooltip>
        ))}
      </div>

      <div className="flex-1" />

      {/* Mode toggle */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
        {(['beginner', 'advanced'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-2.5 py-1 text-xs font-medium rounded capitalize transition-colors ${mode === m ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {m === 'beginner' ? '🎓 Beginner' : '⚙️ Advanced'}
          </button>
        ))}
      </div>

      <div className="h-5 w-px bg-gray-200 mx-1" />

      <Tooltip content="Theme Settings">
        <Button variant="ghost" size="sm" onClick={() => setThemePanelOpen(true)} className="!px-2">
          <Palette size={14} />
        </Button>
      </Tooltip>

      <Tooltip content="New Page">
        <Button variant="ghost" size="sm" onClick={newPage} className="!px-2">
          <Plus size={14} />
        </Button>
      </Tooltip>

      <Button variant="secondary" size="sm" onClick={() => setPreviewOpen(true)}>
        <Eye size={14} />
        Preview
      </Button>

      <Button variant="primary" size="sm" onClick={handleExport}>
        <Download size={14} />
        Export
      </Button>
    </div>
  );
}
