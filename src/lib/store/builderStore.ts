import { create } from 'zustand';
import { BuilderState, BuilderComponent, ComponentType, Page, PreviewMode, BuilderMode, Theme } from '../types/builder';

const defaultTheme: Theme = {
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  fontFamily: 'Inter',
  borderRadius: '0.5rem',
};

const defaultProps: Record<ComponentType, Record<string, unknown>> = {
  hero: {
    title: 'Build Something Amazing',
    subtitle: 'The fastest way to create beautiful websites',
    buttonText: 'Get Started',
    buttonUrl: '#',
    backgroundColor: 'from-blue-600 to-purple-700',
    textColor: 'white',
  },
  features: {
    title: 'Why Choose Us',
    features: [
      { icon: '⚡', title: 'Fast', description: 'Lightning fast performance' },
      { icon: '🎨', title: 'Beautiful', description: 'Stunning designs out of the box' },
      { icon: '🔧', title: 'Customizable', description: 'Easily customizable to your brand' },
    ],
  },
  text: {
    content: 'Add your text content here. Click to edit.',
    fontSize: '16px',
    textAlign: 'left',
    color: '#374151',
  },
  image: {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop',
    alt: 'Beautiful image',
    caption: '',
    objectFit: 'cover',
  },
  button: {
    text: 'Click Me',
    url: '#',
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
  },
  navbar: {
    logo: 'MyBrand',
    links: [
      { label: 'Home', url: '#' },
      { label: 'About', url: '#about' },
      { label: 'Services', url: '#services' },
      { label: 'Contact', url: '#contact' },
    ],
    ctaText: 'Get Started',
    ctaUrl: '#',
    backgroundColor: '#ffffff',
    textColor: '#111827',
  },
  footer: {
    logo: 'MyBrand',
    tagline: 'Building the future, one page at a time.',
    links: [
      { label: 'Privacy Policy', url: '#' },
      { label: 'Terms of Service', url: '#' },
      { label: 'Contact', url: '#' },
    ],
    socialLinks: [
      { platform: 'Twitter', url: '#' },
      { platform: 'LinkedIn', url: '#' },
      { platform: 'GitHub', url: '#' },
    ],
    copyright: `© ${new Date().getFullYear()} MyBrand. All rights reserved.`,
    backgroundColor: '#111827',
    textColor: '#f9fafb',
  },
  testimonials: {
    title: 'What Our Customers Say',
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'CEO, TechCorp',
        content: 'This website builder completely transformed how we create our online presence. Absolutely love it!',
        avatar: 'SJ',
      },
      {
        name: 'Michael Chen',
        role: 'Designer, CreativeStudio',
        content: 'The drag and drop interface is incredibly intuitive. I built a full site in just an hour!',
        avatar: 'MC',
      },
      {
        name: 'Emily Rodriguez',
        role: 'Marketing Director',
        content: 'Professional results without any coding. This tool is a game-changer for our team.',
        avatar: 'ER',
      },
    ],
  },
  pricing: {
    title: 'Simple, Transparent Pricing',
    subtitle: 'Choose the plan that works best for you',
    plans: [
      {
        name: 'Starter',
        price: '$9',
        period: '/month',
        description: 'Perfect for individuals',
        features: ['5 Pages', '10GB Storage', 'Basic Analytics', 'Email Support'],
        cta: 'Get Started',
        highlighted: false,
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'Best for growing teams',
        features: ['Unlimited Pages', '100GB Storage', 'Advanced Analytics', 'Priority Support', 'Custom Domain'],
        cta: 'Start Free Trial',
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For large organizations',
        features: ['Everything in Pro', '1TB Storage', 'Dedicated Support', 'SLA Guarantee', 'Custom Integrations'],
        cta: 'Contact Sales',
        highlighted: false,
      },
    ],
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    email: 'hello@example.com',
    phone: '+1 (555) 000-0000',
    address: '123 Main Street, New York, NY 10001',
    showMap: false,
  },
};

const createPage = (): Page => ({
  id: crypto.randomUUID(),
  name: 'My Page',
  components: [],
});

const initialPage = createPage();

export const useBuilderStore = create<BuilderState>((set, get) => ({
  pages: [initialPage],
  currentPageId: initialPage.id,
  selectedComponentId: null,
  history: { past: [], future: [] },
  theme: defaultTheme,
  previewMode: 'desktop',
  mode: 'beginner',
  isOnboarding: true,
  isPreviewOpen: false,
  isThemePanelOpen: false,

  addComponent: (type: ComponentType) => {
    const { pages, currentPageId, history } = get();
    const newComponent: BuilderComponent = {
      id: crypto.randomUUID(),
      type,
      props: { ...defaultProps[type] },
      styles: {},
    };
    const updatedPages = pages.map((p) =>
      p.id === currentPageId || (!currentPageId && p === pages[0])
        ? { ...p, components: [...p.components, newComponent] }
        : p
    );
    set({
      pages: updatedPages,
      selectedComponentId: newComponent.id,
      history: { past: [...history.past, pages], future: [] },
    });
  },

  removeComponent: (id: string) => {
    const { pages, currentPageId, history } = get();
    const updatedPages = pages.map((p) =>
      p.id === currentPageId || (!currentPageId && p === pages[0])
        ? { ...p, components: p.components.filter((c) => c.id !== id) }
        : p
    );
    set({
      pages: updatedPages,
      selectedComponentId: null,
      history: { past: [...history.past, pages], future: [] },
    });
  },

  selectComponent: (id: string | null) => set({ selectedComponentId: id }),

  updateComponent: (id: string, updates: Partial<BuilderComponent>) => {
    const { pages, currentPageId, history } = get();
    const updatedPages = pages.map((p) =>
      p.id === currentPageId || (!currentPageId && p === pages[0])
        ? {
            ...p,
            components: p.components.map((c) =>
              c.id === id ? { ...c, ...updates, props: { ...c.props, ...(updates.props || {}) } } : c
            ),
          }
        : p
    );
    set({
      pages: updatedPages,
      history: { past: [...history.past, pages], future: [] },
    });
  },

  reorderComponents: (activeId: string, overId: string) => {
    const { pages, currentPageId, history } = get();
    const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
    const components = [...currentPage.components];
    const activeIndex = components.findIndex((c) => c.id === activeId);
    const overIndex = components.findIndex((c) => c.id === overId);
    if (activeIndex === -1 || overIndex === -1) return;
    const [removed] = components.splice(activeIndex, 1);
    components.splice(overIndex, 0, removed);
    const updatedPages = pages.map((p) =>
      p.id === currentPage.id ? { ...p, components } : p
    );
    set({
      pages: updatedPages,
      history: { past: [...history.past, pages], future: [] },
    });
  },

  setPreviewMode: (mode: PreviewMode) => set({ previewMode: mode }),
  setMode: (mode: BuilderMode) => set({ mode }),
  setTheme: (theme: Partial<Theme>) => set((s) => ({ theme: { ...s.theme, ...theme } })),

  undo: () => {
    const { history, pages } = get();
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    set({
      pages: previous,
      history: {
        past: history.past.slice(0, -1),
        future: [pages, ...history.future],
      },
      selectedComponentId: null,
    });
  },

  redo: () => {
    const { history, pages } = get();
    if (history.future.length === 0) return;
    const next = history.future[0];
    set({
      pages: next,
      history: {
        past: [...history.past, pages],
        future: history.future.slice(1),
      },
      selectedComponentId: null,
    });
  },

  dismissOnboarding: () => set({ isOnboarding: false }),
  setPreviewOpen: (open: boolean) => set({ isPreviewOpen: open }),
  setThemePanelOpen: (open: boolean) => set({ isThemePanelOpen: open }),

  newPage: () => {
    const page = createPage();
    set((s) => ({
      pages: [...s.pages, page],
      currentPageId: page.id,
      selectedComponentId: null,
    }));
  },

  setPageName: (name: string) => {
    const { pages, currentPageId } = get();
    set({
      pages: pages.map((p, i) =>
        p.id === currentPageId || (!currentPageId && i === 0) ? { ...p, name } : p
      ),
    });
  },
}));
