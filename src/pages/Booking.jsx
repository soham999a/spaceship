import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Users,
  MapPin,
  Rocket,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  User,
  Mail,
  Phone,
  Home,
  Briefcase,
  Heart,
  Baby,
  Mountain,
  Droplets
} from 'lucide-react'
import {
  updateBookingDetails,
  setDestination,
  setSpaceship,
  addActivity,
  removeActivity,
  calculateTotalCost,
  calculateTravelTime,
  confirmBooking,
  generatePackingList
} from '../store/slices/bookingSlice'

const Booking = () => {
  const dispatch = useDispatch()
  const { currentBooking, packingList } = useSelector(state => state.booking)
  const { allPlanets } = useSelector(state => state.planets)
  const { availableSpaceships } = useSelector(state => state.spaceship)

  const [currentStep, setCurrentStep] = useState(1)
  const [formErrors, setFormErrors] = useState({})

  const steps = [
    { id: 1, title: 'Traveler Profile', icon: User },
    { id: 2, title: 'Destination Selection', icon: MapPin },
    { id: 3, title: 'Spacecraft Assignment', icon: Rocket },
    { id: 4, title: 'Mission Parameters', icon: Calendar },
    { id: 5, title: 'Medical Clearance', icon: Heart },
    { id: 6, title: 'Financial Authorization', icon: CreditCard },
    { id: 7, title: 'Mission Confirmation', icon: CheckCircle }
  ]

  useEffect(() => {
    if (currentBooking.destination && currentBooking.spaceship) {
      dispatch(calculateTotalCost())
      dispatch(calculateTravelTime({
        distance: currentBooking.destination.distance,
        speed: currentBooking.spaceship.maxSpeed
      }))
      dispatch(generatePackingList())
    }
  }, [currentBooking.destination, currentBooking.spaceship, currentBooking.lodging, currentBooking.activities, currentBooking.passengers, dispatch])

  const validateStep = (step) => {
    const errors = {}

    switch (step) {
      case 1:
        if (!currentBooking.travelerName.trim()) errors.travelerName = 'Name is required'
        if (!currentBooking.email.trim()) errors.email = 'Email is required'
        if (!/\S+@\S+\.\S+/.test(currentBooking.email)) errors.email = 'Email is invalid'
        break
      case 2:
        if (!currentBooking.destination) errors.destination = 'Please select a destination'
        break
      case 3:
        if (!currentBooking.spaceship) errors.spaceship = 'Please select a spaceship'
        break
      case 4:
        if (!currentBooking.departureDate) errors.departureDate = 'Departure date is required'
        if (!currentBooking.returnDate) errors.returnDate = 'Return date is required'
        if (new Date(currentBooking.departureDate) <= new Date()) {
          errors.departureDate = 'Departure date must be in the future'
        }
        if (new Date(currentBooking.returnDate) <= new Date(currentBooking.departureDate)) {
          errors.returnDate = 'Return date must be after departure date'
        }
        break
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field, value) => {
    dispatch(updateBookingDetails({ [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleConfirmBooking = () => {
    if (validateStep(5)) {
      dispatch(confirmBooking())
      setCurrentStep(6)
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-space-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white font-space mb-4">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Book Your Journey
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Plan your perfect space adventure with our comprehensive booking system
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                    ${isActive ? 'border-neon-blue bg-neon-blue text-black' :
                      isCompleted ? 'border-green-500 bg-green-500 text-white' :
                      'border-gray-600 bg-gray-800 text-gray-400'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${isActive ? 'text-neon-blue' : isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      hidden sm:block w-16 h-0.5 ml-6 transition-colors duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-600'}
                    `} />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-600 p-8"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  <span className="flex items-center">
                    <User className="w-8 h-8 text-neon-blue mr-3" />
                    Traveler Profile & Certification
                  </span>
                </h2>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 text-sm">
                    <strong>⚠️ SPACE TRAVEL REQUIREMENTS:</strong> All passengers must meet ISA (Interstellar Safety Authority)
                    medical and psychological standards for space travel. Certification process takes 24-48 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={currentBooking.travelerName}
                      onChange={(e) => handleInputChange('travelerName', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                        formErrors.travelerName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                      }`}
                      placeholder="As shown on government ID"
                    />
                    {formErrors.travelerName && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.travelerName}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Must match passport/ID exactly</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={currentBooking.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                        formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                      }`}
                      placeholder="mission.updates@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">For mission updates and emergency contact</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ISA Certification ID
                    </label>
                    <input
                      type="text"
                      value={currentBooking.isaId || ''}
                      onChange={(e) => handleInputChange('isaId', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="ISA-2090-XXXXXXXX (if available)"
                    />
                    <p className="text-xs text-gray-400 mt-1">Leave blank if first-time traveler</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      value={currentBooking.emergencyContact || ''}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="Name and phone number"
                    />
                    <p className="text-xs text-gray-400 mt-1">Required for all space missions</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Trip Type
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'solo', label: 'Solo Adventure', icon: User },
                      { value: 'couple', label: 'Romantic Getaway', icon: Heart },
                      { value: 'family', label: 'Family Trip', icon: Baby }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleInputChange('tripType', value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          currentBooking.tripType === value
                            ? 'border-neon-blue bg-neon-blue/20 text-neon-blue'
                            : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={currentBooking.passengers}
                    onChange={(e) => handleInputChange('passengers', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Destination Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Choose Your Destination</h2>

                {formErrors.destination && (
                  <p className="text-red-400 text-sm">{formErrors.destination}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
                  {allPlanets.map((planet) => (
                    <motion.button
                      key={planet.id}
                      onClick={() => dispatch(setDestination(planet))}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        currentBooking.destination?.id === planet.id
                          ? 'border-neon-blue bg-neon-blue/20'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      }`}
                    >
                      <div className="aspect-w-16 aspect-h-9 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                        {planet.image ? (
                          <img
                            src={planet.image}
                            alt={planet.name}
                            className="w-full h-24 object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-24">
                            <MapPin className="w-8 h-8 text-neon-blue" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">{planet.name}</h3>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{planet.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {planet.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{planet.distance} ly away</span>
                        <span className="text-neon-blue font-semibold">${planet.baseCost?.toLocaleString()}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Spaceship Selection */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Select Your Spaceship</h2>

                {formErrors.spaceship && (
                  <p className="text-red-400 text-sm">{formErrors.spaceship}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableSpaceships.map((ship) => (
                    <motion.button
                      key={ship.id}
                      onClick={() => dispatch(setSpaceship(ship))}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-lg border-2 text-left transition-all duration-300 ${
                        currentBooking.spaceship?.id === ship.id
                          ? 'border-neon-blue bg-neon-blue/20'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                          <Rocket className="w-10 h-10 text-neon-blue" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{ship.name}</h3>
                          <p className="text-sm text-gray-300 mb-3">{ship.description}</p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Capacity:</span>
                              <span className="text-white ml-2">{ship.capacity} passengers</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Speed:</span>
                              <span className="text-white ml-2">{ship.maxSpeed?.toLocaleString()} km/h</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Comfort:</span>
                              <div className="flex items-center ml-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < ship.comfortLevel ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400">Cost Multiplier:</span>
                              <span className="text-neon-blue ml-2">{ship.costMultiplier}x</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Trip Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Trip Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Departure Date *
                    </label>
                    <input
                      type="date"
                      value={currentBooking.departureDate}
                      onChange={(e) => handleInputChange('departureDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                        formErrors.departureDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                      }`}
                    />
                    {formErrors.departureDate && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.departureDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Return Date *
                    </label>
                    <input
                      type="date"
                      value={currentBooking.returnDate}
                      onChange={(e) => handleInputChange('returnDate', e.target.value)}
                      min={currentBooking.departureDate || new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                        formErrors.returnDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                      }`}
                    />
                    {formErrors.returnDate && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.returnDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Accommodation Type
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'tent', label: 'Space Tent', cost: 'Free', icon: Home },
                      { value: 'dome', label: 'Habitat Dome', cost: '+$5,000', icon: Briefcase },
                      { value: 'hotel', label: 'Luxury Hotel', cost: '+$15,000', icon: Star }
                    ].map(({ value, label, cost, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleInputChange('lodging', value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          currentBooking.lodging === value
                            ? 'border-neon-blue bg-neon-blue/20 text-neon-blue'
                            : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-gray-400">{cost}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Activities (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentBooking.destination?.activities?.map((activity) => (
                      <button
                        key={activity}
                        onClick={() => {
                          if (currentBooking.activities.includes(activity)) {
                            dispatch(removeActivity(activity))
                          } else {
                            dispatch(addActivity(activity))
                          }
                        }}
                        className={`p-3 rounded-lg border transition-all duration-300 text-sm ${
                          currentBooking.activities.includes(activity)
                            ? 'border-neon-purple bg-neon-purple/20 text-neon-purple'
                            : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {activity}
                        <span className="block text-xs text-gray-400 mt-1">+$2,000</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {/* Step 5: Medical Clearance */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  <span className="flex items-center">
                    <Heart className="w-8 h-8 text-red-400 mr-3" />
                    Medical Clearance & Safety Protocols
                  </span>
                </h2>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm">
                    <strong>⚠️ MANDATORY MEDICAL SCREENING:</strong> Space travel involves significant physiological stress.
                    All passengers must complete medical evaluation and safety training before departure.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Medical Questionnaire */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Medical History Questionnaire</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Do you have any heart conditions or cardiovascular issues?
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input type="radio" name="heartCondition" value="no" className="mr-2" />
                            <span className="text-white">No</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="heartCondition" value="yes" className="mr-2" />
                            <span className="text-white">Yes</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Have you experienced motion sickness or vertigo?
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input type="radio" name="motionSickness" value="no" className="mr-2" />
                            <span className="text-white">No</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="motionSickness" value="mild" className="mr-2" />
                            <span className="text-white">Mild</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="motionSickness" value="severe" className="mr-2" />
                            <span className="text-white">Severe</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Are you currently taking any medications?
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                          rows="3"
                          placeholder="List all medications, supplements, and dosages..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Emergency Medical Conditions
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                          rows="2"
                          placeholder="Allergies, chronic conditions, emergency procedures..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Safety Protocols */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Safety Protocol Acknowledgment</h3>

                    <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="text-white font-semibold">G-Force Exposure</p>
                          <p className="text-gray-300 text-sm">I understand that space travel involves exposure to forces up to 3.5G during launch and re-entry.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="text-white font-semibold">Radiation Exposure</p>
                          <p className="text-gray-300 text-sm">I acknowledge minimal radiation exposure during space travel and accept associated risks.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="text-white font-semibold">Emergency Procedures</p>
                          <p className="text-gray-300 text-sm">I will complete mandatory 4-hour safety training before departure.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="text-white font-semibold">Medical Emergency</p>
                          <p className="text-gray-300 text-sm">I understand medical facilities in space are limited and consent to emergency procedures.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="text-white font-semibold">Insurance Coverage</p>
                          <p className="text-gray-300 text-sm">I have reviewed and accept the space travel insurance policy terms.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <h4 className="text-yellow-400 font-semibold mb-2">Required Pre-Flight Training</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• 4-hour safety and emergency procedures course</li>
                        <li>• Zero-gravity orientation session</li>
                        <li>• Spacesuit fitting and operation training</li>
                        <li>• Communication systems briefing</li>
                        <li>• Medical emergency response training</li>
                      </ul>
                      <p className="text-yellow-300 text-sm mt-3">
                        Training will be scheduled 48-72 hours before departure at our facility.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Financial Authorization */}
            {currentStep === 6 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Review & Payment</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Booking Summary */}
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Trip Summary</h3>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Traveler:</span>
                          <span className="text-white">{currentBooking.travelerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Destination:</span>
                          <span className="text-white">{currentBooking.destination?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Spaceship:</span>
                          <span className="text-white">{currentBooking.spaceship?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Departure:</span>
                          <span className="text-white">{currentBooking.departureDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Return:</span>
                          <span className="text-white">{currentBooking.returnDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Passengers:</span>
                          <span className="text-white">{currentBooking.passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Travel Time:</span>
                          <span className="text-white">{currentBooking.travelTime} days each way</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-gray-800/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Cost Breakdown</h3>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Base Cost:</span>
                          <span className="text-white">${currentBooking.destination?.baseCost?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Spaceship Multiplier:</span>
                          <span className="text-white">{currentBooking.spaceship?.costMultiplier}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Accommodation:</span>
                          <span className="text-white">
                            {currentBooking.lodging === 'tent' ? 'Free' :
                             currentBooking.lodging === 'dome' ? '$5,000' : '$15,000'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Activities:</span>
                          <span className="text-white">${(currentBooking.activities.length * 2000).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Passengers:</span>
                          <span className="text-white">{currentBooking.passengers}x</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-4">
                          <div className="flex justify-between text-lg font-semibold">
                            <span className="text-white">Total:</span>
                            <span className="text-neon-blue">${currentBooking.totalCost?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Payment Information</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 7: Mission Confirmation */}
            {currentStep === 7 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                </motion.div>

                <h2 className="text-4xl font-bold text-white mb-4">Mission Authorization Complete!</h2>
                <p className="text-xl text-gray-300 mb-6">
                  Your space mission to {currentBooking.destination?.name} has been officially authorized and scheduled.
                </p>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-300 text-sm">
                    <strong>✅ MISSION STATUS:</strong> CONFIRMED - Your spacecraft {currentBooking.spaceship?.name} is being prepared for departure.
                    Mission Control will contact you within 24 hours with detailed pre-flight instructions.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">Mission Timeline</h3>
                  <ul className="text-left space-y-2 text-gray-300">
                    <li>• <strong>T-72 hours:</strong> Medical clearance confirmation</li>
                    <li>• <strong>T-48 hours:</strong> Pre-flight training scheduled</li>
                    <li>• <strong>T-24 hours:</strong> Final mission briefing</li>
                    <li>• <strong>T-4 hours:</strong> Report to launch facility</li>
                    <li>• <strong>T-0:</strong> Mission departure</li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">Mission Control Contact</h3>
                  <div className="text-left space-y-2 text-gray-300">
                    <p><strong>Mission ID:</strong> STP-2090-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                    <p><strong>Launch Facility:</strong> Orbital Station Alpha-7</p>
                    <p><strong>Mission Commander:</strong> Will be assigned 48 hours before departure</p>
                    <p><strong>Emergency Hotline:</strong> +1-800-SPACE-911</p>
                  </div>
                </div>

                {packingList.length > 0 && (
                  <div className="bg-gray-800/50 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold text-white mb-4">Packing List</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                      {packingList.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-between items-center mt-8 pt-6 border-t border-gray-600"
            >
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Step {currentStep} of {steps.length - 1}
                </p>
              </div>

              {currentStep < 6 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-neon-blue text-black rounded-lg hover:bg-neon-blue/80 transition-all duration-300 font-semibold"
                >
                  {currentStep === 5 ? 'Complete Medical Clearance' : 'Next Step'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : currentStep === 6 ? (
                <button
                  onClick={handleConfirmBooking}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:from-neon-blue/80 hover:to-neon-purple/80 transition-all duration-300 font-semibold"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Authorize Payment ${currentBooking.totalCost?.toLocaleString()}
                </button>
              ) : null}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Booking
