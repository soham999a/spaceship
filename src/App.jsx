import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

// Import pages
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import PlanetDetails from './pages/PlanetDetails'
import Spaceships from './pages/Spaceships'
import SpaceshipDetails from './pages/SpaceshipDetails'
import Booking from './pages/Booking'
import GalaxyMap from './pages/GalaxyMap'

// Import components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import NotificationSystem from './components/NotificationSystem'
import LoadingScreen from './components/LoadingScreen'

// Import store actions
import { fetchExoplanets } from './store/slices/planetsSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('🚀 Space Tourism Portal 2090 - App starting...')
    // Fetch exoplanets on app load
    dispatch(fetchExoplanets())
    console.log('📡 Dispatched fetchExoplanets action')
  }, [dispatch])

  return (
    <div className="min-h-screen bg-space-gradient cosmic-bg">
      {/* Background stars animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Main app content */}
      <div className="relative z-10">
        <Navbar />
        <Sidebar />
        <NotificationSystem />
        
        <main className="transition-all duration-300">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/destinations" 
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Destinations />
                  </motion.div>
                } 
              />
              <Route
                path="/planet/:id"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PlanetDetails />
                  </motion.div>
                }
              />
              <Route
                path="/spaceships"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Spaceships />
                  </motion.div>
                }
              />
              <Route
                path="/spaceship/:id"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SpaceshipDetails />
                  </motion.div>
                }
              />
              <Route 
                path="/booking" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Booking />
                  </motion.div>
                } 
              />
              <Route 
                path="/galaxy-map" 
                element={
                  <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.7 }}
                  >
                    <GalaxyMap />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
