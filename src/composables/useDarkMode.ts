import { ref, watch } from 'vue'

const isDark = ref(true)

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
  }

  watch(isDark, (dark) => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('darkMode', String(dark))
  }, { immediate: true })

  return {
    isDark,
    toggle
  }
}