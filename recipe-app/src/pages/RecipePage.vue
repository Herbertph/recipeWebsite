<template>
    <section class="bg-[#FAF4EF] py-12 px-6 text-[#3B2F2F] font-serif">
      <div class="max-w-7xl mx-auto min-h-screen flex flex-col space-y-12">
  
        <!-- Top: Title, Tags, and Image (stacked) -->
        <div class="flex flex-col items-center text-center space-y-6">
          <h1 class="text-5xl font-bold leading-tight max-w-4xl">{{ recipe?.title }}</h1>
          
          <div class="flex flex-wrap gap-2 justify-center">
            <span v-if="recipe?.vegan" class="badge">Vegan</span>
            <span v-if="recipe?.vegetarian" class="badge">Vegetarian</span>
            <span v-if="recipe?.dairyFree" class="badge">Dairy-Free</span>
            <span v-if="recipe?.glutenFree" class="badge">Gluten-Free</span>
          </div>
  
          <img
            :src="recipe?.image"
            :alt="recipe?.title"
            class="w-full max-w-2xl rounded-xl shadow-md border border-[#E7D9C4] object-cover"
          />
        </div>
  
     <!-- Ingredients Horizontal -->
<div v-if="recipe?.extendedIngredients" class="max-w-5xl mx-auto mt-12">
  <h2 class="text-2xl font-semibold mb-4 tracking-wide text-center">Ingredients</h2>
  <hr class="mx-auto mb-6 border-t border-[#E7D9C4] w-24">
  <div class="flex flex-wrap justify-center gap-4 text-[17px] leading-relaxed text-left">
    <span
      v-for="item in recipe.extendedIngredients"
      :key="item.id"
      class="bg-[#FFFDF8] border border-[#E7D9C4] px-4 py-2 rounded shadow-sm"
    >
      {{ item.original }}
    </span>
  </div>
</div>

<!-- Instructions Below -->
<div class="max-w-3xl mx-auto mt-16">
  <h2 class="text-2xl font-semibold mb-2 tracking-wide text-center">Instructions</h2>
  <hr class="my-4 border-t border-[#E7D9C4] w-24 mx-auto">
  <div
    v-if="recipe?.instructions"
    class="text-[17px] leading-relaxed space-y-4 text-left"
    v-html="recipe.instructions"
  />
  <p v-else class="italic text-gray-500 text-center">No instructions available.</p>
</div>
  
        <!-- Footer Links -->
        <div class="text-center flex flex-col sm:flex-row justify-center gap-6 mt-16 mb-6 text-[16px]">
          <button
            @click="$router.push('/')"
            class="text-[#5B4C4C] underline underline-offset-4 hover:text-[#B46F57] transition"
          >
            Search for another recipe
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getRecipeInformation } from '../services/api.js'
  
  const route = useRoute()
  const recipe = ref(null)
  
  onMounted(async () => {
    const id = route.params.id
    recipe.value = await getRecipeInformation(id)
  })
  </script>
  
  <style scoped>
  .badge {
    @apply bg-[#E7D9C4] text-[#3B2F2F] text-sm px-3 py-1 rounded-full;
  }
  </style>
  