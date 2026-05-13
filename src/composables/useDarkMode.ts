import { ref, watch } from 'vue'

// Shared state — declared outside function so all components share the same instance
const isDark = ref(true)

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
  }

  // Apply .dark class to <html> and persist preference
  watch(isDark, (dark) => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('darkMode', String(dark))
  }, { immediate: true })

  return {
    isDark,
    toggle
  }
}