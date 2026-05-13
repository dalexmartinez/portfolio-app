import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'

export function useFilter() {
  const store = useProjectsStore()
  const { activeFilter } = storeToRefs(store)

  const categories = ['All', 'Editorial', 'Digital', 'Branding', 'UX / UI']

  function setFilter(category: string) {
    store.setFilter(category)
  }

  return {
    categories,
    activeFilter,
    setFilter
  }
}