<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-[54px] flex items-center justify-between px-7 border-b border-border bg-background/88 backdrop-blur-sm">

    <div class="font-display font-semibold text-[15px] tracking-tight text-foreground uppercase">
        dAlex Portfolio App
    </div>

    <nav class="flex items-center gap-7">
      <RouterLink
        to="/"
        class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        active-class="text-foreground"
      >Work</RouterLink>

      <span class="w-[3px] h-[3px] rounded-full bg-border"></span>

      <RouterLink
        to="/about"
        class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
      >About</RouterLink>

      <span class="w-[3px] h-[3px] rounded-full bg-border"></span>

      <RouterLink
        to="/contact"
        class="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
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

  </header>
</template>