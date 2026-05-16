<script setup lang="ts">
import { siteConfig } from '@/config/site'
import { ref } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-[54px] flex items-center justify-between px-7 border-b border-border bg-background backdrop-blur-sm">

    <div class="font-display font-semibold text-[15px] tracking-tight text-foreground uppercase">
      {{ siteConfig.appName }}
    </div>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-7">
      <RouterLink
        to="/"
        class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        active-class="text-foreground"
      >Work</RouterLink>

      <span class="w-[3px] h-[3px] rounded-full bg-border"></span>

      <RouterLink
        to="/about"
        class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        active-class="text-foreground"
      >About</RouterLink>

      <span class="w-[3px] h-[3px] rounded-full bg-border"></span>

      <RouterLink
        to="/contact"
        class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        active-class="text-foreground"
      >Contact</RouterLink>

      <!-- Switch dark/light -->
      <button
        @click="toggle"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
      >
        <span class="relative block w-8 h-[18px] rounded-full bg-muted">
          <span
            class="absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-foreground transition-transform duration-250"
            :class="{ 'translate-x-[14px]': !isDark }"
          ></span>
        </span>
        <span class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
          {{ isDark ? 'Dark' : 'Light' }}
        </span>
      </button>
    </nav>

    <!-- Mobile right — switch + hamburger -->
    <div class="flex md:hidden items-center gap-4">
      <button
        @click="toggle"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
      >
        <span class="relative block w-7 h-[16px] rounded-full bg-muted">
          <span
            class="absolute top-[2px] left-[2px] w-[12px] h-[12px] rounded-full bg-foreground transition-transform duration-250"
            :class="{ 'translate-x-[11px]': !isDark }"
          ></span>
        </span>
      </button>

      <!-- Hamburger -->
      <button
        @click="toggleMenu"
        class="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      >
        
        <span class="block w-[20px] h-[1.5px] bg-foreground transition-all duration-250"
          :class="{ 'translate-y-[6px] rotate-45': menuOpen }"
        ></span>
        <span class="block w-[20px] h-[1.5px] bg-foreground transition-all duration-250"
          :class="{ 'opacity-0': menuOpen }"
        ></span>
        <span class="block w-[20px] h-[1.5px] bg-foreground transition-all duration-250"
          :class="{ '-translate-y-[6px] -rotate-45': menuOpen }"
        ></span>

      </button>
    </div>

  </header>

  <!-- Mobile drawer -->
  <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="menuOpen"
          class="fixed inset-0 z-40 bg-background pt-[54px] flex flex-col"
        >
          <nav class="flex flex-col px-7 py-8 gap-1">
            <RouterLink
              to="/"
              @click="closeMenu"
              class="font-display font-semibold text-[28px] uppercase tracking-tight text-muted-foreground hover:text-foreground transition-colors no-underline py-3 border-b border-border"
              active-class="text-foreground"
            >Work</RouterLink>
            <RouterLink
              to="/about"
              @click="closeMenu"
              class="font-display font-semibold text-[28px] uppercase tracking-tight text-muted-foreground hover:text-foreground transition-colors no-underline py-3 border-b border-border"
              active-class="text-foreground"
            >About</RouterLink>
            <RouterLink
              to="/contact"
              @click="closeMenu"
              class="font-display font-semibold text-[28px] uppercase tracking-tight text-muted-foreground hover:text-foreground transition-colors no-underline py-3"
              active-class="text-foreground"
            >Contact</RouterLink>
          </nav>
        </div>
      </Transition>
  </Teleport>
</template>