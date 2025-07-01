import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    currentBooking: {
      id: null,
      travelerName: '',
      email: '',
      destination: null,
      spaceship: null,
      departureDate: '',
      returnDate: '',
      tripType: 'solo', // solo, couple, family
      lodging: 'dome', // tent, dome, hotel
      activities: [],
      passengers: 1,
      totalCost: 0,
      travelTime: 0, // in days
      status: 'draft', // draft, confirmed, cancelled
    },
    bookingHistory: [],
    packingList: [],
  },
  reducers: {
    updateBookingDetails: (state, action) => {
      state.currentBooking = { ...state.currentBooking, ...action.payload }
    },
    setDestination: (state, action) => {
      state.currentBooking.destination = action.payload
    },
    setSpaceship: (state, action) => {
      state.currentBooking.spaceship = action.payload
    },
    addActivity: (state, action) => {
      if (!state.currentBooking.activities.includes(action.payload)) {
        state.currentBooking.activities.push(action.payload)
      }
    },
    removeActivity: (state, action) => {
      state.currentBooking.activities = state.currentBooking.activities.filter(
        activity => activity !== action.payload
      )
    },
    calculateTotalCost: (state) => {
      const baseCost = state.currentBooking.destination?.baseCost || 10000
      const spaceshipMultiplier = state.currentBooking.spaceship?.costMultiplier || 1
      const lodgingCost = {
        tent: 0,
        dome: 5000,
        hotel: 15000
      }[state.currentBooking.lodging] || 0
      
      const activityCost = state.currentBooking.activities.length * 2000
      const passengerMultiplier = state.currentBooking.passengers
      
      state.currentBooking.totalCost = Math.round(
        (baseCost * spaceshipMultiplier + lodgingCost + activityCost) * passengerMultiplier
      )
    },
    calculateTravelTime: (state, action) => {
      const { distance, speed } = action.payload
      // Convert distance from light years to km, then calculate time in hours, then convert to days
      const distanceKm = distance * 9.461e12 // light years to km
      const timeHours = distanceKm / speed
      const timeDays = Math.round(timeHours / 24)
      state.currentBooking.travelTime = timeDays
    },
    confirmBooking: (state) => {
      const bookingId = uuidv4()
      const confirmedBooking = {
        ...state.currentBooking,
        id: bookingId,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      }
      
      state.bookingHistory.push(confirmedBooking)
      state.currentBooking = {
        id: null,
        travelerName: '',
        email: '',
        destination: null,
        spaceship: null,
        departureDate: '',
        returnDate: '',
        tripType: 'solo',
        lodging: 'dome',
        activities: [],
        passengers: 1,
        totalCost: 0,
        travelTime: 0,
        status: 'draft',
      }
    },
    cancelBooking: (state, action) => {
      const bookingId = action.payload
      const booking = state.bookingHistory.find(b => b.id === bookingId)
      if (booking) {
        booking.status = 'cancelled'
      }
    },
    generatePackingList: (state) => {
      const baseItems = [
        'Space Suit',
        'Oxygen Tanks',
        'Emergency Beacon',
        'Radiation Shield',
        'Gravity Boots',
      ]
      
      const destinationItems = {
        'Has Water': ['Diving Gear', 'Water Purification Tablets'],
        'Cold': ['Thermal Underwear', 'Heat Packs'],
        'Hot': ['Cooling Vest', 'Sun Protection'],
        'Adventure': ['Climbing Gear', 'Energy Bars'],
        'Romantic': ['Champagne', 'Formal Wear'],
      }
      
      let packingList = [...baseItems]
      
      if (state.currentBooking.destination?.tags) {
        state.currentBooking.destination.tags.forEach(tag => {
          if (destinationItems[tag]) {
            packingList = [...packingList, ...destinationItems[tag]]
          }
        })
      }
      
      state.packingList = [...new Set(packingList)] // Remove duplicates
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = {
        id: null,
        travelerName: '',
        email: '',
        destination: null,
        spaceship: null,
        departureDate: '',
        returnDate: '',
        tripType: 'solo',
        lodging: 'dome',
        activities: [],
        passengers: 1,
        totalCost: 0,
        travelTime: 0,
        status: 'draft',
      }
      state.packingList = []
    },
  },
})

export const {
  updateBookingDetails,
  setDestination,
  setSpaceship,
  addActivity,
  removeActivity,
  calculateTotalCost,
  calculateTravelTime,
  confirmBooking,
  cancelBooking,
  generatePackingList,
  resetCurrentBooking,
} = bookingSlice.actions

export default bookingSlice.reducer
