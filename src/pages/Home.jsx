import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Globe, 
  Star, 
  ArrowRight, 
  Play,
  Zap,
  Shield,
  Heart
} from 'lucide-react'
import { addNotification } from '../store/slices/uiSlice'
import { fetchAPOD } from '../services/nasaApi'

const Home = () => {
  const dispatch = useDispatch()
  const { allPlanets, loading } = useSelector(state => state.planets)
  const [apodData, setApodData] = useState(null)

  useEffect(() => {
    // Fetch Astronomy Picture of the Day
    fetchAPOD().then(data => {
      if (data) {
        setApodData(data)
      }
    })

    // Welcome notification
    dispatch(addNotification({
      type: 'success',
      message: 'Welcome to Space Tourism Portal 2090! 🚀',
      duration: 5000
    }))
  }, [dispatch])

  const features = [
    {
      icon: Globe,
      title: '100+ Destinations',
      description: 'Explore real NASA exoplanets and fictional worlds',
      color: 'text-neon-blue'
    },
    {
      icon: Rocket,
      title: 'Advanced Spaceships',
      description: 'Choose from 5 different spacecraft with unique capabilities',
      color: 'text-neon-purple'
    },
    {
      icon: Zap,
      title: 'Real-Time Calculations',
      description: 'Accurate travel times based on distance and ship speed',
      color: 'text-neon-orange'
    },
    {
      icon: Shield,
      title: 'Safe Travel',
      description: 'All destinations rated for safety and accessibility',
      color: 'text-neon-green'
    }
  ]

  const popularDestinations = allPlanets.slice(0, 3)

  return (
    <div className="min-h-screen pt-16">
      {/* EPIC CINEMATIC HERO SECTION - Elite Dangerous Style */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          >
            <source src="https://cdn.pixabay.com/video/2022/12/11/142793-779962094_large.mp4" type="video/mp4" />
            {/* Fallback gradient */}
            <div className="w-full h-full bg-gradient-to-br from-cosmic-dark via-neon-blue/20 to-neon-purple/20"></div>
          </video>
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Animated particles overlay */}
        <div className="absolute inset-0 z-20">
          <div className="particles-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-30 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Elite Dangerous style logo/emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-neon-blue rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border-2 border-neon-orange rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white font-space mb-6 leading-none"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple neon-text">
              SPACE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-pink to-white neon-text">
              TOURISM
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl text-neon-blue font-normal mt-4 tracking-widest">
              PORTAL 2090
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Leave your mark on the galaxy. Explore 400 billion star systems.
            <span className="block text-neon-blue font-medium mt-2">
              The ultimate space tourism experience awaits.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/destinations"
              className="group relative px-12 py-5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-bold text-xl rounded-lg hover:scale-105 transition-all duration-500 neon-glow-intense elite-button flex items-center space-x-3"
            >
              <span>EXPLORE GALAXY</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>

            <Link
              to="/galaxy-map"
              className="group relative px-12 py-5 border-3 border-neon-orange text-neon-orange font-bold text-xl rounded-lg hover:bg-neon-orange hover:text-cosmic-dark hover:scale-105 transition-all duration-500 elite-button-outline flex items-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span>WATCH TRAILER</span>
            </Link>

            <Link
              to="/booking"
              className="group relative px-12 py-5 bg-transparent border-3 border-white text-white font-bold text-xl rounded-lg hover:bg-white hover:text-cosmic-dark hover:scale-105 transition-all duration-500 elite-button-ghost flex items-center space-x-3"
            >
              <Rocket className="w-6 h-6" />
              <span>BOOK NOW</span>
            </Link>
          </motion.div>

          {/* Elite Dangerous style stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-blue mb-2">400B+</div>
              <div className="text-gray-300 uppercase tracking-wide">Star Systems</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-orange mb-2">100+</div>
              <div className="text-gray-300 uppercase tracking-wide">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-purple mb-2">∞</div>
              <div className="text-gray-300 uppercase tracking-wide">Adventures</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-white text-sm mt-2 text-center">Scroll to explore</p>
        </motion.div>
      </section>

      {/* Elite Dangerous Style Features Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark via-cosmic-darker to-cosmic-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-purple/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-orange mx-auto mb-4"></div>
              <h2 className="text-5xl md:text-6xl font-black text-white font-space mb-6 elite-text">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-orange">
                  ELITE FEATURES
                </span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-neon-orange to-neon-blue mx-auto"></div>
            </div>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Experience the most advanced space travel technology in the galaxy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative elite-feature-card"
                >
                  {/* Card background with Elite styling */}
                  <div className="relative p-8 h-full bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border-2 border-gray-600 hover:border-neon-blue/70 transition-all duration-500 elite-card">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-orange"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-purple"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-pink"></div>

                    {/* Icon with Elite styling */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cosmic-dark to-cosmic-purple rounded-full flex items-center justify-center border-2 border-current group-hover:animate-pulse">
                        <Icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full border-2 border-current animate-spin-slow opacity-30"></div>
                    </div>

                    <h3 className="text-xl font-black text-white mb-4 font-space tracking-wider uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Elite Dangerous Style Popular Destinations */}
      {popularDestinations.length > 0 && (
        <section className="py-32 relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center mb-20"
            >
              <div className="inline-block mb-6">
                <div className="w-20 h-1 bg-gradient-to-r from-neon-orange to-neon-pink mx-auto mb-4"></div>
                <h2 className="text-5xl md:text-6xl font-black text-white font-space mb-6 elite-text">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-white to-neon-pink">
                    ELITE DESTINATIONS
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-neon-pink to-neon-orange mx-auto"></div>
              </div>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                Explore the most dangerous and rewarding systems in the galaxy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {popularDestinations.map((planet, index) => (
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, y: 100, rotateY: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative elite-destination-card"
                >
                  <div className="relative overflow-hidden elite-card h-full">
                    {/* Elite style header with planet visualization */}
                    <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-orange/20 flex items-center justify-center overflow-hidden">
                      {/* Animated planet */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="relative"
                      >
                        <Globe className="w-20 h-20 text-neon-blue group-hover:text-neon-orange transition-colors duration-500" />
                        <div className="absolute inset-0 w-20 h-20 border-2 border-neon-purple rounded-full animate-pulse"></div>
                      </motion.div>

                      {/* Scanning lines effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent animate-pulse"></div>

                      {/* Elite corner brackets */}
                      <div className="absolute top-2 left-2 w-8 h-8 border-t-3 border-l-3 border-neon-blue"></div>
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-3 border-r-3 border-neon-orange"></div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-3 border-l-3 border-neon-purple"></div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-3 border-r-3 border-neon-pink"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-white mb-4 font-space tracking-wider uppercase group-hover:text-neon-blue transition-colors duration-300">
                        {planet.name}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed line-clamp-2">
                        {planet.description}
                      </p>

                      {/* Elite style stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                          <span className="text-neon-blue font-bold text-sm tracking-wider uppercase">
                            {planet.distance} LY
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                          <span className="text-neon-green font-bold text-sm tracking-wider uppercase">
                            SAFE
                          </span>
                        </div>
                      </div>

                      {/* Elite action button */}
                      <Link
                        to={`/planet/${planet.id}`}
                        className="group/btn relative w-full px-6 py-3 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border-2 border-neon-blue text-neon-blue font-bold text-center block transition-all duration-500 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white elite-button-outline"
                      >
                        <span className="relative z-10 tracking-wider uppercase">EXPLORE SYSTEM</span>
                        <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NASA APOD Section */}
      {apodData && (
        <section className="py-20 bg-cosmic-darker/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white font-space mb-4">
                NASA Astronomy Picture of the Day
              </h2>
              <p className="text-xl text-gray-300">
                Discover the wonders of the universe
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{apodData.title}</h3>
                <p className="text-gray-300 mb-6">{apodData.explanation}</p>
                <p className="text-sm text-neon-blue">
                  Date: {apodData.date}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Elite Dangerous Style CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Epic background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark via-cosmic-purple to-cosmic-dark"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-transparent to-neon-orange/10 animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Elite style container */}
            <div className="relative p-16 elite-cta-container">
              {/* Animated star field background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="stars opacity-30"></div>
                <div className="stars2 opacity-20"></div>
              </div>

              {/* Elite corner decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-neon-blue"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-neon-orange"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-neon-purple"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-neon-pink"></div>

              {/* Central icon with Elite styling */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="relative w-24 h-24 mx-auto mb-8"
              >
                <div className="absolute inset-0 border-4 border-neon-orange rounded-full"></div>
                <div className="absolute inset-2 border-2 border-neon-blue rounded-full animate-spin-reverse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-neon-blue to-neon-orange rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white animate-pulse" />
                </div>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black text-white font-space mb-8 elite-text">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-orange">
                  JOIN THE ELITE
                </span>
              </h2>

              <p className="text-2xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
                Become a Commander. Explore the galaxy.
                <span className="block text-neon-orange font-bold mt-2">
                  Leave your mark on the stars.
                </span>
              </p>

              {/* Elite style action buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/destinations"
                  className="group relative px-12 py-5 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple text-white font-black text-xl rounded-lg hover:scale-110 transition-all duration-500 neon-glow-intense elite-button flex items-center space-x-3"
                >
                  <Heart className="w-6 h-6 group-hover:animate-pulse" />
                  <span className="tracking-wider uppercase">BOOK EXPEDITION</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>

                <Link
                  to="/galaxy-map"
                  className="group relative px-12 py-5 border-3 border-neon-blue text-neon-blue font-black text-xl rounded-lg hover:bg-neon-blue hover:text-cosmic-dark hover:scale-110 transition-all duration-500 elite-button-outline flex items-center space-x-3"
                >
                  <Globe className="w-6 h-6" />
                  <span className="tracking-wider uppercase">EXPLORE GALAXY</span>
                </Link>
              </div>

              {/* Elite stats */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-neon-blue mb-2">10,000+</div>
                  <div className="text-gray-300 uppercase tracking-wide font-bold">Elite Commanders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-neon-orange mb-2">∞</div>
                  <div className="text-gray-300 uppercase tracking-wide font-bold">Possibilities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-neon-purple mb-2">2090</div>
                  <div className="text-gray-300 uppercase tracking-wide font-bold">The Future</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
