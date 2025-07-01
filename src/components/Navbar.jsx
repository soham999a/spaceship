import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Globe, 
  Map, 
  Calendar, 
  Menu, 
  Settings,
  User,
  Search
} from 'lucide-react'
import { toggleSidebar } from '../store/slices/uiSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { sidebarOpen } = useSelector(state => state.ui)

  const navItems = [
    { path: '/', label: 'Home', icon: Rocket },
    { path: '/destinations', label: 'Destinations', icon: Globe },
    { path: '/spaceships', label: 'Spaceships', icon: Rocket },
    { path: '/galaxy-map', label: 'Galaxy Map', icon: Map },
    { path: '/booking', label: 'Booking', icon: Calendar },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark/95 backdrop-blur-xl border-b-2 border-neon-blue/30 elite-nav"
    >
      {/* Elite Dangerous style top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-orange to-neon-purple"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Elite Dangerous Style Logo */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            {/* Hexagonal logo container */}
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple elite-hexagon flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 border-2 border-neon-orange elite-hexagon animate-spin-slow opacity-60"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white font-space tracking-wider elite-text">
                SPACE TOURISM
              </h1>
              <p className="text-sm text-neon-blue font-bold tracking-widest">PORTAL 2090</p>
            </div>
          </motion.div>

          {/* Elite Dangerous Style Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-3 px-6 py-3 elite-nav-item transition-all duration-500 ${
                      isActive(item.path)
                        ? 'text-neon-blue bg-neon-blue/10 border-neon-blue/50 elite-nav-active'
                        : 'text-gray-300 hover:text-neon-orange hover:bg-neon-orange/5 border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-bold text-sm tracking-wider uppercase">{item.label}</span>

                    {/* Elite style active indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-orange"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Elite Style Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-300 hover:text-neon-blue transition-all duration-300 elite-action-btn"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-300 hover:text-neon-purple transition-all duration-300 elite-action-btn"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* User Profile - Elite style */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3 text-gray-300 hover:text-neon-green transition-all duration-300 elite-action-btn"
            >
              <User className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            </motion.button>

            {/* Elite style divider */}
            <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleSidebar())}
              className="md:hidden p-3 text-gray-300 hover:text-neon-blue transition-all duration-300 elite-action-btn"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <motion.div
        initial={false}
        animate={{ height: sidebarOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-cosmic-darker/95 backdrop-blur-lg border-t border-neon-blue/20"
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => dispatch(toggleSidebar())}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-neon-blue bg-neon-blue/10 border border-neon-blue/30'
                    : 'text-gray-300 hover:text-neon-blue hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
