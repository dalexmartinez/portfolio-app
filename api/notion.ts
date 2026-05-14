import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.VITE_NOTION_API_KEY
})

const DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from any origin
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { action, id, category } = req.query

  try {
    // Fetch all projects or filter by category
    if (action === 'projects') {
      const filter = category && category !== 'All'
        ? {
            property: 'Category',
            select: { equals: category as string }
          }
        : undefined

      const response = await notion.databases.query({
        database_id: DATABASE_ID!,
        filter
      })

      return res.status(200).json(response.results)
    }

    // Fetch single project by ID
    if (action === 'project' && id) {
      const page = await notion.pages.retrieve({
        page_id: id as string
      })

      return res.status(200).json(page)
    }

    return res.status(400).json({ error: 'Invalid action' })

  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}