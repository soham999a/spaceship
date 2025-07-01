import { createSlice } from '@reduxjs/toolkit'
import { spaceships } from '../../data/spaceships'

const spaceshipSlice = createSlice({
  name: 'spaceship',
  initialState: {
    availableSpaceships: spaceships,
    selectedSpaceship: null,
    travelSpeed: 58000, // km/h - default to Elon's Starship
    customSpeed: false,
  },
  reducers: {
    selectSpaceship: (state, action) => {
      const spaceship = state.availableSpaceships.find(ship => ship.id === action.payload)
      state.selectedSpaceship = spaceship
      if (spaceship) {
        state.travelSpeed = spaceship.maxSpeed
        state.customSpeed = false
      }
    },
    setCustomSpeed: (state, action) => {
      state.travelSpeed = action.payload
      state.customSpeed = true
      state.selectedSpaceship = null
    },
    resetSpaceshipSelection: (state) => {
      state.selectedSpaceship = null
      state.travelSpeed = 58000
      state.customSpeed = false
    },
  },
})

export const { selectSpaceship, setCustomSpeed, resetSpaceshipSelection } = spaceshipSlice.actions
export default spaceshipSlice.reducer
