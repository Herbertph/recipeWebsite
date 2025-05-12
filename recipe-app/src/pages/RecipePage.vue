<template>
    <section class="bg-[#FAF4EF] py-12 px-6 text-[#3B2F2F] font-serif">
        <div class="max-w-7xl mx-auto min-h-screen px-6 pt-12 pb-8 flex flex-col">
        
        <!-- Top Grid: Title and Image -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <!-- Left: Title and Labels -->
          <div class="space-y-4">
            <div>
              <h1 class="text-5xl font-bold leading-tight">{{ recipe?.title }}</h1>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-if="recipe?.vegan" class="badge">Vegan</span>
                <span v-if="recipe?.vegetarian" class="badge">Vegetarian</span>
                <span v-if="recipe?.dairyFree" class="badge">Dairy-Free</span>
                <span v-if="recipe?.glutenFree" class="badge">Gluten-Free</span>
              </div>
            </div>
          </div>
  
          <!-- Right: Image -->
          <div>
            <img
              :src="recipe?.image"
              :alt="recipe?.title"
              class="w-full rounded-xl shadow-md border border-[#E7D9C4] object-cover"
            />
          </div>
        </div>
  
        <!-- Bottom Grid: Instructions and Ingredients -->
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <!-- Instructions -->
          <div>
            <h2 class="text-2xl font-semibold mb-2 tracking-wide">Instructions</h2>
            <hr class="my-4 border-t border-[#E7D9C4] w-24">
            <div
              v-if="recipe?.instructions"
              class="text-[17px] leading-relaxed space-y-4"
              v-html="recipe.instructions"
            />
            <p v-else class="italic text-gray-500">No instructions available.</p>
          </div>
  
          <!-- Ingredients -->
          <div v-if="recipe?.extendedIngredients">
            <h2 class="text-2xl font-semibold mb-2 tracking-wide">Ingredients</h2>
            <hr class="my-4 border-t border-[#E7D9C4] w-24">
            <ul class="list-disc list-inside space-y-1 text-[17px] leading-relaxed">
              <li v-for="item in recipe.extendedIngredients" :key="item.id">
                {{ item.original }}
              </li>
            </ul>
          </div>
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
  