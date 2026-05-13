<script setup lang="ts">
import { useProjects } from '@/composables/useProjects'
import { useFilter } from '@/composables/useFilter'
import ProjectCard from '@/components/ProjectCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import FilterChip from '@/components/FilterChip.vue'

const { projects, isLoading } = useProjects()
const { categories, activeFilter, setFilter } = useFilter()

const skeletonHeights = [180, 130, 210, 150, 220, 160, 140]
</script>

<template>
  <div class="min-h-screen bg-background pt-[54px]">

    <!-- Filter bar -->
    <div class="sticky top-[54px] z-40 flex items-center gap-2 px-7 py-3 border-b border-border bg-background/88 backdrop-blur-sm">
      <FilterChip
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :active="activeFilter === cat"
        @select="setFilter"
      />
      <span class="ml-auto font-sans text-[10px] text-muted-foreground tracking-wider">
        {{ projects.length }} projects
      </span>
    </div>

    <!-- Masonry grid -->
    <div class="px-7 py-5" style="columns: 3; column-gap: 12px;">

      <!-- Skeletons mientras carga -->
      <template v-if="isLoading">
        <SkeletonCard
          v-for="(h, i) in skeletonHeights"
          :key="i"
          :height="h"
          class="mb-3 break-inside-avoid"
        />
      </template>

      <!-- Cards reales -->
      <template v-else>
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          class="mb-3 break-inside-avoid"
        />
      </template>

    </div>
  </div>
</template>