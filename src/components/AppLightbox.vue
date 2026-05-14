<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTransitions } from '@/composables/useTransitions'

const props = defineProps<{
  images: string[]
  modelValue: boolean // controls open/close
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { lightboxIn, lightboxOut } = useTransitions()

const currentIndex = ref(0)
const container = ref<HTMLElement | null>(null)

// Animate in when opened
watch(() => props.modelValue, async (val) => {
  if (val && container.value) {
    lightboxIn(container.value)
  }
})

function close() {
  if (container.value) {
    lightboxOut(container.value, () => {
      emit('update:modelValue', false)
    })
  } else {
    emit('update:modelValue', false)
  }
}

function prev() {
  currentIndex.value = currentIndex.value > 0
    ? currentIndex.value - 1
    : props.images.length - 1
}

function next() {
  currentIndex.value = currentIndex.value < props.images.length - 1
    ? currentIndex.value + 1
    : 0
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      ref="container"
      class="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center gap-4"
      @keydown.esc="close"
      tabindex="0"
    >
      <!-- Close button -->
      <button
        @click="close"
        class="absolute top-4 right-5 bg-transparent border-none text-white/40 hover:text-white/80 text-xl cursor-pointer transition-colors"
      >✕</button>

      <!-- Prev arrow -->
      <button
        v-if="images.length > 1"
        @click="prev"
        class="absolute left-[8%] top-1/2 -translate-y-1/2 bg-transparent border border-white/12 text-white/40 hover:text-white/80 hover:border-white/30 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-all"
      >←</button>

      <!-- Main image -->
      <div class="w-[78%] h-[75vh] bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
        <img
          v-if="images[currentIndex]"
          :src="images[currentIndex]"
          :alt="`Image ${currentIndex + 1}`"
          class="max-w-full max-h-full object-contain"
        />
        <span v-else class="font-sans text-[10px] text-white/20 tracking-wider">
          no image
        </span>
      </div>

      <!-- Next arrow -->
      <button
        v-if="images.length > 1"
        @click="next"
        class="absolute right-[8%] top-1/2 -translate-y-1/2 bg-transparent border border-white/12 text-white/40 hover:text-white/80 hover:border-white/30 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-all"
      >→</button>

      <!-- Dots -->
      <div v-if="images.length > 1" class="flex gap-2">
        <button
          v-for="(_, i) in images"
          :key="i"
          @click="currentIndex = i"
          class="rounded-full transition-all border-none cursor-pointer"
          :class="i === currentIndex
            ? 'w-3 h-[5px] bg-white/70'
            : 'w-[5px] h-[5px] bg-white/20'"
        ></button>
      </div>

    </div>
  </Teleport>
</template>