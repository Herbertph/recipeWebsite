<template>
  <div class="flex flex-col min-h-screen bg-[#FAF4EF]">
    <Header />
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

watch(
  () => route.path,
  (newPath) => {
    document.body.classList.toggle('no-scroll', newPath === '/')
  },
  { immediate: true }
)
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>
