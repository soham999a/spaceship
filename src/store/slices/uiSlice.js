import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    currentView: 'dashboard', // dashboard, destinations, planet-details, booking, galaxy-map
    loading: false,
    notifications: [],
    theme: 'dark',
    soundEnabled: true,
    animationsEnabled: true,
    galaxyMapView: '2d', // 2d, 3d
    showFilters: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: action.payload.type || 'info', // success, error, warning, info
        message: action.payload.message,
        duration: action.payload.duration || 5000,
        timestamp: new Date().toISOString(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled
    },
    toggleAnimations: (state) => {
      state.animationsEnabled = !state.animationsEnabled
    },
    setGalaxyMapView: (state, action) => {
      state.galaxyMapView = action.payload
    },
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters
    },
    setShowFilters: (state, action) => {
      state.showFilters = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setCurrentView,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleTheme,
  toggleSound,
  toggleAnimations,
  setGalaxyMapView,
  toggleFilters,
  setShowFilters,
} = uiSlice.actions

export default uiSlice.reducer
