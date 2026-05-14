import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProjects, fetchProjectById } from '@/services/notion'
import type { Project, ProjectDetail } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  // State
  const projects = ref<Project[]>([])
  const activeFilter = ref('All')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const cache = ref<Record<string, ProjectDetail>>({})

  // Actions
  async function loadProjects() {
    isLoading.value = true
    error.value = null
    try {
      projects.value = await fetchProjects(activeFilter.value)
    } catch (e: any) {
      // Return empty array if filter option doesn't exist in Notion yet
      if (e?.code === 'validation_error') {
        projects.value = []
      } else {
        error.value = 'Failed to load projects'
      }
    } finally {
      isLoading.value = false
    }
  }

  async function loadProjectById(id: string) {
    // Skip if already cached
    if (cache.value[id]) return
    try {
      cache.value[id] = await fetchProjectById(id)
    } catch (e) {
      error.value = 'Failed to load project'
    }
  }

  async function loadProjectBySlug(slug: string) {
    // Find the real Notion ID from already loaded projects
    const found = projects.value.find(p => p.slug === slug)
    if (!found) return
    await loadProjectById(found.id)
  }

  function setFilter(category: string) {
    activeFilter.value = category
    loadProjects()
  }

  return {
    projects,
    activeFilter,
    isLoading,
    error,
    cache,
    loadProjects,
    loadProjectById,
    loadProjectBySlug,
    setFilter
  }
})