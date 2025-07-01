import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

const PlanetDetails = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Globe className="w-24 h-24 text-neon-blue mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white font-space mb-4">
            Planet Details
          </h1>
          <p className="text-xl text-gray-300">
            Detailed view for planet: {id}
          </p>
          <p className="text-gray-400 mt-4">
            This page will show 3D planet models, detailed information, and booking options.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PlanetDetails
