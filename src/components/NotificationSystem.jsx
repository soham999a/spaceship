import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { removeNotification } from '../store/slices/uiSlice'

const NotificationSystem = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.ui)

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return CheckCircle
      case 'error':
        return AlertCircle
      case 'warning':
        return AlertTriangle
      default:
        return Info
    }
  }

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'from-green-500/20 to-green-600/20 border-green-500/50 text-green-400'
      case 'error':
        return 'from-red-500/20 to-red-600/20 border-red-500/50 text-red-400'
      case 'warning':
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 text-yellow-400'
      default:
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/50 text-blue-400'
    }
  }

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration > 0) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id))
        }, notification.duration)

        return () => clearTimeout(timer)
      }
    })
  }, [notifications, dispatch])

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type)
          const colors = getColors(notification.type)

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`p-4 rounded-lg backdrop-blur-lg border bg-gradient-to-r ${colors} shadow-lg`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    {notification.message}
                  </p>
                  {notification.timestamp && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(removeNotification(notification.id))}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem
