<script setup lang="ts">
import { siteConfig } from '@/config/site'
import { ref, onMounted } from 'vue'
import { useTransitions } from '@/composables/useTransitions'
import { useSiteSettingsStore } from '@/stores/siteSettings'

const container = ref<HTMLElement | null>(null)
const { zoomIn } = useTransitions()
const siteSettings = useSiteSettingsStore()

const skills = [
  'Figma', 'Adobe Illustrator', 'Adobe InDesign', 'After Effects',
  'Photoshop', 'Vue 3', 'React', 'TypeScript',
  'HTML / CSS', 'GSAP', 'Git', 'Notion'
]

onMounted(async () => {
  await siteSettings.load()
  if (container.value) zoomIn(container.value, () => {})
})
</script>

<template>
  <div ref="container" class="min-h-screen bg-background pt-[54px]">

    <!-- Header -->
    <div class="px-7 py-12 border-b border-border">
      <div class="font-display font-semibold text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
        About
      </div>
      <h1 class="font-display font-semibold text-[30px] uppercase tracking-tight leading-none text-foreground">
        {{ siteConfig.name }}
      </h1>
    </div>

    <!-- Body -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 px-7 py-10">

      <!-- Left — Bio -->
      <div class="flex flex-col gap-8 order-last md:order-first">

        <!-- Bio text -->
        <div class="flex flex-col gap-5">
          <p
            v-for="(paragraph, i) in siteSettings.bioEN.split('\n').filter(Boolean)"
            :key="i"
            class="font-sans font-light text-[14px] text-foreground/70 leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>

        <!-- Skills -->
        <div>
          <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-4">
            Skills & Tools
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in skills" :key="skill"
              class="font-sans text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-border text-muted-foreground">
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- CV Download -->
        <div>
          <a
            :href="siteConfig.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-display font-semibold text-[11px] uppercase tracking-widest text-foreground border border-foreground/30 px-5 py-3 rounded-full hover:bg-foreground/5 transition-colors no-underline"
          >
            Download CV
            <span class="text-[10px]">↗</span>
          </a>
        </div>

      </div>

      <!-- Right — Photo placeholder -->
      <div class="flex flex-col gap-4 order-first md:order-last">

        <div class="w-full aspect-square bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center">
          <img
            v-if="siteSettings.avatar"
            :src="siteSettings.avatar"
            :alt="siteConfig.name"
            class="w-full h-full object-cover"
          />
          <span v-else class="font-sans text-[10px] text-muted-foreground tracking-wider uppercase">
            Photo
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <div class="font-display font-semibold text-[13px] text-foreground">{{ siteConfig.name }}</div>
          <div class="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
            {{ siteConfig.profession }}<br>{{ siteConfig.location }}
          </div>
        </div>
        
      </div>

    </div>
  </div>
</template>