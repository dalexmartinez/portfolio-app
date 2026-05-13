import { Client } from '@notionhq/client'
import type { Project, ProjectDetail } from '@/types'

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
  baseUrl: 'http://localhost:5173/notion-api'
})

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID

export async function fetchProjects(category?: string): Promise<Project[]> {
  const filter = category && category !== 'All'
    ? {
        property: 'Category',
        select: { equals: category }
      }
    : undefined

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter
  })

  console.log('Notion response:', JSON.stringify(response.results, null, 2))
  return response.results.map(transformPage)
}

export async function fetchProjectById(id: string): Promise<ProjectDetail> {
  const page = await notion.pages.retrieve({ page_id: id }) as any

  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? '',
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? '',
    category: page.properties.Category?.select?.name ?? '',
    year: page.properties.Year?.number ?? 0,
    client: page.properties.Client?.rich_text[0]?.plain_text ?? '',
    description: page.properties.Description?.rich_text[0]?.plain_text ?? '',
    cover: page.properties.Cover?.url ?? '',
    images: page.properties.Images?.url ? [page.properties.Images.url] : [],
    tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? []
  }
}

function transformPage(page: any): Project {
  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? '',
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? '',
    category: page.properties.Category?.select?.name ?? '',
    year: page.properties.Year?.number ?? 0,
    cover: page.properties.Cover?.url ?? ''
  }
}