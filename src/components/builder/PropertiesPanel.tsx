'use client';
import React from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { BuilderComponent } from '@/lib/types/builder';

function StringField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono"
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: {value: string; label: string}[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
      />
    </div>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform transition-transform ${value ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

function HeroProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Title" value={p.title as string} onChange={update('title')} />
      <TextAreaField label="Subtitle" value={p.subtitle as string} onChange={update('subtitle')} />
      <StringField label="Button Text" value={p.buttonText as string} onChange={update('buttonText')} />
      <StringField label="Button URL" value={p.buttonUrl as string} onChange={update('buttonUrl')} />
    </div>
  );
}

function TextProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <TextAreaField label="Content" value={p.content as string} onChange={update('content')} rows={5} />
      <ColorField label="Text Color" value={p.color as string} onChange={update('color')} />
      <SelectField
        label="Text Align"
        value={p.textAlign as string}
        options={[{value:'left',label:'Left'},{value:'center',label:'Center'},{value:'right',label:'Right'},{value:'justify',label:'Justify'}]}
        onChange={update('textAlign')}
      />
      <SelectField
        label="Font Size"
        value={p.fontSize as string}
        options={[{value:'14px',label:'Small'},{value:'16px',label:'Normal'},{value:'18px',label:'Large'},{value:'24px',label:'X-Large'},{value:'32px',label:'Heading'}]}
        onChange={update('fontSize')}
      />
    </div>
  );
}

function ImageProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Image URL" value={p.src as string} onChange={update('src')} />
      <StringField label="Alt Text" value={p.alt as string} onChange={update('alt')} />
      <StringField label="Caption" value={(p.caption as string) || ''} onChange={update('caption')} />
      <SelectField
        label="Object Fit"
        value={p.objectFit as string}
        options={[{value:'cover',label:'Cover'},{value:'contain',label:'Contain'},{value:'fill',label:'Fill'},{value:'none',label:'None'}]}
        onChange={update('objectFit')}
      />
    </div>
  );
}

function ButtonProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });
  const updateBool = (key: string) => (v: boolean) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Button Text" value={p.text as string} onChange={update('text')} />
      <StringField label="URL" value={p.url as string} onChange={update('url')} />
      <SelectField
        label="Variant"
        value={p.variant as string}
        options={[{value:'primary',label:'Primary'},{value:'secondary',label:'Secondary'},{value:'outline',label:'Outline'},{value:'ghost',label:'Ghost'}]}
        onChange={update('variant')}
      />
      <SelectField
        label="Size"
        value={p.size as string}
        options={[{value:'small',label:'Small'},{value:'medium',label:'Medium'},{value:'large',label:'Large'}]}
        onChange={update('size')}
      />
      <ToggleField label="Full Width" value={p.fullWidth as boolean} onChange={updateBool('fullWidth')} />
    </div>
  );
}

function NavbarProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Logo Text" value={p.logo as string} onChange={update('logo')} />
      <StringField label="CTA Button Text" value={p.ctaText as string} onChange={update('ctaText')} />
      <StringField label="CTA URL" value={p.ctaUrl as string} onChange={update('ctaUrl')} />
      <ColorField label="Background Color" value={p.backgroundColor as string} onChange={update('backgroundColor')} />
      <ColorField label="Text Color" value={p.textColor as string} onChange={update('textColor')} />
    </div>
  );
}

function FooterProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Logo Text" value={p.logo as string} onChange={update('logo')} />
      <TextAreaField label="Tagline" value={p.tagline as string} onChange={update('tagline')} />
      <StringField label="Copyright" value={p.copyright as string} onChange={update('copyright')} />
      <ColorField label="Background Color" value={p.backgroundColor as string} onChange={update('backgroundColor')} />
      <ColorField label="Text Color" value={p.textColor as string} onChange={update('textColor')} />
    </div>
  );
}

function FeaturesProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Section Title" value={p.title as string} onChange={update('title')} />
      <div className="text-xs text-gray-400 bg-gray-50 rounded-md p-2">
        Feature items can be edited directly in advanced mode via JSON.
      </div>
    </div>
  );
}

function ContactProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Title" value={p.title as string} onChange={update('title')} />
      <TextAreaField label="Subtitle" value={p.subtitle as string} onChange={update('subtitle')} />
      <StringField label="Email" value={p.email as string} onChange={update('email')} />
      <StringField label="Phone" value={p.phone as string} onChange={update('phone')} />
      <StringField label="Address" value={p.address as string} onChange={update('address')} />
    </div>
  );
}

function TestimonialsProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Section Title" value={p.title as string} onChange={update('title')} />
      <div className="text-xs text-gray-400 bg-gray-50 rounded-md p-2">
        Testimonial items can be edited in the JSON editor (advanced mode).
      </div>
    </div>
  );
}

function PricingProperties({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const p = component.props;
  const update = (key: string) => (v: string) => updateComponent(component.id, { props: { ...p, [key]: v } });

  return (
    <div className="space-y-3">
      <StringField label="Section Title" value={p.title as string} onChange={update('title')} />
      <TextAreaField label="Subtitle" value={p.subtitle as string} onChange={update('subtitle')} />
      <div className="text-xs text-gray-400 bg-gray-50 rounded-md p-2">
        Pricing plans can be edited in the JSON editor (advanced mode).
      </div>
    </div>
  );
}

function JSONEditor({ component }: { component: BuilderComponent }) {
  const { updateComponent } = useBuilderStore();
  const [json, setJson] = React.useState(JSON.stringify(component.props, null, 2));
  const [error, setError] = React.useState('');

  const handleApply = () => {
    try {
      const parsed = JSON.parse(json);
      updateComponent(component.id, { props: parsed });
      setError('');
    } catch {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-500">Props (JSON)</label>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        rows={12}
        className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-green-400 font-mono resize-none"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        onClick={handleApply}
        className="w-full py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Apply Changes
      </button>
    </div>
  );
}

export function PropertiesPanel() {
  const { pages, currentPageId, selectedComponentId, mode } = useBuilderStore();
  const [activeTab, setActiveTab] = React.useState<'props' | 'json'>('props');

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const component = currentPage?.components.find((c) => c.id === selectedComponentId);

  if (!component) {
    return (
      <div className="w-64 flex-shrink-0 h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="text-gray-400">
            <div className="text-3xl mb-3">👆</div>
            <p className="text-sm font-medium text-gray-500">No component selected</p>
            <p className="text-xs mt-1">Click a component on the canvas to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  const typeLabel = component.type.charAt(0).toUpperCase() + component.type.slice(1);

  return (
    <div className="w-64 flex-shrink-0 h-full bg-white border-l border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties</h2>
        <p className="text-sm font-medium text-gray-800 mt-0.5">{typeLabel} Block</p>
      </div>

      {mode === 'advanced' && (
        <div className="flex border-b border-gray-200">
          {(['props', 'json'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-medium capitalize transition-colors ${
                activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'json' ? 'JSON' : 'Properties'}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {(mode === 'beginner' || activeTab === 'props') && (
          <>
            {component.type === 'hero' && <HeroProperties component={component} />}
            {component.type === 'text' && <TextProperties component={component} />}
            {component.type === 'image' && <ImageProperties component={component} />}
            {component.type === 'button' && <ButtonProperties component={component} />}
            {component.type === 'navbar' && <NavbarProperties component={component} />}
            {component.type === 'footer' && <FooterProperties component={component} />}
            {component.type === 'features' && <FeaturesProperties component={component} />}
            {component.type === 'contact' && <ContactProperties component={component} />}
            {component.type === 'testimonials' && <TestimonialsProperties component={component} />}
            {component.type === 'pricing' && <PricingProperties component={component} />}
          </>
        )}
        {mode === 'advanced' && activeTab === 'json' && <JSONEditor component={component} />}
      </div>
    </div>
  );
}
