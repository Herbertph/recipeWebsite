<template>
  <section class="bg-[#FAF4EF] py-12 px-6 text-[#3B2F2F] font-serif">
    <div class="max-w-7xl mx-auto min-h-screen flex flex-col space-y-12">

      <!-- Header: Title, Tags, Image -->
      <header class="flex flex-col items-center text-center space-y-6">
        <h1 class="text-5xl font-bold leading-tight max-w-4xl">
          {{ recipe?.title }}
        </h1>

        <!-- Health Tags -->
        <div class="flex flex-wrap gap-2 justify-center">
          <span v-if="recipe?.vegan" class="badge" aria-label="Vegan">Vegan</span>
          <span v-if="recipe?.vegetarian" class="badge" aria-label="Vegetarian">Vegetarian</span>
          <span v-if="recipe?.dairyFree" class="badge" aria-label="Dairy-Free">Dairy-Free</span>
          <span v-if="recipe?.glutenFree" class="badge" aria-label="Gluten-Free">Gluten-Free</span>
        </div>

        <!-- Image -->
        <div class="w-full max-w-2xl rounded-xl shadow-md border border-[#E7D9C4] overflow-hidden">
          <img v-if="imageVisible" :src="recipe?.image" :alt="`Image of ${recipe?.title}`" @error="handleImageError"
            class="w-full object-cover" />
          <div v-else class="w-full h-64 flex items-center justify-center text-gray-500 italic bg-gray-100" aria-label="No Image Available">
            No Image Available
          </div>
        </div>
      </header>

      <!-- Ingredients -->
      <section v-if="recipe?.extendedIngredients" class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-semibold tracking-wide text-center mb-4">Ingredients</h2>
        <div class="flex flex-wrap justify-center gap-4 text-[17px] leading-relaxed text-left">
          <span v-for="item in recipe.extendedIngredients" :key="item.id"
            class="bg-[#FFFDF8] border border-[#E7D9C4] px-4 py-2 rounded shadow-sm">
            {{ item.original }}
          </span>
        </div>
      </section>

      <!-- Instructions -->
      <section class="max-w-3xl mx-auto">
        <h2 class="text-2xl font-semibold tracking-wide text-center mb-4">Instructions</h2>
        <div v-if="recipe?.instructions" class="text-[17px] leading-relaxed space-y-4 text-left"
          v-html="recipe.instructions" />
        <p v-else class="italic text-gray-500 text-center">
          No instructions available.
        </p>
      </section>

      <!-- Back Link -->
      <footer class="text-center mt-16 mb-6">
        <button @click="$router.push('/')"
          class="text-[#5B4C4C] underline underline-offset-4 hover:text-[#B46F57] transition text-[16px]">
          Search for another recipe
        </button>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRecipeInformation } from '../services/api.js'

const recipe = ref(null)
const imageVisible = ref(true)
const route = useRoute()

function handleImageError(e) {
  setTimeout(() => {
    if (!e.target.complete || e.target.naturalWidth === 0) {
      imageVisible.value = false
    }
  }, 500)
}

onMounted(async () => {
  const id = route.params.id
  recipe.value = await getRecipeInformation(id)
})
</script>

<style scoped>
.badge {
  background-color: #E7D9C4;
  color: #3B2F2F;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}
</style>
