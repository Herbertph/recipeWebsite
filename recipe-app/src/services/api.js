// src/services/api.js

const BASE_URL = 'https://api.spoonacular.com/recipes'

export async function searchRecipes(query, cuisine, offset = 0, number = 5) {
  const params = new URLSearchParams({
    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
    query,
    cuisine,
    offset,
    number,
    addRecipeInformation: true
  })

  const response = await fetch(`${BASE_URL}/complexSearch?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }

  return await response.json()
}

export async function getRecipeInformation(id) {
  const response = await fetch(
    `${BASE_URL}/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
  )
  if (!response.ok) throw new Error('Failed to fetch recipe')
  return await response.json()
}

