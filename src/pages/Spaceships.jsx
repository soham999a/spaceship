import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Users, 
  Gauge, 
  Star, 
  Shield,
  Search,
  Filter,
  CheckCircle,
  X
} from 'lucide-react'

const Spaceships = () => {
  const { availableSpaceships } = useSelector(state => state.spaceship)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    capacity: 'all', // all, small (1-10), medium (11-50), large (51+)
    comfort: 'all', // all, basic (1-5), premium (6-8), luxury (9-10)
    features: []
  })

  const filteredSpaceships = availableSpaceships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCapacity = filters.capacity === 'all' ||
                           (filters.capacity === 'small' && ship.capacity <= 10) ||
                           (filters.capacity === 'medium' && ship.capacity > 10 && ship.capacity <= 50) ||
                           (filters.capacity === 'large' && ship.capacity > 50)
    
    const matchesComfort = filters.comfort === 'all' ||
                          (filters.comfort === 'basic' && ship.comfortLevel <= 5) ||
                          (filters.comfort === 'premium' && ship.comfortLevel > 5 && ship.comfortLevel <= 8) ||
                          (filters.comfort === 'luxury' && ship.comfortLevel > 8)
    
    const matchesFeatures = filters.features.length === 0 ||
                           filters.features.every(feature => ship.features[feature])
    
    return matchesSearch && matchesCapacity && matchesComfort && matchesFeatures
  })

  const toggleFeatureFilter = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const getFeatureIcon = (feature) => {
    const icons = {
      wifi: '📶',
      restaurant: '🍽️',
      gym: '💪',
      spa: '🧘',
      entertainment: '🎬',
      cryosleep: '😴'
    }
    return icons[feature] || '✨'
  }

  return (
    <div className="min-h-screen pt-16 bg-space-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white font-space mb-4">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Our Fleet
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our premium collection of spaceships, each designed for the ultimate space travel experience
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search spaceships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-lg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            />
          </div>

          {/* Filters */}
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-gray-600">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-neon-blue mr-2" />
              <h3 className="text-lg font-semibold text-white">Filters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Capacity</label>
                <select
                  value={filters.capacity}
                  onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small (1-10)</option>
                  <option value="medium">Medium (11-50)</option>
                  <option value="large">Large (51+)</option>
                </select>
              </div>

              {/* Comfort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Comfort Level</label>
                <select
                  value={filters.comfort}
                  onChange={(e) => setFilters(prev => ({ ...prev, comfort: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                >
                  <option value="all">All Levels</option>
                  <option value="basic">Basic (1-5 ⭐)</option>
                  <option value="premium">Premium (6-8 ⭐)</option>
                  <option value="luxury">Luxury (9-10 ⭐)</option>
                </select>
              </div>

              {/* Features Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {['wifi', 'restaurant', 'gym', 'spa', 'entertainment', 'cryosleep'].map(feature => (
                    <button
                      key={feature}
                      onClick={() => toggleFeatureFilter(feature)}
                      className={`px-2 py-1 rounded text-xs transition-all duration-300 ${
                        filters.features.includes(feature)
                          ? 'bg-neon-blue text-black'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {getFeatureIcon(feature)} {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Spaceships Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSpaceships.map((ship, index) => (
            <motion.div
              key={ship.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-gray-600 hover:border-neon-blue/50 transition-all duration-300"
            >
              {/* Ship Image */}
              <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 p-8 flex items-center justify-center">
                <Rocket className="w-16 h-16 text-neon-blue group-hover:text-neon-purple transition-colors duration-300" />
              </div>

              {/* Ship Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{ship.name}</h3>
                    <p className="text-sm text-gray-400">{ship.manufacturer}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < ship.comfortLevel ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Comfort</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{ship.description}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <Users className="w-4 h-4 text-neon-blue mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Capacity</p>
                    <p className="text-sm font-semibold text-white">{ship.capacity}</p>
                  </div>
                  <div className="text-center">
                    <Gauge className="w-4 h-4 text-neon-purple mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Speed</p>
                    <p className="text-sm font-semibold text-white">{ship.maxSpeed?.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-4 h-4 text-green-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Safety</p>
                    <p className="text-sm font-semibold text-white">{ship.safetyRating}/10</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {Object.entries(ship.features).slice(0, 4).map(([feature, available]) => (
                    <span
                      key={feature}
                      className={`px-2 py-1 text-xs rounded-full ${
                        available 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {available ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <X className="w-3 h-3 inline mr-1" />}
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Cost and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Cost Multiplier</p>
                    <p className="text-lg font-bold text-neon-blue">{ship.costMultiplier}x</p>
                  </div>
                  <Link
                    to={`/spaceship/${ship.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:from-neon-blue/80 hover:to-neon-purple/80 transition-all duration-300 text-sm font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredSpaceships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Spaceships Found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Spaceships
