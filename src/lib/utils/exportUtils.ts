import JSZip from 'jszip';
import { Page, Theme } from '../types/builder';

export async function exportToZip(pages: Page[], theme: Theme, currentPageId?: string): Promise<void> {
  const zip = new JSZip();

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const html = generateHTML(currentPage, theme);
  zip.file('index.html', html);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.zip';
  a.click();
  URL.revokeObjectURL(url);
}

function generateHTML(page: Page, theme: Theme): string {
  const components = page.components.map((c) => renderComponentHTML(c, theme)).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(/ /g, '+')}:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: '${theme.fontFamily}', sans-serif; color: #111827; }
    :root {
      --primary: ${theme.primaryColor};
      --secondary: ${theme.secondaryColor};
      --radius: ${theme.borderRadius};
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: var(--radius); font-weight: 600; text-decoration: none; cursor: pointer; border: none; font-size: 1rem; }
    .btn-primary { background: var(--primary); color: white; }
    .btn-secondary { background: var(--secondary); color: white; }
    .btn-outline { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
    section { padding: 4rem 0; }
  </style>
</head>
<body>
${components}
</body>
</html>`;
}

function renderComponentHTML(component: { type: string; props: Record<string, unknown> }, theme: Theme): string {
  const p = component.props;

  switch (component.type) {
    case 'navbar': {
      const links = (p.links as Array<{ label: string; url: string }> || [])
        .map((l) => `<a href="${l.url}" style="color:${p.textColor};text-decoration:none;font-weight:500;">${l.label}</a>`)
        .join(' ');
      return `<nav style="background:${p.backgroundColor};padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
  <div style="font-weight:700;font-size:1.25rem;color:${p.textColor}">${p.logo}</div>
  <div style="display:flex;gap:1.5rem;">${links}</div>
  <a href="${p.ctaUrl}" class="btn btn-primary">${p.ctaText}</a>
</nav>`;
    }

    case 'hero': {
      const bg = (p.backgroundColor as string || '').includes('from-')
        ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
        : (p.backgroundColor as string);
      return `<section style="background:${bg};padding:6rem 1.5rem;text-align:center;">
  <div class="container">
    <h1 style="font-size:3rem;font-weight:800;color:${p.textColor};margin-bottom:1rem;">${p.title}</h1>
    <p style="font-size:1.25rem;color:${p.textColor};opacity:0.9;margin-bottom:2rem;">${p.subtitle}</p>
    <a href="${p.buttonUrl}" class="btn btn-primary" style="font-size:1.1rem;padding:1rem 2rem;">${p.buttonText}</a>
  </div>
</section>`;
    }

    case 'features': {
      const featureItems = (p.features as Array<{ icon: string; title: string; description: string }> || [])
        .map((f) => `<div style="text-align:center;padding:2rem;background:white;border-radius:var(--radius);box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="font-size:2.5rem;margin-bottom:1rem;">${f.icon}</div>
    <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">${f.title}</h3>
    <p style="color:#6b7280;">${f.description}</p>
  </div>`)
        .join('\n  ');
      return `<section style="background:#f9fafb;padding:5rem 1.5rem;">
  <div class="container">
    <h2 style="text-align:center;font-size:2rem;font-weight:800;margin-bottom:3rem;">${p.title}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;">
      ${featureItems}
    </div>
  </div>
</section>`;
    }

    case 'text':
      return `<section style="padding:3rem 1.5rem;">
  <div class="container" style="font-size:${p.fontSize};color:${p.color};text-align:${p.textAlign};">
    <p>${p.content}</p>
  </div>
</section>`;

    case 'image':
      return `<section style="padding:2rem 1.5rem;">
  <div class="container" style="text-align:center;">
    <img src="${p.src}" alt="${p.alt}" style="max-width:100%;border-radius:var(--radius);" />
    ${p.caption ? `<p style="margin-top:1rem;color:#6b7280;font-style:italic;">${p.caption}</p>` : ''}
  </div>
</section>`;

    case 'button': {
      const variantClass = p.variant === 'outline' ? 'btn-outline' : p.variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
      return `<section style="padding:2rem 1.5rem;text-align:center;">
  <a href="${p.url}" class="btn ${variantClass}">${p.text}</a>
</section>`;
    }

    case 'testimonials': {
      const items = (p.testimonials as Array<{ name: string; role: string; content: string; avatar: string }> || [])
        .map((t) => `<div style="background:white;padding:2rem;border-radius:var(--radius);box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <p style="color:#374151;font-style:italic;margin-bottom:1.5rem;">"${t.content}"</p>
    <div style="display:flex;align-items:center;gap:0.75rem;">
      <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;">${t.avatar}</div>
      <div><div style="font-weight:700;">${t.name}</div><div style="color:#6b7280;font-size:0.875rem;">${t.role}</div></div>
    </div>
  </div>`)
        .join('\n  ');
      return `<section style="background:#f9fafb;padding:5rem 1.5rem;">
  <div class="container">
    <h2 style="text-align:center;font-size:2rem;font-weight:800;margin-bottom:3rem;">${p.title}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;">
      ${items}
    </div>
  </div>
</section>`;
    }

    case 'pricing': {
      const plans = (p.plans as Array<{ name: string; price: string; period: string; description: string; features: string[]; cta: string; highlighted: boolean }> || [])
        .map((plan) => {
          const features = plan.features.map((f) => `<li style="padding:0.375rem 0;display:flex;gap:0.5rem;">✓ ${f}</li>`).join('');
          const bg = plan.highlighted ? `var(--primary)` : 'white';
          const color = plan.highlighted ? 'white' : '#111827';
          return `<div style="background:${bg};color:${color};padding:2.5rem;border-radius:var(--radius);box-shadow:0 8px 25px rgba(0,0,0,0.1);${plan.highlighted ? 'transform:scale(1.05);' : ''}">
    <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">${plan.name}</h3>
    <p style="opacity:0.7;margin-bottom:1rem;">${plan.description}</p>
    <div style="font-size:2.5rem;font-weight:800;margin-bottom:1.5rem;">${plan.price}<span style="font-size:1rem;opacity:0.7;">${plan.period}</span></div>
    <ul style="list-style:none;margin-bottom:2rem;">${features}</ul>
    <a href="#" class="btn" style="display:block;text-align:center;background:${plan.highlighted ? 'white' : 'var(--primary)'};color:${plan.highlighted ? 'var(--primary)' : 'white'};">${plan.cta}</a>
  </div>`;
        })
        .join('\n  ');
      return `<section style="padding:5rem 1.5rem;">
  <div class="container">
    <h2 style="text-align:center;font-size:2rem;font-weight:800;margin-bottom:1rem;">${p.title}</h2>
    <p style="text-align:center;color:#6b7280;margin-bottom:3rem;">${p.subtitle}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;align-items:center;">
      ${plans}
    </div>
  </div>
</section>`;
    }

    case 'contact':
      return `<section style="background:#f9fafb;padding:5rem 1.5rem;">
  <div class="container" style="max-width:600px;">
    <h2 style="text-align:center;font-size:2rem;font-weight:800;margin-bottom:1rem;">${p.title}</h2>
    <p style="text-align:center;color:#6b7280;margin-bottom:2rem;">${p.subtitle}</p>
    <form style="display:flex;flex-direction:column;gap:1rem;">
      <input type="text" placeholder="Your Name" style="padding:0.75rem;border:1px solid #d1d5db;border-radius:var(--radius);font-size:1rem;" />
      <input type="email" placeholder="Your Email" style="padding:0.75rem;border:1px solid #d1d5db;border-radius:var(--radius);font-size:1rem;" />
      <textarea placeholder="Your Message" rows="5" style="padding:0.75rem;border:1px solid #d1d5db;border-radius:var(--radius);font-size:1rem;resize:vertical;"></textarea>
      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
  </div>
</section>`;

    case 'footer': {
      const links = (p.links as Array<{ label: string; url: string }> || [])
        .map((l) => `<a href="${l.url}" style="color:${p.textColor};opacity:0.7;text-decoration:none;">${l.label}</a>`)
        .join(' · ');
      return `<footer style="background:${p.backgroundColor};color:${p.textColor};padding:3rem 1.5rem;">
  <div class="container" style="text-align:center;">
    <div style="font-size:1.5rem;font-weight:700;margin-bottom:0.5rem;">${p.logo}</div>
    <p style="opacity:0.7;margin-bottom:1.5rem;">${p.tagline}</p>
    <div style="display:flex;justify-content:center;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap;">${links}</div>
    <p style="opacity:0.5;font-size:0.875rem;">${p.copyright}</p>
  </div>
</footer>`;
    }

    default:
      return '';
  }
}
