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
  class="bg-[#FAF4EF] min-h-screen flex flex-col justify-center items-center gap-8 px-6 py-16"
>
      <!-- Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <!-- Arrows -->
      <div class="flex justify-center gap-4">
        <UiButton
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ←
        </UiButton>

        <UiButton
          :disabled="currentPage * 5 >= totalResults"
          @click="changePage(currentPage + 1)"
        >
          →
        </UiButton>
      </div>

      <!-- Back Button -->
      <button
        @click="goBackToHero"
        class="text-[#5B4C4C] underline underline-offset-2 hover:text-[#B46F57] transition"
      >
        Back to Search
      </button>
    </div>
  </transition>
</template>

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
