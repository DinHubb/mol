<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

const localePath = useLocalePath();
</script>

<template>
  <UApp>
    <UError
      :error="{
        statusCode: error.statusCode,
        statusMessage: $t('common.error.title'),
        message: $t('common.error.description'),
      }"
      :redirect="localePath('/')"
    />
  </UApp>
</template>
