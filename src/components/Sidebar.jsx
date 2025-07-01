import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Star, Droplets, Heart, Mountain, Baby } from 'lucide-react'
import { setSidebarOpen, toggleFilters } from '../store/slices/uiSlice'
import { setFilters, clearFilters } from '../store/slices/planetsSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen, showFilters } = useSelector(state => state.ui)
  const { filters } = useSelector(state => state.planets)

  const filterOptions = [
    {
      key: 'hasWater',
      label: 'Has Water',
      icon: Droplets,
      color: 'text-blue-400',
      description: 'Planets with water sources'
    },
    {
      key: 'romantic',
      label: 'Romantic',
      icon: Heart,
      color: 'text-pink-400',
      description: 'Perfect for couples'
    },
    {
      key: 'adventure',
      label: 'Adventure',
      icon: Mountain,
      color: 'text-orange-400',
      description: 'Thrilling experiences'
    },
    {
      key: 'kidFriendly',
      label: 'Kid-Friendly',
      icon: Baby,
      color: 'text-green-400',
      description: 'Safe for families'
    }
  ]

  const handleFilterChange = (filterKey) => {
    dispatch(setFilters({
      [filterKey]: !filters[filterKey]
    }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setSidebarOpen(false))}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 bottom-0 w-80 bg-cosmic-dark/95 backdrop-blur-lg border-r border-neon-blue/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white font-space flex items-center">
                  <Filter className="w-6 h-6 mr-2 text-neon-blue" />
                  Filters
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(setSidebarOpen(false))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Planet Categories
                </h3>
                
                {filterOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = filters[option.key]
                  
                  return (
                    <motion.div
                      key={option.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterChange(option.key)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border-neon-blue/50 neon-glow'
                          : 'bg-white/5 border-gray-600 hover:border-gray-500 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${isActive ? 'text-neon-blue' : option.color}`} />
                        <div className="flex-1">
                          <h4 className={`font-medium ${isActive ? 'text-neon-blue' : 'text-white'}`}>
                            {option.label}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {option.description}
                          </p>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-neon-blue rounded-full"
                          />
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Clear Filters Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-medium rounded-lg hover:from-neon-pink hover:to-neon-purple transition-all duration-300 neon-glow"
              >
                Clear All Filters
              </motion.button>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-gray-600">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Quick Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total Planets</span>
                    <span className="text-neon-blue font-medium">100+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">NASA Exoplanets</span>
                    <span className="text-neon-green font-medium">50+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Fictional Worlds</span>
                    <span className="text-neon-purple font-medium">50+</span>
                  </div>
                </div>
              </div>

              {/* Featured Destination */}
              <div className="mt-6 p-4 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-lg border border-neon-blue/30">
                <h3 className="text-sm font-semibold text-neon-blue uppercase tracking-wider mb-2">
                  Featured Destination
                </h3>
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-neon-orange" />
                  <div>
                    <h4 className="font-medium text-white">Pandora</h4>
                    <p className="text-xs text-gray-400">Bioluminescent paradise</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
