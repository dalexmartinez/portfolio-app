export interface Project {
  id: string
  title: string
  category: string
  year: number
  cover: string        // URL de la imagen de portada
  slug: string         // para la URL: /project/magazine-campaign
}

export interface ProjectDetail extends Project {
  client: string
  description: string
  images: string[]     // URLs de todas las imágenes
  tags: string[]
}