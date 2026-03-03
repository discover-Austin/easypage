export const FONT_OPTIONS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Raleway',
  'Playfair Display',
  'Merriweather',
  'Source Code Pro',
];

export const COLOR_PALETTES = [
  { name: 'Ocean Blue', primary: '#3b82f6', secondary: '#8b5cf6' },
  { name: 'Sunset', primary: '#f97316', secondary: '#ec4899' },
  { name: 'Forest', primary: '#10b981', secondary: '#0d9488' },
  { name: 'Rose', primary: '#f43f5e', secondary: '#d946ef' },
  { name: 'Slate', primary: '#475569', secondary: '#64748b' },
  { name: 'Amber', primary: '#f59e0b', secondary: '#d97706' },
];

export function getCSSVariables(theme: {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}) {
  return {
    '--primary-color': theme.primaryColor,
    '--secondary-color': theme.secondaryColor,
    '--font-family': theme.fontFamily,
    '--border-radius': theme.borderRadius,
  } as React.CSSProperties;
}
