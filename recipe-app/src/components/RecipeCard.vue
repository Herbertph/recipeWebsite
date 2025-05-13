<template>
  <div @mouseenter="setHovered(recipe.id)" @mouseleave="setHovered(null)" @click="$router.push(`/recipe/${recipe.id}`)" role="button" aria-label="`View details for ${recipe.title}`"
    class="cursor-pointer bg-white shadow rounded-xl transition duration-300 flex flex-col items-center justify-between w-48 h-72"
    :class="{
      'scale-105 z-10 shadow-lg': hoveredCard === recipe.id,
      'opacity-60': hoveredCard !== null && hoveredCard !== recipe.id
    }">
    <!-- Image section -->
    <div class="w-full h-40 flex items-center justify-center bg-gray-100 overflow-hidden rounded-t-xl">
      <img v-if="imageVisible" :src="recipe.image" :alt="`Image of ${recipe.title}`" class="w-full h-full object-cover"
        @error="handleImageError" />
      <span v-else class="text-gray-500 italic text-sm" aria-label="No Image Available">No Image</span>
    </div>

    <!-- Title section -->
    <div class="p-4 text-center flex-1 flex items-center justify-center">
      <h2 class="text-md font-semibold font-serif text-[#3B2F2F] leading-tight">
        {{ recipe.title }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

// Props
const props = defineProps(['recipe'])

// Injected values to track hovered card
const hoveredCard = inject('hoveredCard')
const setHovered = inject('setHovered')

// State to control image fallback
const imageVisible = ref(true)

function handleImageError() {
  imageVisible.value = false
}
</script>
