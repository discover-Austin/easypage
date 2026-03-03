'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

interface FooterLink {
  label: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

export function FooterBlock({ component, isSelected }: BlockProps) {
  const { selectComponent } = useBuilderStore();
  const p = component.props;
  const links = p.links as FooterLink[];
  const socialLinks = p.socialLinks as SocialLink[];

  return (
    <div
      className={`w-full cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
      style={{ backgroundColor: p.backgroundColor as string, color: p.textColor as string }}
    >
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-2">{p.logo as string}</div>
            <p className="opacity-60 text-sm">{p.tagline as string}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase text-xs tracking-widest opacity-60">Links</h4>
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <a key={i} href={link.url} className="opacity-70 hover:opacity-100 transition-opacity text-sm" onClick={(e) => e.preventDefault()}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 uppercase text-xs tracking-widest opacity-60">Social</h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.url} className="opacity-70 hover:opacity-100 transition-opacity text-sm" onClick={(e) => e.preventDefault()}>
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-sm opacity-50">
          {p.copyright as string}
        </div>
      </div>
    </div>
  );
}
