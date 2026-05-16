import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'

export function useFilter() {
  const store = useProjectsStore()
  const { activeFilter } = storeToRefs(store)

  // Hardcoded for now — can be derived dynamically from Notion later
  const categories = ['All', 'Digital', 'Development', 'Branding', 'UX / UI', 'Editorial']

  function setFilter(category: string) {
    store.setFilter(category)
  }

  return {
    categories,
    activeFilter,
    setFilter
  }
}