'use client';
import React, { useEffect, useRef } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Modal } from '../ui/Modal';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

import { Page, Theme } from '@/lib/types/builder';

function generatePreviewHTML(pages: Page[], theme: Theme) {
  const page = pages[0];
  if (!page) return '<html><body><p>No page</p></body></html>';

  const components = page.components.map((c) => {
    const p = c.props;
    switch (c.type) {
      case 'navbar':
        return `<nav style="background:${p.backgroundColor};padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
<span style="font-weight:700;font-size:1.25rem;color:${p.textColor}">${p.logo}</span>
<div style="display:flex;gap:1.5rem;">${(p.links as Array<{label:string;url:string}>).map(l=>`<a href="${l.url}" style="color:${p.textColor};text-decoration:none;">${l.label}</a>`).join('')}</div>
<a href="${p.ctaUrl}" style="padding:0.5rem 1rem;background:#3b82f6;color:white;border-radius:0.5rem;text-decoration:none;font-weight:600;">${p.ctaText}</a>
</nav>`;
      case 'hero':
        return `<div style="background:linear-gradient(135deg,${theme.primaryColor},${theme.secondaryColor});padding:5rem 1.5rem;text-align:center;">
<h1 style="font-size:3rem;font-weight:800;color:white;margin-bottom:1rem;">${p.title}</h1>
<p style="font-size:1.25rem;color:rgba(255,255,255,0.9);margin-bottom:2rem;">${p.subtitle}</p>
<a href="${p.buttonUrl}" style="padding:1rem 2rem;background:white;color:${theme.primaryColor};border-radius:0.5rem;text-decoration:none;font-weight:700;font-size:1.1rem;">${p.buttonText}</a>
</div>`;
      case 'text':
        return `<div style="padding:2rem 3rem;font-size:${p.fontSize};color:${p.color};text-align:${p.textAlign};line-height:1.8;">${p.content}</div>`;
      case 'features':
        return `<div style="background:#f9fafb;padding:4rem 1.5rem;">
<h2 style="text-align:center;font-size:2rem;font-weight:800;margin-bottom:3rem;">${p.title}</h2>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;max-width:1000px;margin:0 auto;">
${(p.features as Array<{icon:string;title:string;description:string}>).map(f=>`<div style="background:white;padding:2rem;border-radius:0.75rem;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
<div style="font-size:2rem;margin-bottom:1rem;">${f.icon}</div>
<h3 style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">${f.title}</h3>
<p style="color:#6b7280;">${f.description}</p>
</div>`).join('')}
</div>
</div>`;
      case 'button':
        return `<div style="padding:2rem;text-align:center;"><a href="${p.url}" style="padding:0.875rem 2rem;background:${theme.primaryColor};color:white;border-radius:0.5rem;text-decoration:none;font-weight:700;">${p.text}</a></div>`;
      case 'image':
        return `<div style="padding:2rem;text-align:center;"><img src="${p.src}" alt="${p.alt}" style="max-width:100%;border-radius:0.75rem;"/>${p.caption ? `<p style="color:#6b7280;margin-top:0.5rem;">${p.caption}</p>` : ''}</div>`;
      case 'footer':
        return `<footer style="background:${p.backgroundColor};color:${p.textColor};padding:3rem 1.5rem;text-align:center;">
<div style="font-size:1.5rem;font-weight:700;margin-bottom:0.5rem;">${p.logo}</div>
<p style="opacity:0.6;margin-bottom:1rem;">${p.tagline}</p>
<p style="opacity:0.4;font-size:0.875rem;">${p.copyright}</p>
</footer>`;
      default:
        return `<div style="padding:2rem;background:#f9fafb;text-align:center;color:#6b7280;">[${c.type} component]</div>`;
    }
  }).join('\n');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'${theme.fontFamily}',sans-serif;}</style>
</head><body>${components}</body></html>`;
}

export function PreviewFrame() {
  const { isPreviewOpen, setPreviewOpen, pages, theme, previewMode, setPreviewMode } = useBuilderStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isPreviewOpen && iframeRef.current) {
      const html = generatePreviewHTML(pages, theme);
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [isPreviewOpen, pages, theme]);

  const widths = { desktop: 'w-full', tablet: 'w-[768px]', mobile: 'w-[375px]' };

  return (
    <Modal isOpen={isPreviewOpen} onClose={() => setPreviewOpen(false)} title="Preview" width="max-w-7xl">
      <div className="-mx-6 -mb-6">
        <div className="flex items-center justify-center gap-2 px-6 py-3 border-b bg-gray-50">
          {([
            { m: 'desktop' as const, icon: <Monitor size={14} />, label: 'Desktop' },
            { m: 'tablet' as const, icon: <Tablet size={14} />, label: 'Tablet' },
            { m: 'mobile' as const, icon: <Smartphone size={14} />, label: 'Mobile' },
          ]).map(({ m, icon, label }) => (
            <button
              key={m}
              onClick={() => setPreviewMode(m)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${previewMode === m ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        <div className="bg-gray-100 p-4 flex justify-center" style={{ minHeight: '70vh' }}>
          <div className={`${widths[previewMode]} bg-white shadow-lg transition-all duration-300 overflow-auto`}>
            <iframe
              ref={iframeRef}
              className="w-full border-0"
              style={{ height: '70vh' }}
              title="Website Preview"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
