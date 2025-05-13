<template>
  <section class="bg-[#FAF4EF] text-[#3B2F2F] font-serif flex flex-col min-h-screen">
    <!-- Main container that grows to fill available space -->
    <div class="flex-grow flex items-center justify-center">
      <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-x-16 px-6 py-12">

        <!-- Left Side: Text and Search -->
        <div class="max-w-xl space-y-6 text-center md:text-left bg-white/70 p-8 rounded-lg shadow-md">
          <h1 class="text-4xl md:text-5xl font-bold leading-snug tracking-wide">
            A cozy recipe for every day
          </h1>
          <p class="text-lg text-[#5B4C4C] italic">
            Straight from grandma’s kitchen — warm, simple, and full of love.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mt-6">
            <!-- Accessible label (visually hidden) -->
            <input id="search-input" v-model="searchTerm" aria-label="Search for a recipe" @keydown.enter="onSearch"
              type="text" placeholder="Recipe Finder!"
              class="flex-1 px-4 py-3 border border-[#C9B6A0] bg-[#FFFDF8] rounded-lg shadow-sm focus:outline-none" />

            <!-- Cuisine filter dropdown -->
            <CuisineSelect v-model="selectedCuisine" aria-label="Select a cuisine" />

            <!-- Error Message -->
            <p v-if="searchError" class="text-red-600 mt-2 text-sm italic">
              You need to type your recipe
            </p>

            <!-- Search button -->
            <button @click="onSearch"
              class="bg-[#B46F57] text-white px-6 py-3 rounded-lg hover:brightness-105 transition shadow">
              Search
            </button>
          </div>
        </div>

        <!-- Right Side: Decorative Image -->
        <div class="hidden md:block max-w-md mt-10 md:mt-0 relative">
          <img src="/hero.png" alt="Grandma with a rolling pin in cartoon style"
            class="relative z-10 w-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CuisineSelect from './CuisineSelect.vue'


// Emit search event to parent
const emit = defineEmits(['search'])

// State for user input and cuisine selection
const searchTerm = ref('')
const selectedCuisine = ref('')

// Emit search event when user hits enter or clicks button
function onSearch() {
  if (!searchTerm.value.trim()) return // Basic validation
  emit('search', {
    query: searchTerm.value,
    cuisine: selectedCuisine.value
  })
}
</script>