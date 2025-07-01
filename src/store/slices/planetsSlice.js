import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNASAExoplanets, fetchNASAImages, getReliablePlanetImage } from '../../services/nasaApi'
import { fictionalPlanets } from '../../data/fictionalPlanets'
import { addNotification } from './uiSlice'

// Async thunk for fetching NASA exoplanets
export const fetchExoplanets = createAsyncThunk(
  'planets/fetchExoplanets',
  async (_, { dispatch }) => {
    try {
      const exoplanets = await fetchNASAExoplanets()
      if (exoplanets.length > 0) {
        dispatch(addNotification({
          type: 'success',
          message: `Successfully loaded ${exoplanets.length} real NASA exoplanets!`,
          duration: 4000
        }))
      }
      return exoplanets
    } catch (error) {
      dispatch(addNotification({
        type: 'warning',
        message: 'NASA API unavailable. Showing fictional planets only.',
        duration: 6000
      }))
      throw error
    }
  }
)

// Async thunk for fetching planet images
export const fetchPlanetImages = createAsyncThunk(
  'planets/fetchPlanetImages',
  async (planetName) => {
    const images = await fetchNASAImages(planetName)
    return { planetName, images }
  }
)

// Initialize fictional planets with reliable images
const fictionalPlanetsWithImages = fictionalPlanets.map(planet => ({
  ...planet,
  image: getReliablePlanetImage(planet.name)
}))

const planetsSlice = createSlice({
  name: 'planets',
  initialState: {
    exoplanets: [],
    fictionalPlanets: fictionalPlanetsWithImages,
    allPlanets: fictionalPlanetsWithImages,
    selectedPlanet: null,
    filters: {
      hasWater: false,
      romantic: false,
      adventure: false,
      kidFriendly: false,
      searchTerm: '',
    },
    filteredPlanets: fictionalPlanetsWithImages,
    loading: false,
    error: null,
    planetImages: {},
  },
  reducers: {
    setSelectedPlanet: (state, action) => {
      state.selectedPlanet = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredPlanets = filterPlanets(state.allPlanets, state.filters)
    },
    clearFilters: (state) => {
      state.filters = {
        hasWater: false,
        romantic: false,
        adventure: false,
        kidFriendly: false,
        searchTerm: '',
      }
      state.filteredPlanets = state.allPlanets
    },
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload
      state.filteredPlanets = filterPlanets(state.allPlanets, state.filters)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExoplanets.pending, (state) => {
        state.loading = true
        state.error = null
        console.log('Fetching exoplanets from NASA...')
      })
      .addCase(fetchExoplanets.fulfilled, (state, action) => {
        state.loading = false

        // Add reliable images to NASA exoplanets
        const exoplanetsWithImages = action.payload.map(planet => ({
          ...planet,
          image: getReliablePlanetImage(planet.name)
        }))

        // Add reliable images to fictional planets too
        const fictionalWithImages = state.fictionalPlanets.map(planet => ({
          ...planet,
          image: getReliablePlanetImage(planet.name)
        }))

        state.exoplanets = exoplanetsWithImages
        state.allPlanets = [...fictionalWithImages, ...exoplanetsWithImages]
        state.filteredPlanets = filterPlanets(state.allPlanets, state.filters)
        console.log(`Successfully loaded ${action.payload.length} exoplanets from NASA with reliable images`)
      })
      .addCase(fetchExoplanets.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        console.warn('Failed to fetch NASA exoplanets, using fictional planets only:', action.error.message)

        // Fallback to fictional planets only with reliable images
        const fictionalWithImages = state.fictionalPlanets.map(planet => ({
          ...planet,
          image: getReliablePlanetImage(planet.name)
        }))

        state.allPlanets = fictionalWithImages
        state.filteredPlanets = filterPlanets(fictionalWithImages, state.filters)
      })
      .addCase(fetchPlanetImages.pending, (state, action) => {
        console.log(`Fetching images for planet: ${action.meta.arg}`)
      })
      .addCase(fetchPlanetImages.fulfilled, (state, action) => {
        const { planetName, images } = action.payload
        state.planetImages[planetName] = images
        console.log(`Successfully fetched ${images.length} images for ${planetName}`)
      })
      .addCase(fetchPlanetImages.rejected, (state, action) => {
        console.warn(`Failed to fetch images for planet: ${action.meta.arg}`, action.error.message)
      })
  },
})

// Helper function to filter planets
const filterPlanets = (planets, filters) => {
  return planets.filter(planet => {
    const matchesSearch = !filters.searchTerm || 
      planet.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      planet.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    const matchesWater = !filters.hasWater || planet.tags?.includes('Has Water')
    const matchesRomantic = !filters.romantic || planet.tags?.includes('Romantic')
    const matchesAdventure = !filters.adventure || planet.tags?.includes('Adventure')
    const matchesKidFriendly = !filters.kidFriendly || planet.tags?.includes('Kid-Friendly')
    
    return matchesSearch && matchesWater && matchesRomantic && matchesAdventure && matchesKidFriendly
  })
}

export const { setSelectedPlanet, setFilters, clearFilters, setSearchTerm } = planetsSlice.actions
export default planetsSlice.reducer
