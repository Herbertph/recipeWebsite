<template>
    <div
      @mouseenter="setHovered(recipe.id)"
      @mouseleave="setHovered(null)"
      @click="$router.push(`/recipe/${recipe.id}`)"
      class="cursor-pointer bg-white shadow rounded-xl transition duration-300 flex flex-col items-center justify-between w-48 h-72"
      :class="{
        'scale-105 z-10 shadow-lg': hoveredCard === recipe.id,
        'opacity-60': hoveredCard !== null && hoveredCard !== recipe.id
      }"
    >
      <div class="w-full h-40 flex items-center justify-center bg-gray-100 overflow-hidden rounded-t-xl">
        <img
          v-if="imageVisible"
          :src="recipe.image"
          :alt="recipe.title"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        <span v-else class="text-gray-500 italic text-sm">No Image</span>
      </div>
  
      <div class="p-4 text-center flex-1 flex items-center justify-center">
        <h2 class="text-md font-semibold font-serif text-[#3B2F2F] leading-tight">
          {{ recipe.title }}
        </h2>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, inject } from 'vue'
  
  defineProps(['recipe'])
  const hoveredCard = inject('hoveredCard')
  const setHovered = inject('setHovered')
  
  const imageVisible = ref(true)
  
  function handleImageError() {
    imageVisible.value = false
  }
  </script>
  