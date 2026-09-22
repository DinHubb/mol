<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 32 });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
    class="shrink-0"
  >
    <rect width="40" height="40" rx="11" class="fill-primary" />
    <path
      d="M12 11c0-2.2 1.8-4 4-4s4 1.8 4 4v7.5c0 3.6-2.9 6.5-6.5 6.5S7 22.1 7 18.5V16"
      stroke="white"
      stroke-opacity="0.9"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <circle cx="27" cy="24" r="7" class="fill-secondary" />
    <path
      d="M24 24h6"
      stroke="white"
      stroke-width="2.2"
      stroke-linecap="round"
    />
  </svg>
</template>
