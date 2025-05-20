// src/services/__tests__/api.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchRecipes, getRecipeInformation } from '../services/api.js'

const fakeResponse = (data, ok = true) => ({
  ok,
  json: async () => data
})

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('API Service', () => {
  describe('searchRecipes', () => {
    it('should return recipe data when fetch succeeds', async () => {
      const mockData = { results: [{ id: 1, title: 'Pasta' }], totalResults: 1 }
      global.fetch = vi.fn().mockResolvedValue(fakeResponse(mockData))

      const data = await searchRecipes('pasta', '', 0, 5)

      expect(fetch).toHaveBeenCalled()
      expect(data.results).toHaveLength(1)
      expect(data.results[0].title).toBe('Pasta')
    })

    it('should throw an error if fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue(fakeResponse({}, false))

      await expect(searchRecipes('pasta', '', 0, 5)).rejects.toThrow('Failed to fetch data')
    })
  })

  describe('getRecipeInformation', () => {
    it('should return recipe details when fetch succeeds', async () => {
      const mockRecipe = { id: 123, title: 'Soup' }
      global.fetch = vi.fn().mockResolvedValue(fakeResponse(mockRecipe))

      const data = await getRecipeInformation(123)

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/123/information'))
      expect(data.title).toBe('Soup')
    })

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue(fakeResponse({}, false))

      await expect(getRecipeInformation(123)).rejects.toThrow('Failed to fetch data')
    })
  })
})
