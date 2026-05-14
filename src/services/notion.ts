import { Client } from '@notionhq/client'
import type { Project, ProjectDetail } from '@/types'

// In development use Vite proxy, in production use Vercel API Route
const isDev = import.meta.env.DEV

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
  baseUrl: isDev
    ? `${import.meta.env.VITE_API_BASE_URL}/notion-api`
    : `${import.meta.env.VITE_API_BASE_URL}/notion-api`
})

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID

export async function fetchProjects(category?: string): Promise<Project[]> {
  if (!isDev) {
    // Production — call Vercel API Route
    const params = new URLSearchParams({ action: 'projects' })
    if (category && category !== 'All') params.append('category', category)
    const res = await fetch(`/api/notion?${params}`)
    const data = await res.json()
    return data.map(transformPage)
  }

  // Development — use Notion SDK via Vite proxy
  const filter = category && category !== 'All'
    ? { property: 'Category', select: { equals: category } }
    : undefined

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter
  })

  console.log('Notion response:', JSON.stringify(response.results, null, 2))
  return response.results.map(transformPage)
}

export async function fetchProjectById(id: string): Promise<ProjectDetail> {
  if (!isDev) {
    // Production — call Vercel API Route
    const res = await fetch(`/api/notion?action=project&id=${id}`)
    const page = await res.json()
    return transformDetailPage(page)
  }

  // Development — use Notion SDK via Vite proxy
  const page = await notion.pages.retrieve({ page_id: id }) as any
  return transformDetailPage(page)
}

function transformPage(page: any): Project {
  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? '',
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? '',
    category: page.properties.Category?.select?.name ?? '',
    year: page.properties.Year?.number ?? 0,
    cover: page.properties.Images?.files[0]?.file?.url
        ?? page.properties.Images?.files[0]?.external?.url
        ?? ''
  }
}

function transformDetailPage(page: any): ProjectDetail {
  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? '',
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? '',
    category: page.properties.Category?.select?.name ?? '',
    year: page.properties.Year?.number ?? 0,
    cover: page.properties.Images?.files[0]?.file?.url
        ?? page.properties.Images?.files[0]?.external?.url
        ?? '',
    client: page.properties.Client?.rich_text[0]?.plain_text ?? '',
    description: page.properties.Description?.rich_text[0]?.plain_text ?? '',
    images: page.properties.Images?.files?.map(
      (f: any) => f?.file?.url ?? f?.external?.url ?? ''
    ).filter(Boolean) ?? [],
    tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? []
  }
}