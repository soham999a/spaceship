import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Map,
  Zap,
  Target,
  Compass,
  Search,
  Filter,
  Settings,
  Maximize,
  RotateCcw,
  Info,
  Navigation,
  Globe,
  Star,
  Rocket
} from 'lucide-react'

const GalaxyMap = () => {
  const { allPlanets } = useSelector(state => state.planets)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [scanMode, setScanMode] = useState(false)

  // Elite Dangerous style control panel
  const ControlPanel = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: showControls ? 0 : -280 }}
      className="fixed left-0 top-20 bottom-0 w-80 bg-cosmic-dark/95 backdrop-blur-xl border-r-2 border-neon-blue/30 z-40 elite-control-panel"
    >
      {/* Control panel header */}
      <div className="p-6 border-b border-neon-blue/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white font-space tracking-wider">
            GALAXY MAP
          </h2>
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2 text-neon-blue hover:text-neon-orange transition-colors elite-action-btn"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-neon-blue font-bold tracking-wider">
          NAVIGATION SYSTEM ONLINE
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-6">
        {/* Zoom Control */}
        <div className="elite-control-group">
          <label className="block text-neon-orange font-bold text-sm mb-2 tracking-wider uppercase">
            Zoom Level
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="flex-1 elite-slider"
            />
            <span className="text-neon-blue font-bold text-sm w-12">
              {zoomLevel.toFixed(1)}x
            </span>
          </div>
        </div>

        {/* Rotation Speed */}
        <div className="elite-control-group">
          <label className="block text-neon-purple font-bold text-sm mb-2 tracking-wider uppercase">
            Rotation Speed
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="flex-1 elite-slider"
            />
            <span className="text-neon-purple font-bold text-sm w-12">
              {rotationSpeed.toFixed(1)}x
            </span>
          </div>
        </div>

        {/* Scan Mode Toggle */}
        <div className="elite-control-group">
          <button
            onClick={() => setScanMode(!scanMode)}
            className={`w-full p-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
              scanMode
                ? 'bg-neon-green/20 text-neon-green border-2 border-neon-green'
                : 'bg-white/5 text-gray-300 border-2 border-gray-600 hover:border-neon-green/50'
            } elite-button-outline`}
          >
            <Target className="w-5 h-5 inline-block mr-2" />
            {scanMode ? 'SCANNING ACTIVE' : 'ACTIVATE SCANNER'}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="elite-control-group">
          <label className="block text-white font-bold text-sm mb-3 tracking-wider uppercase">
            Quick Actions
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-white/5 border border-gray-600 hover:border-neon-blue/50 text-gray-300 hover:text-neon-blue transition-all duration-300 elite-action-btn">
              <RotateCcw className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-bold">RESET</span>
            </button>
            <button className="p-3 bg-white/5 border border-gray-600 hover:border-neon-orange/50 text-gray-300 hover:text-neon-orange transition-all duration-300 elite-action-btn">
              <Maximize className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-bold">FULLSCREEN</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden bg-cosmic-dark">
      {/* Elite Dangerous style background */}
      <div className="absolute inset-0">
        <div className="stars opacity-20"></div>
        <div className="stars2 opacity-15"></div>
        <div className="stars3 opacity-10"></div>
      </div>

      {/* Control Panel */}
      <ControlPanel />

      {/* Main Galaxy Map Area */}
      <div className={`transition-all duration-500 ${showControls ? 'ml-80' : 'ml-0'}`}>
        {/* Top HUD Bar */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="relative z-30 p-6 bg-cosmic-dark/90 backdrop-blur-xl border-b border-neon-blue/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white font-space tracking-wider">
                    GALAXY MAP
                  </h1>
                  <p className="text-sm text-neon-blue font-bold">
                    NAVIGATION SYSTEM
                  </p>
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-neon-green text-sm font-bold">ONLINE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                  <span className="text-neon-blue text-sm font-bold">{allPlanets.length} SYSTEMS</span>
                </div>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-3 text-neon-blue hover:text-neon-orange transition-colors elite-action-btn"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-3 text-neon-purple hover:text-neon-pink transition-colors elite-action-btn">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Galaxy Visualization */}
        <div className="relative h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-purple/20 to-cosmic-dark">
          {/* Elite style grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}></div>
          </div>

          {/* Central Galaxy Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
                scale: zoomLevel
              }}
              transition={{
                rotate: { duration: 60 / rotationSpeed, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5 }
              }}
              className="relative w-96 h-96"
            >
              {/* Galaxy spiral arms */}
              <div className="absolute inset-0 rounded-full border-4 border-neon-blue/30 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full border-2 border-neon-purple/40"></div>
              <div className="absolute inset-8 rounded-full border-2 border-neon-orange/30"></div>

              {/* Central core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-neon-orange via-neon-pink to-neon-purple rounded-full animate-pulse"></div>

              {/* Planet positions */}
              {allPlanets.slice(0, 12).map((planet, index) => {
                const angle = (index * 30) * (Math.PI / 180)
                const radius = 120 + (index % 3) * 40
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.div
                    key={planet.id}
                    className="absolute w-4 h-4 cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    whileHover={{ scale: 2 }}
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    <div className={`w-full h-full rounded-full ${
                      selectedPlanet?.id === planet.id
                        ? 'bg-neon-orange animate-pulse'
                        : 'bg-neon-blue hover:bg-neon-green'
                    } transition-colors duration-300`}></div>

                    {/* Planet label */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {planet.name}
                    </div>

                    {/* Scanning effect */}
                    {scanMode && (
                      <div className="absolute inset-0 border-2 border-neon-green rounded-full animate-ping"></div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Elite style crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-8 h-8 border-2 border-neon-blue rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-neon-blue rounded-full"></div>
          </div>

          {/* Scanning overlay */}
          {scanMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-neon-green/5 pointer-events-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/10 to-transparent animate-pulse"></div>
            </motion.div>
          )}
        </div>

        {/* Planet Details Panel */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed right-0 top-20 bottom-0 w-96 bg-cosmic-dark/95 backdrop-blur-xl border-l-2 border-neon-orange/30 z-40 elite-detail-panel"
            >
              <div className="p-6 border-b border-neon-orange/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-white font-space tracking-wider">
                    SYSTEM DATA
                  </h3>
                  <button
                    onClick={() => setSelectedPlanet(null)}
                    className="p-2 text-neon-orange hover:text-neon-pink transition-colors elite-action-btn"
                  >
                    ×
                  </button>
                </div>
                <div className="text-sm text-neon-orange font-bold tracking-wider">
                  {selectedPlanet.name.toUpperCase()}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Planet visualization */}
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center"
                  >
                    <Globe className="w-12 h-12 text-white" />
                  </motion.div>
                </div>

                {/* System stats */}
                <div className="space-y-4">
                  <div className="elite-stat-item">
                    <span className="text-neon-blue font-bold text-sm">DISTANCE:</span>
                    <span className="text-white font-bold">{selectedPlanet.distance} LY</span>
                  </div>
                  <div className="elite-stat-item">
                    <span className="text-neon-green font-bold text-sm">STATUS:</span>
                    <span className="text-neon-green font-bold">HABITABLE</span>
                  </div>
                  <div className="elite-stat-item">
                    <span className="text-neon-purple font-bold text-sm">TYPE:</span>
                    <span className="text-white font-bold">TERRESTRIAL</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-neon-orange font-bold text-sm mb-2 tracking-wider uppercase">
                    System Description
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedPlanet.description}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Link
                    to={`/planet/${selectedPlanet.id}`}
                    className="block w-full p-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-center transition-all duration-300 hover:from-neon-purple hover:to-neon-pink elite-button"
                  >
                    <Info className="w-5 h-5 inline-block mr-2" />
                    VIEW DETAILS
                  </Link>
                  <Link
                    to="/booking"
                    className="block w-full p-3 border-2 border-neon-orange text-neon-orange font-bold text-center transition-all duration-300 hover:bg-neon-orange hover:text-cosmic-dark elite-button-outline"
                  >
                    <Rocket className="w-5 h-5 inline-block mr-2" />
                    BOOK EXPEDITION
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )

export default GalaxyMap
