<script setup lang="ts">
import { watch, nextTick, ref } from 'vue'
import { useProjects } from '@/composables/useProjects'
import { useFilter } from '@/composables/useFilter'
import { useTransitions } from '@/composables/useTransitions'
import ProjectCard from '@/components/ProjectCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import FilterChip from '@/components/FilterChip.vue'

const { projects, isLoading } = useProjects()
const { categories, activeFilter, setFilter } = useFilter()
const { fadeCards } = useTransitions()

const skeletonHeights = [180, 130, 210, 150, 220, 160, 140]

// Reference to card elements for GSAP
const cardRefs = ref<HTMLElement[]>([])

// Fade cards when projects update
watch(projects, async () => {
  cardRefs.value = [] // reset before repopulating
  await nextTick()
  if (cardRefs.value.length) {
    fadeCards(cardRefs.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-background pt-[54px]">

    <!-- Filter bar -->
    <div class="sticky top-[54px] z-40 flex items-center gap-2 px-7 py-3 border-b border-border bg-background backdrop-blur-sm overflow-x-auto scrollbar-none">
    <FilterChip
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :active="activeFilter === cat"
        @select="setFilter"
      />
      <span class="ml-auto font-sans text-[10px] text-muted-foreground tracking-wider shrink-0 whitespace-nowrap font-medium">
        {{ projects.length }} projects
      </span>
    </div>

    <!-- Masonry grid -->
    <div class="px-7 py-5" style="columns: 3; column-gap: 12px;">

      <!-- Skeletons while loading -->
      <template v-if="isLoading">
        <SkeletonCard
          v-for="(h, i) in skeletonHeights"
          :key="i"
          :height="h"
          class="mb-3 break-inside-avoid"
        />
      </template>

      <!-- Real cards -->
      <template v-else>
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          class="mb-3 break-inside-avoid"
          :ref="(el: any) => { if (el?.$el) cardRefs.push(el.$el) }"
        />
      </template>

    </div>

  </div>
</template>