import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Globe, 
  MapPin, 
  Star,
  Droplets,
  Heart,
  Mountain,
  Baby
} from 'lucide-react'
import { setSearchTerm, setFilters } from '../store/slices/planetsSlice'
import { toggleSidebar } from '../store/slices/uiSlice'

const Destinations = () => {
  const dispatch = useDispatch()
  const { filteredPlanets, loading, filters, error } = useSelector(state => state.planets)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchTerm(searchInput))
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchInput, dispatch])

  const handleFilterToggle = (filterKey) => {
    dispatch(setFilters({
      [filterKey]: !filters[filterKey]
    }))
  }

  const getTagIcon = (tag) => {
    switch (tag) {
      case 'Has Water':
        return <Droplets className="w-4 h-4 text-blue-400" />
      case 'Romantic':
        return <Heart className="w-4 h-4 text-pink-400" />
      case 'Adventure':
        return <Mountain className="w-4 h-4 text-orange-400" />
      case 'Kid-Friendly':
        return <Baby className="w-4 h-4 text-green-400" />
      default:
        return <Star className="w-4 h-4 text-yellow-400" />
    }
  }

  const quickFilters = [
    { key: 'hasWater', label: 'Has Water', icon: Droplets, color: 'text-blue-400' },
    { key: 'romantic', label: 'Romantic', icon: Heart, color: 'text-pink-400' },
    { key: 'adventure', label: 'Adventure', icon: Mountain, color: 'text-orange-400' },
    { key: 'kidFriendly', label: 'Kid-Friendly', icon: Baby, color: 'text-green-400' },
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white font-space mb-4">
            Galactic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Destinations
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover over 100 incredible planets across the galaxy. From NASA-confirmed exoplanets to fictional worlds.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search planets, destinations, or features..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(toggleSidebar())}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-gray-600 rounded-lg text-gray-300 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              <span>All Filters</span>
            </motion.button>

            {quickFilters.map((filter) => {
              const Icon = filter.icon
              const isActive = filters[filter.key]
              
              return (
                <motion.button
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterToggle(filter.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'bg-neon-blue/20 border-neon-blue/50 text-neon-blue'
                      : 'bg-white/10 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Results Count */}
          <div className="text-gray-400 text-sm">
            Showing {filteredPlanets.length} destinations
            {filters.searchTerm && ` for "${filters.searchTerm}"`}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
            <p className="text-gray-400 mt-4">🚀 Loading destinations from NASA...</p>
            <p className="text-gray-500 text-sm mt-2">Fetching real exoplanet data and images</p>
          </div>
        )}

        {/* Planets Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPlanets.map((planet, index) => (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-lg border border-gray-600 hover:border-neon-blue/50 transition-all duration-300"
              >
                {/* Planet Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 relative overflow-hidden">
                  {planet.image ? (
                    <img
                      src={planet.image}
                      alt={planet.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.log(`Failed to load image for ${planet.name}: ${planet.image}`)
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                      onLoad={(e) => {
                        e.target.nextSibling.style.display = 'none'
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 p-8 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
                  </div>
                </div>

                {/* Planet Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                      {planet.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded-full">
                      {planet.type}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {planet.description}
                  </p>

                  {/* Tags */}
                  {planet.tags && planet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {planet.tags.slice(0, 3).map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="flex items-center space-x-1 text-xs px-2 py-1 bg-white/10 rounded-full"
                        >
                          {getTagIcon(tag)}
                          <span className="text-gray-300">{tag}</span>
                        </div>
                      ))}
                      {planet.tags.length > 3 && (
                        <div className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
                          +{planet.tags.length - 3} more
                        </div>
                      )}
                    </div>
                  )}

                  {/* Distance and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{planet.distance} ly away</span>
                    </div>
                    <div className="text-neon-green font-bold">
                      {planet.baseCost?.toLocaleString()} GC
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/planet/${planet.id}`}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium rounded-lg hover:from-neon-purple hover:to-neon-pink transition-all duration-300 group-hover:neon-glow"
                  >
                    Explore Planet
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filteredPlanets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No destinations found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or filters to find more planets.
            </p>
            <button
              onClick={() => {
                setSearchInput('')
                dispatch(setSearchTerm(''))
                dispatch(setFilters({
                  hasWater: false,
                  romantic: false,
                  adventure: false,
                  kidFriendly: false,
                }))
              }}
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium rounded-lg hover:from-neon-purple hover:to-neon-pink transition-all duration-300"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Destinations
