'use client';
import React from 'react';
import { BuilderComponent } from '@/lib/types/builder';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Mail, Phone, MapPin } from 'lucide-react';

interface BlockProps {
  component: BuilderComponent;
  isSelected: boolean;
}

export function ContactFormBlock({ component, isSelected }: BlockProps) {
  const { selectComponent } = useBuilderStore();
  const p = component.props;

  return (
    <div
      className={`w-full bg-gray-50 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-3">{p.title as string}</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">{p.subtitle as string}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</div>
                  <div className="text-gray-900">{p.email as string}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Phone</div>
                  <div className="text-gray-900">{p.phone as string}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Address</div>
                  <div className="text-gray-900">{p.address as string}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
