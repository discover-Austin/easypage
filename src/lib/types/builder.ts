export type ComponentType =
  | 'hero'
  | 'features'
  | 'text'
  | 'image'
  | 'button'
  | 'navbar'
  | 'footer'
  | 'testimonials'
  | 'pricing'
  | 'contact';

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  props: Record<string, unknown>;
  styles: Record<string, string>;
}

export interface Page {
  id: string;
  name: string;
  components: BuilderComponent[];
}

export type PreviewMode = 'desktop' | 'tablet' | 'mobile';
export type BuilderMode = 'beginner' | 'advanced';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

export interface BuilderState {
  pages: Page[];
  currentPageId: string;
  selectedComponentId: string | null;
  history: { past: Page[][]; future: Page[][] };
  theme: Theme;
  previewMode: PreviewMode;
  mode: BuilderMode;
  isOnboarding: boolean;
  isPreviewOpen: boolean;
  isThemePanelOpen: boolean;

  // Actions
  addComponent: (type: ComponentType) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  updateComponent: (id: string, props: Partial<BuilderComponent>) => void;
  reorderComponents: (activeId: string, overId: string) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setMode: (mode: BuilderMode) => void;
  setTheme: (theme: Partial<Theme>) => void;
  undo: () => void;
  redo: () => void;
  dismissOnboarding: () => void;
  setPreviewOpen: (open: boolean) => void;
  setThemePanelOpen: (open: boolean) => void;
  newPage: () => void;
  setPageName: (name: string) => void;
}
