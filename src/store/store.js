import { configureStore } from '@reduxjs/toolkit'
import planetsReducer from './slices/planetsSlice'
import spaceshipReducer from './slices/spaceshipSlice'
import bookingReducer from './slices/bookingSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    planets: planetsReducer,
    spaceship: spaceshipReducer,
    booking: bookingReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
