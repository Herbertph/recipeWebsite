// src/services/api.js

const BASE_URL = 'https://api.spoonacular.com/recipes'
const API_KEY=import.meta.env.VITE_SPOONACULAR_API_KEY2

async function fetchJson(url){
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch data')
  return await response.json()
}

export async function searchRecipes(query, cuisine, offset = 0, number = 5) {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query,
      cuisine,
      offset,
      number,
      addRecipeInformation: true
    })

    const url = `${BASE_URL}/complexSearch?${params}`
    return await fetchJson(url)
  } catch (error) {
    console.error('Error searching recipes:', error)
    throw error
  }
}

export async function getRecipeInformation(id) {
  try {
    const url = `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
    return await fetchJson(url)
  } catch (error) {
    console.error('Error fetching recipe information:', error)
    throw error
  }
}

