# Portfolio App

Visual portfolio consuming design projects from Notion as a headless CMS.

## Stack

- Vue 3 + TypeScript + Vite
- shadcn-vue (dark / light mode)
- Tailwind CSS v3
- GSAP for transitions
- Notion API as backend
- Vercel for deployment

## Design System

- Figma kit: shadcn/ui Design System with Variables & Theming
- URL: https://figma.com/community/file/1314057472629730742
- Mode: Dark / Light via CSS Variables

## Typography

- Display: Syne 600 — titles and headings
- Body: DM Sans 300/400 — metadata and descriptions

## Layout

- Desktop: 3-column masonry grid
- Tablet: 2 columns
- Mobile: 1 column + horizontal carousel inside project

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
```