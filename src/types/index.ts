export interface Project {
  id: string
  title: string
  category: string
  year: number
  cover: string  // derived from first image in Images array
  slug: string
}

export interface ProjectDetail extends Project {
  client: string
  description: string
  images: string[]     // URLs de todas las imágenes
  tags: string[]
}

