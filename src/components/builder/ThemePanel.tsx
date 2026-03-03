'use client';
import React from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Modal } from '../ui/Modal';
import { COLOR_PALETTES, FONT_OPTIONS } from '@/lib/utils/themeUtils';
import { Check } from 'lucide-react';

export function ThemePanel() {
  const { isThemePanelOpen, setThemePanelOpen, theme, setTheme } = useBuilderStore();

  return (
    <Modal isOpen={isThemePanelOpen} onClose={() => setThemePanelOpen(false)} title="Theme Settings" width="max-w-md">
      <div className="space-y-6">
        {/* Color Palettes */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Color Palettes</h3>
          <div className="grid grid-cols-3 gap-2">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.name}
                onClick={() => setTheme({ primaryColor: palette.primary, secondaryColor: palette.secondary })}
                className={`p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                  theme.primaryColor === palette.primary ? 'border-blue-500 shadow-md' : 'border-transparent'
                }`}
              >
                <div className="flex gap-1 mb-2">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.primary }} />
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.secondary }} />
                  {theme.primaryColor === palette.primary && (
                    <div className="ml-auto">
                      <Check size={12} className="text-blue-500" />
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600 text-left font-medium">{palette.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Custom Colors</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-1"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ primaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme({ secondaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-1"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme({ secondaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Font Family */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Font Family</h3>
          <div className="grid grid-cols-2 gap-2">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font}
                onClick={() => setTheme({ fontFamily: font })}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  theme.fontFamily === font
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Border Radius</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'None', value: '0' },
              { label: 'Small', value: '0.25rem' },
              { label: 'Medium', value: '0.5rem' },
              { label: 'Large', value: '1rem' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme({ borderRadius: opt.value })}
                className={`px-2 py-2 text-xs rounded-lg border transition-all ${
                  theme.borderRadius === opt.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
          <div
            className="p-6 rounded-xl text-center"
            style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius, fontFamily: theme.fontFamily }}
          >
            <p className="text-white font-bold text-lg mb-2">Aa</p>
            <p className="text-white/80 text-sm">{theme.fontFamily}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
