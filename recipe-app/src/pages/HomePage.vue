<template>
    <div>
      <!-- Hero + search -->
      <HeroSection @search="handleSearch" />
  
      <!-- Results section -->
      <section class="max-w-7xl mx-auto px-6 py-12">
        <div v-if="recipes.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>
  
        <div v-else-if="hasSearched" class="text-center text-gray-600 mt-10">
          No recipes found. Try a different keyword or cuisine.
        </div>
  
        <!-- Pagination -->
        <Pagination
          v-if="totalResults > 5"
          class="mt-12"
          :currentPage="currentPage"
          :totalPages="Math.ceil(totalResults / 5)"
          @change="changePage"
        />
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import HeroSection from '../components/HeroSection.vue'

  //import { searchRecipes } from '../services/api.js'

  const recipes = ref([])
  const totalResults = ref(0)
  const currentPage = ref(1)
  const lastQuery = ref('')
  const lastCuisine = ref('')
  const hasSearched = ref(false)
  
  async function handleSearch({ query, cuisine }) {
    currentPage.value = 1
    lastQuery.value = query
    lastCuisine.value = cuisine
    hasSearched.value = true
    await fetchRecipes()
  }
  
  async function changePage(page) {
    currentPage.value = page
    await fetchRecipes()
  }
  
  async function fetchRecipes() {
  recipes.value = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://via.placeholder.com/300x200?text=Carbonara'
    },
    {
      id: 2,
      title: 'Avocado Salad',
      image: 'https://via.placeholder.com/300x200?text=Avocado+Salad'
    },
    {
      id: 3,
      title: 'Pancakes',
      image: 'https://via.placeholder.com/300x200?text=Pancakes'
    }
  ]
  totalResults.value = 9
}

  </script>
  