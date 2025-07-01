import React from 'react'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

const LoadingScreen = ({ message = "Preparing for launch..." }) => {
  return (
    <div className="fixed inset-0 bg-cosmic-dark flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Rocket */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative">
            <Rocket className="w-16 h-16 text-neon-blue mx-auto" />
            
            {/* Rocket exhaust */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-4 h-8 bg-gradient-to-t from-neon-orange via-neon-pink to-transparent rounded-full blur-sm"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-bold text-white font-space mb-4"
        >
          {message}
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-neon-blue rounded-full"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: [-256, 256] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-full w-16 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
