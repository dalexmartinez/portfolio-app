<script setup lang="ts">
defineProps<{
  height?: number
}>()
</script>

<template>
  <div class="rounded-lg border border-border overflow-hidden animate-pulse">
    <!-- Imagen placeholder -->
    <div
      class="w-full bg-muted"
      :style="{ height: `${height ?? 160}px` }"
    ></div>

    <!-- Metadata placeholder -->
    <div class="px-3 py-2 border-t border-border bg-background">
      <div class="h-3 bg-muted rounded w-3/4 mb-2"></div>
      <div class="h-2 bg-muted rounded w-1/2"></div>
    </div>
  </div>
</template>