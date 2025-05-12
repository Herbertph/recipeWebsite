<script setup>
import { ref, provide } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import RecipeCard from '../components/RecipeCard.vue'
import UiButton from '../components/UiButton.vue'
import { searchRecipes } from '../services/api.js'

const showHero = ref(true)
const recipes = ref([])
const totalResults = ref(0)
const currentPage = ref(1)
const lastQuery = ref('')
const lastCuisine = ref('')
const hoveredCard = ref(null)
const setHovered = (id) => {
  hoveredCard.value = id
}

provide('hoveredCard', hoveredCard)
provide('setHovered', setHovered)

async function handleSearch({ query, cuisine }) {
  currentPage.value = 1
  lastQuery.value = query
  lastCuisine.value = cuisine
  await fetchRecipes()
  showHero.value = false
}

async function changePage(page) {
  currentPage.value = page
  await fetchRecipes()
}

async function fetchRecipes() {
  try {
    const offset = (currentPage.value - 1) * 5
    const data = await searchRecipes(lastQuery.value, lastCuisine.value, offset, 5)
    recipes.value = data.results
    totalResults.value = data.totalResults
  } catch (err) {
    console.error(err)
  }
}

function goBackToHero() {
  showHero.value = true
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <HeroSection v-if="showHero" @search="handleSearch" key="hero" />

    <div
      v-else
      key="results"
      class="bg-[#FAF4EF] h-screen flex flex-col justify-center items-center gap-8 px-6"
    >
      <!-- Cards & Arrows -->
      <div class="relative w-full max-w-7xl flex items-center justify-between">
        <!-- Prev Arrow -->
        <UiButton
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ←
        </UiButton>

        <!-- Cards -->
        <div class="grid grid-cols-5 gap-4 flex-1 mx-6">
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>

        <!-- Next Arrow -->
        <UiButton
          :disabled="currentPage * 5 >= totalResults"
          @click="changePage(currentPage + 1)"
        >
          →
        </UiButton>
      </div>

      <!-- Back Button -->
      <UiButton variant="gray" @click="goBackToHero">
        Back to Search
      </UiButton>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
