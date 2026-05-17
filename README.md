# dAlex Portfolio App v1.0

Visual portfolio consuming design projects from Notion as a headless CMS.

**Demo:** https://portfolio-app-rosy-sigma.vercel.app  
**Repo:** https://github.com/dalexmartinez/portfolio-app

## Stack

- Vue 3 + TypeScript + Vite
- shadcn-vue (dark / light mode)
- Tailwind CSS v3
- GSAP for transitions
- Pinia for state management
- Notion API as headless CMS
- EmailJS for contact form
- Vercel for deployment

## Features

- Masonry grid (3 col desktop, 2 tablet, 1 mobile)
- Category filter chips with horizontal scroll
- Project detail view with image gallery
- Fullscreen lightbox with keyboard navigation (← → Esc)
- Hamburger menu with animated X transition (mobile)
- Dark / light mode toggle
- Contact form via EmailJS
- Centralized site config (`src/config/site.ts`)
- Bio content config (`src/config/about.ts`)

## Design System

- Figma kit: shadcn/ui Design System with Variables & Theming
- URL: https://figma.com/community/file/1314057472629730742
- Typography: Syne (display) + DM Sans (body)

## Navigation levels

1. Grid → Project: zoom in (GSAP)
2. Project → Image: fullscreen lightbox
3. Back: zoom out to previous level

## Development

```bash
npm install
npm run dev
```

## Environment variables

```
VITE_NOTION_API_KEY=secret_xxx
VITE_NOTION_DATABASE_ID=xxx
VITE_API_BASE_URL=http://localhost:5173
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
```