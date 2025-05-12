<template>
  <router-view />
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.path,
  (newPath) => {
    const isFixed = newPath === '/'
    document.body.style.overflow = isFixed ? 'hidden' : 'auto'
  },
  { immediate: true }
)
</script>

<style>
html, body, #app {
  height: 100%;
  
}
</style>
