import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Rocket,
  Users,
  Gauge,
  Fuel,
  Star,
  Shield,
  Calendar,
  CheckCircle,
  X,
  Wifi,
  Utensils,
  Dumbbell,
  Sparkles,
  Monitor,
  Bed,
  Zap,
  Radio,
  AlertTriangle,
  Award,
  Clock,
  MapPin,
  Wrench,
  Activity,
  Target,
  Atom,
  Layers,
  Compass,
  Thermometer,
  Battery,
  Satellite
} from 'lucide-react'
import { setSpaceship } from '../store/slices/bookingSlice'

const SpaceshipDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { availableSpaceships } = useSelector(state => state.spaceship)
  const { currentBooking } = useSelector(state => state.booking)
  
  const [selectedImage, setSelectedImage] = useState(0)
  
  const spaceship = availableSpaceships.find(ship => ship.id === id)
  
  useEffect(() => {
    if (!spaceship) {
      navigate('/spaceships')
    }
  }, [spaceship, navigate])

  if (!spaceship) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Spaceship Not Found</h2>
          <p className="text-gray-400">The spaceship you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleSelectSpaceship = () => {
    dispatch(setSpaceship(spaceship))
    navigate('/booking')
  }

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case 'wifi': return <Wifi className="w-5 h-5" />
      case 'restaurant': return <Utensils className="w-5 h-5" />
      case 'gym': return <Dumbbell className="w-5 h-5" />
      case 'spa': return <Sparkles className="w-5 h-5" />
      case 'entertainment': return <Monitor className="w-5 h-5" />
      case 'cryosleep': return <Bed className="w-5 h-5" />
      default: return <CheckCircle className="w-5 h-5" />
    }
  }

  const images = [
    spaceship.image,
    '/images/spaceship-interior-1.jpg',
    '/images/spaceship-interior-2.jpg',
    '/images/spaceship-exterior.jpg'
  ]

  return (
    <div className="min-h-screen pt-16 bg-space-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-w-16 aspect-h-10 rounded-2xl overflow-hidden bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
              <div className="w-full h-96 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                <Rocket className="w-24 h-24 text-neon-blue" />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? 'border-neon-blue' : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-neon-blue" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                  ✓ CERTIFIED OPERATIONAL
                </div>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                  {spaceship.certification}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white font-space mb-2">
                {spaceship.name}
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                {spaceship.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">by {spaceship.manufacturer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Built {spaceship.yearBuilt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">{spaceship.totalFlightHours?.toLocaleString()} flight hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400">{spaceship.successfulMissions} missions</span>
                </div>
              </div>

              {/* Real-time Status */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Activity className="w-5 h-5 text-green-400 mr-2" />
                  Real-Time Status
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-green-400 font-bold">READY</div>
                    <div className="text-xs text-gray-400">Operational Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">DOCKED</div>
                    <div className="text-xs text-gray-400">Current Location</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">{spaceship.lastMaintenance}</div>
                    <div className="text-xs text-gray-400">Last Maintenance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold">AVAILABLE</div>
                    <div className="text-xs text-gray-400">Booking Status</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Rocket className="w-5 h-5 text-neon-blue mr-2" />
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-neon-blue mr-2" />
                    <span className="text-sm text-gray-400">Passenger Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{spaceship.capacity}</p>
                  <p className="text-sm text-gray-400">maximum occupancy</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Gauge className="w-5 h-5 text-neon-purple mr-2" />
                    <span className="text-sm text-gray-400">Maximum Velocity</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{spaceship.maxSpeed?.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">km/h sublight</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm text-gray-400">Safety Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{spaceship.safetyRating}/10</p>
                  <p className="text-sm text-gray-400">ISA certified</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-sm text-gray-400">Comfort Rating</span>
                  </div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < spaceship.comfortLevel ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">{spaceship.comfortLevel}/10 luxury</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Layers className="w-5 h-5 text-orange-400 mr-2" />
                    <span className="text-sm text-gray-400">Vessel Mass</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{spaceship.technicalSpecs?.mass}</p>
                  <p className="text-sm text-gray-400">dry weight</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="text-sm text-gray-400">Operational Range</span>
                  </div>
                  <p className="text-xl font-bold text-white">{spaceship.technicalSpecs?.operationalRange}</p>
                  <p className="text-sm text-gray-400">maximum distance</p>
                </div>
              </div>

              {/* Propulsion System */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600 mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                  Propulsion & Power Systems
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Engine Type:</span>
                        <span className="text-white font-semibold">{spaceship.engineType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Thrust Output:</span>
                        <span className="text-white font-semibold">{spaceship.thrust}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Specific Impulse:</span>
                        <span className="text-white font-semibold">{spaceship.specificImpulse}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delta-V Capability:</span>
                        <span className="text-white font-semibold">{spaceship.deltaV}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fuel Type:</span>
                        <span className="text-white font-semibold">{spaceship.fuelType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Power Generation:</span>
                        <span className="text-white font-semibold">{spaceship.technicalSpecs?.powerGeneration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fuel Capacity:</span>
                        <span className="text-white font-semibold">{spaceship.technicalSpecs?.fuelCapacity}</span>
                      </div>
                      {spaceship.warpCapable && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Warp Capability:</span>
                          <span className="text-green-400 font-semibold">✓ {spaceship.warpFactor}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Life Support & Safety Systems */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600 mb-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 text-green-400 mr-2" />
                Life Support & Safety Systems
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Life Support:</span>
                      <span className="text-white font-semibold">{spaceship.lifeSupport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Radiation Shielding:</span>
                      <span className="text-white font-semibold">{spaceship.radiationShielding}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gravity Generation:</span>
                      <span className="text-white font-semibold">{spaceship.gravityGeneration}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Emergency Escape:</span>
                      <span className="text-white font-semibold">{spaceship.emergencyEscape}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Communication Range:</span>
                      <span className="text-white font-semibold">{spaceship.technicalSpecs?.communicationRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cargo Capacity:</span>
                      <span className="text-white font-semibold">{spaceship.technicalSpecs?.cargoCapacity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Crew Requirements */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600 mb-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                Crew Requirements & Certifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Required Certifications:</h5>
                  <div className="space-y-2">
                    {Object.entries(spaceship.crewRequirements).filter(([key]) => !key.includes('Crew')).map(([role, requirement]) => (
                      <div key={role} className="flex items-start space-x-2">
                        <Award className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <div>
                          <span className="text-blue-400 font-semibold capitalize">{role}:</span>
                          <span className="text-gray-300 ml-2">{requirement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Crew Size:</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Minimum Crew:</span>
                      <span className="text-white font-semibold">{spaceship.crewRequirements?.minimumCrew} personnel</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Maximum Crew:</span>
                      <span className="text-white font-semibold">{spaceship.crewRequirements?.maximumCrew} personnel</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Passenger/Crew Ratio:</span>
                      <span className="text-white font-semibold">{Math.round(spaceship.capacity / spaceship.crewRequirements?.maximumCrew)}:1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                Onboard Features & Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {Object.entries(spaceship.features).map(([feature, available]) => (
                  <div
                    key={feature}
                    className={`flex items-center p-3 rounded-lg border transition-all duration-300 ${
                      available
                        ? 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}
                  >
                    {available ? getFeatureIcon(feature) : <X className="w-5 h-5" />}
                    <span className="ml-2 capitalize font-medium">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>

              {/* Premium Amenities List */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-4">Premium Amenities Included:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {spaceship.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Warp Capabilities (if applicable) */}
            {spaceship.warpCapable && spaceship.warpCapabilities && (
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 border border-purple-500/30 mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Atom className="w-5 h-5 text-purple-400 mr-2" />
                  Faster-Than-Light Capabilities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Maximum Warp Factor:</span>
                        <span className="text-purple-400 font-semibold">{spaceship.warpCapabilities.maxWarpFactor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Warp Range:</span>
                        <span className="text-purple-400 font-semibold">{spaceship.warpCapabilities.warpRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Maximum Warp Duration:</span>
                        <span className="text-purple-400 font-semibold">{spaceship.warpCapabilities.warpDuration}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cooldown Period:</span>
                        <span className="text-purple-400 font-semibold">{spaceship.warpCapabilities.cooldownPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Navigation Accuracy:</span>
                        <span className="text-purple-400 font-semibold">{spaceship.warpCapabilities.navigationAccuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Warp Drive Type:</span>
                        <span className="text-purple-400 font-semibold">{spaceship.warpFactor}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-purple-300 text-sm">
                    ⚠️ <strong>FTL Travel Notice:</strong> Faster-than-light travel requires special licensing and medical clearance.
                    Passengers must complete pre-flight preparation including temporal displacement orientation.
                  </p>
                </div>
              </div>
            )}

            {/* Luxury Features (if applicable) */}
            {spaceship.luxuryFeatures && (
              <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-lg p-6 border border-yellow-500/30 mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  Luxury Experience Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-3">Accommodation Types:</h5>
                    <div className="space-y-2">
                      {spaceship.luxuryFeatures.suiteTypes?.map((suite, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Bed className="w-4 h-4 text-yellow-400 mr-2" />
                          {suite}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-3">Dining Options:</h5>
                    <div className="space-y-2">
                      {spaceship.luxuryFeatures.diningOptions?.map((dining, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Utensils className="w-4 h-4 text-yellow-400 mr-2" />
                          {dining}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-3">Entertainment:</h5>
                    <div className="space-y-2">
                      {spaceship.luxuryFeatures.entertainment?.map((ent, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Monitor className="w-4 h-4 text-yellow-400 mr-2" />
                          {ent}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-3">Wellness & Spa:</h5>
                    <div className="space-y-2">
                      {spaceship.luxuryFeatures.wellness?.map((wellness, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                          {wellness}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Adventure Features (if applicable) */}
            {spaceship.adventureFeatures && (
              <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg p-6 border border-orange-500/30 mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 text-orange-400 mr-2" />
                  Adventure Experience Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-orange-400 font-semibold mb-3">Adventure Experiences:</h5>
                    <div className="space-y-2">
                      {spaceship.adventureFeatures.experiences?.map((exp, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Target className="w-4 h-4 text-orange-400 mr-2" />
                          {exp}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-orange-400 font-semibold mb-3">Authenticity Features:</h5>
                    <div className="space-y-2">
                      {spaceship.adventureFeatures.authenticity?.map((auth, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Award className="w-4 h-4 text-orange-400 mr-2" />
                          {auth}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-orange-400 font-semibold mb-3">Safety Upgrades:</h5>
                    <div className="space-y-2">
                      {spaceship.adventureFeatures.safety?.map((safety, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Shield className="w-4 h-4 text-orange-400 mr-2" />
                          {safety}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4">Pricing</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Cost Multiplier</p>
                  <p className="text-3xl font-bold text-neon-blue">{spaceship.costMultiplier}x</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Fuel Type</p>
                  <p className="text-lg text-white">{spaceship.fuelType}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSelectSpaceship}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                currentBooking.spaceship?.id === spaceship.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:from-neon-blue/80 hover:to-neon-purple/80'
              }`}
            >
              {currentBooking.spaceship?.id === spaceship.id ? (
                <>
                  <CheckCircle className="w-6 h-6 inline mr-2" />
                  Selected for Booking
                </>
              ) : (
                <>
                  <Rocket className="w-6 h-6 inline mr-2" />
                  Select This Spaceship
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SpaceshipDetails
