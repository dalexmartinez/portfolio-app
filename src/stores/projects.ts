import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProjects, fetchProjectById } from '@/services/notion'
import type { Project, ProjectDetail } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  // Estado
  const projects = ref<Project[]>([])
  const activeFilter = ref('All')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const cache = ref<Record<string, ProjectDetail>>({})

  // Acciones
  async function loadProjects() {
    isLoading.value = true
    error.value = null
    console.log('loadProjects ejecutando — filter:', activeFilter.value)
    try {
      projects.value = await fetchProjects(activeFilter.value)
      console.log('proyectos recibidos:', projects.value)
    } catch (e) {
      console.log('error:', e)
      error.value = 'Error al cargar proyectos'
    } finally {
      isLoading.value = false
    }
  }

  async function loadProjectById(id: string) {
    if (cache.value[id]) return
    try {
      cache.value[id] = await fetchProjectById(id)
    } catch (e) {
      error.value = 'Error al cargar el proyecto'
    }
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
    setFilter
  }
})