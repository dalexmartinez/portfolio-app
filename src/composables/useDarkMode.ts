import { ref } from 'vue'

const isDark = ref(localStorage.getItem('darkMode') === 'true')

document.documentElement.classList.toggle('dark', isDark.value)

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('darkMode', String(isDark.value))
  }

  return {
    isDark,
    toggle
  }
}