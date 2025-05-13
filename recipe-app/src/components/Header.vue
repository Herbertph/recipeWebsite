<template>
  <header class="bg-[#F3E4D7] text-[#3B2F2F] px-6 py-4 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between relative">

      <!-- Main Title -->
      <h1
        :class="[
          'font-bold text-xl md:text-2xl tracking-wide whitespace-nowrap',
          isHome ? 'absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0' : ''
        ]"
      >
        Grandma's Kitchen
      </h1>

      <!-- Home Button -->
      <nav v-if="!isHome" class="hidden md:block ml-auto space-x-6">
        <RouterLink to="/" class="hover:underline">
          Home
        </RouterLink>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
