<template>
  <transition name="fade" mode="out-in">
    <HeroSection v-if="isHeroVisible" @search="handleSearch" key="hero" />

    <main v-else key="results"
      class="bg-[#FAF4EF] min-h-screen flex flex-col justify-center items-center gap-8 px-6 py-16">

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="text-[#5B4C4C] text-lg font-medium">Loading recipes...</div>

      <!-- Cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
      </div>

      <!-- Arrows -->
      <div class="flex justify-center gap-4">
        <UiButton :disabled="currentPage === 1 || isLoading" @click="changePage(currentPage - 1)">
          ←
        </UiButton>

        <UiButton :disabled="currentPage * 5 >= totalResults || isLoading" @click="changePage(currentPage + 1)">
          →
        </UiButton>
      </div>

      <!-- Back Button -->
      <button @click="goBackToHero" class="text-[#5B4C4C] underline underline-offset-2 hover:text-[#B46F57] transition">
        Back to Search
      </button>
    </main>
  </transition>
</template>

<script setup>
import { ref, provide } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import RecipeCard from '../components/RecipeCard.vue'
import UiButton from '../components/UiButton.vue'
import { searchRecipes } from '../services/api.js'

const isHeroVisible = ref(true)
const recipes = ref([])
const totalResults = ref(0)
const currentPage = ref(1)
const lastQuery = ref('')
const lastCuisine = ref('')
const hoveredCard = ref(null)
const isLoading = ref(false)
const searchError = ref(false)

const setHovered = (id) => {
  hoveredCard.value = id
}

provide('hoveredCard', hoveredCard)
provide('setHovered', setHovered)

function resetSearch() {
  recipes.value = []
  totalResults.value = 0
  currentPage.value = 1
  lastQuery.value = ''
  lastCuisine.value = ''
  isHeroVisible.value = true
  searchError.value = false
}

async function handleSearch({ query, cuisine }) {
  if (!query && !cuisine) {
    searchError.value = true
    return
  }
  searchError.value = false
  currentPage.value = 1
  lastQuery.value = query
  lastCuisine.value = cuisine
  await loadRecipes(query, cuisine, 0, 5)
  isHeroVisible.value = false
}

async function changePage(page) {
  currentPage.value = page
  const offset = (page - 1) * 5
  await loadRecipes(lastQuery.value, lastCuisine.value, offset, 5)
}

async function loadRecipes(query, cuisine, offset = 0, number = 5) {
  isLoading.value = true
  try {
    const data = await searchRecipes(query, cuisine, offset, number)
    recipes.value = data.results
    totalResults.value = data.totalResults
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function goBackToHero() {
  resetSearch()
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>