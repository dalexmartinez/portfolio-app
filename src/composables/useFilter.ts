import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'

export function useFilter() {
  const store = useProjectsStore()
  const { activeFilter } = storeToRefs(store)

  // Hardcoded for now — can be derived dynamically from Notion later
  const categories = ['All', 'Development', 'Digital', 'Branding', 'UX / UI', 'Design', 'Illustration', 'Editorial']

  function setFilter(category: string) {
    store.setFilter(category)
  }

  return {
    categories,
    activeFilter,
    setFilter
  }
}