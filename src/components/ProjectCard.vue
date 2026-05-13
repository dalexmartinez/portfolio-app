<script setup lang="ts">
import type { Project } from '@/types'
import { useProjectsStore } from '@/stores/projects'

const props = defineProps<{
  project: Project
}>()

const store = useProjectsStore()

function handleMouseEnter() {
  store.loadProjectById(props.project.id)
}
</script>

<template>
  <RouterLink
    :to="`/project/${project.slug}`"
    class="block rounded-lg border border-border overflow-hidden cursor-pointer transition-colors hover:border-foreground/20 no-underline"
    @mouseenter="handleMouseEnter"
  >
    <!-- Imagen de portada -->
    <div class="w-full bg-muted flex items-center justify-center">
      <img
        v-if="project.cover"
        :src="project.cover"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
      <span v-else class="font-sans text-[10px] text-muted-foreground tracking-wider">
        sin imagen
      </span>
    </div>

    <!-- Metadata -->
    <div class="px-3 py-2 border-t border-border bg-background">
      <div class="font-display font-bold text-[13px] tracking-tight text-foreground mb-[3px]">
        {{ project.title }}
      </div>
      <div class="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
        {{ project.category }} · {{ project.year }}
      </div>
    </div>
  </RouterLink>
</template>