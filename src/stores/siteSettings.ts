import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchSiteSettings } from '@/services/notion'

export const useSiteSettingsStore = defineStore('siteSettings', () => {
  const avatar = ref('')
  const bioEN = ref('')
  const bioES = ref('')
  const isLoading = ref(false)

  async function load() {
    if (avatar.value) return // already loaded
    isLoading.value = true
    try {
      const data = await fetchSiteSettings()
      avatar.value = data.avatar
      bioEN.value = data.bioEN
      bioES.value = data.bioES
    } finally {
      isLoading.value = false
    }
  }

  return { avatar, bioEN, bioES, isLoading, load }
})