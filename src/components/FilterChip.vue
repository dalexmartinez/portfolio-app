<script setup lang="ts">
defineProps<{
  label: string
  active: boolean
}>()

defineEmits<{
  select: [label: string]
}>()
</script>

<template>
  <button
    @click="$emit('select', label)"
    class="font-sans text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-all cursor-pointer bg-transparent shrink-0 whitespace-nowrap"
    :class="active
      ? 'border-foreground/40 text-foreground bg-foreground/5'
      : 'border-border text-muted-foreground hover:border-foreground/20'"
  >
    {{ label }}
  </button>
</template>