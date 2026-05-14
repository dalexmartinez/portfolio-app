<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'
import { useTransitions } from '@/composables/useTransitions'


const route = useRoute()
const router = useRouter()
const store = useProjectsStore()
const { cache } = storeToRefs(store)
const { zoomIn, zoomOut } = useTransitions()

const slug = computed(() => route.params.id as string)
const project = computed(() => {
  const found = store.projects.find(p => p.slug === slug.value)
  return found ? cache.value[found.id] : null
})

// Reference to the main container for GSAP
const container = ref<HTMLElement | null>(null)

onMounted(async () => {
  await store.loadProjectBySlug(slug.value)
  // Wait for Vue to render the data before animating
  await nextTick()
  if (container.value) {
    zoomIn(container.value, () => {})
  }
})

function goBack() {
  if (container.value) {
    zoomOut(container.value, () => router.push('/'))
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen bg-background pt-[54px]" ref="container">

    <!-- Loading -->
    <div v-if="!project" class="flex items-center justify-center h-[80vh]">
      <span class="font-sans text-[11px] uppercase tracking-widest text-muted-foreground animate-pulse">
        Loading...
      </span>
    </div>

    <!-- Content -->
    <template v-else>

      <!-- Sub-header -->
      <div class="sticky top-[54px] z-40 flex items-center justify-between px-7 h-[46px] border-b border-border bg-background/88 backdrop-blur-sm">
        <button
          @click="goBack"
          class="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          ← Back
        </button>
        <span class="font-display font-bold text-[13px] tracking-tight text-foreground">
          {{ project.title }}
        </span>
        <span class="font-sans text-[10px] text-muted-foreground tracking-wider w-[60px] text-right">
          {{ project.year }}
        </span>
      </div>

      <!-- Body -->
      <div class="grid grid-cols-[1fr_220px] gap-7 px-7 py-7">

        <!-- Images -->
        <div class="flex flex-col gap-3">
          <div class="font-display font-semibold text-[13px] tracking-tight text-foreground mb-[3px] uppercase">
            {{ project.title }}
          </div>
          <!-- Main image -->
          <div class="w-full h-[280px] bg-muted rounded-lg border border-border flex items-center justify-center cursor-pointer hover:border-foreground/20 transition-colors">
            <span class="font-sans text-[10px] text-muted-foreground tracking-wider">
              {{ project.images.length ? '' : 'no images' }}
            </span>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-2" v-if="project.images.length > 1">
            <div
              v-for="(img, i) in project.images"
              :key="i"
              class="flex-1 h-[64px] bg-muted rounded-md border border-border cursor-pointer hover:border-foreground/20 transition-colors"
            ></div>
          </div>
        </div>

        <!-- Sidebar info -->
        <div class="flex flex-col gap-0 pt-[52px]">
          <div>
            <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-1">Client</div>
            <div class="font-display font-medium text-[13px] text-foreground/70">{{ project.client }}</div>
          </div>
          <div class="h-px bg-border my-3"></div>
          <div>
            <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-1">Year</div>
            <div class="font-display font-medium text-[13px] text-foreground/70">{{ project.year }}</div>
          </div>
          <div class="h-px bg-border my-3"></div>
          <div>
            <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-1">Category</div>
            <div class="font-display font-medium text-[13px] text-foreground/70">{{ project.category }}</div>
          </div>
          <div class="h-px bg-border my-3"></div>
          <div>
            <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-1">About</div>
            <div class="font-sans text-[12px] font-light text-muted-foreground leading-relaxed">{{ project.description }}</div>
          </div>
          <div class="h-px bg-border my-3"></div>
          <div>
            <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-2">Tags</div>
            <div class="flex gap-1 flex-wrap">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="font-sans text-[9px] uppercase tracking-wider px-2 py-1 rounded-full border border-border text-muted-foreground"
              >{{ tag }}</span>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>