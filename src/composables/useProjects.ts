import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'

export function useProjects() {
  const store = useProjectsStore()
  const { projects, isLoading, error } = storeToRefs(store)

  onMounted(() => {
    console.log('useProjects mounted — calling loadProjects')
    store.loadProjects()
  })

  return {
    projects,
    isLoading,
    error
  }
}