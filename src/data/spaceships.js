export const spaceships = [
  {
    id: 'starship',
    name: "SpaceX Starship MK-VII 'Endeavour'",
    maxSpeed: 58000, // km/h
    warpCapable: false,
    fuelType: 'Liquid Methane/LOX + Nuclear Thermal',
    amenities: ['Hibernation Pods', 'Quantum Internet', 'Zero-G Observatory', 'Hydroponic Gardens', 'Medical Bay'],
    capacity: 100,
    costMultiplier: 1.0,
    description: 'The workhorse of interplanetary travel. This seventh-generation Starship features nuclear thermal propulsion, advanced life support, and proven reliability across 847 successful missions.',
    image: '/images/starship.jpg',
    manufacturer: 'SpaceX Corporation',
    yearBuilt: 2089,
    safetyRating: 9.5,
    comfortLevel: 8,
    certification: 'ISA-Class A Interplanetary',
    lastMaintenance: '2090-06-15',
    totalFlightHours: 12847,
    successfulMissions: 847,
    engineType: 'Raptor-VII Nuclear Thermal',
    thrust: '2,400 kN',
    specificImpulse: '450 seconds',
    deltaV: '15,000 m/s',
    radiationShielding: 'Polyethylene + Electromagnetic',
    gravityGeneration: 'Rotational (0.38g)',
    lifeSupport: 'Closed-loop ECLSS',
    emergencyEscape: '12 autonomous pods',
    features: {
      cryosleep: true,
      wifi: true,
      restaurant: false,
      gym: true,
      spa: false,
      entertainment: true,
    },
    technicalSpecs: {
      length: '120m',
      diameter: '9m',
      mass: '1,200 tonnes',
      cargoCapacity: '150 tonnes',
      fuelCapacity: '1,200 tonnes',
      powerGeneration: 'Nuclear Reactor + Solar Arrays',
      communicationRange: '50 AU',
      operationalRange: 'Inner Solar System'
    },
    crewRequirements: {
      pilot: 'Level 5 Interplanetary License',
      engineer: 'Nuclear Propulsion Certified',
      medic: 'Space Medicine Specialist',
      minimumCrew: 4,
      maximumCrew: 8
    }
  },
  {
    id: 'orion',
    name: 'NASA Orion Deep Space Explorer "Artemis IX"',
    maxSpeed: 40000,
    warpCapable: false,
    fuelType: 'Xenon Ion Propulsion + Chemical Backup',
    amenities: ['Micro-Gravity Fitness Center', 'Advanced Medical Suite', 'Research Laboratory', 'Quantum Communication Array'],
    capacity: 6,
    costMultiplier: 0.8,
    description: 'NASA\'s premier deep space exploration vessel. Built for extended missions beyond the asteroid belt with cutting-edge scientific equipment and unmatched safety protocols.',
    image: '/images/orion.jpg',
    manufacturer: 'NASA/Lockheed Martin',
    yearBuilt: 2087,
    safetyRating: 9.8,
    comfortLevel: 6,
    certification: 'ISA-Class AA Deep Space',
    lastMaintenance: '2090-07-01',
    totalFlightHours: 8,934,
    successfulMissions: 234,
    engineType: 'NEXT-C Ion Thruster Array',
    thrust: '236 mN (continuous)',
    specificImpulse: '4,190 seconds',
    deltaV: '25,000 m/s',
    radiationShielding: 'Multi-layer Kevlar + Water',
    gravityGeneration: 'None (Micro-gravity)',
    lifeSupport: 'Advanced ECLSS with 99.7% recycling',
    emergencyEscape: '2 high-velocity escape pods',
    features: {
      cryosleep: false,
      wifi: true,
      restaurant: false,
      gym: true,
      spa: false,
      entertainment: false,
    },
    technicalSpecs: {
      length: '26.7m',
      diameter: '5.03m',
      mass: '26.5 tonnes',
      cargoCapacity: '8 tonnes',
      fuelCapacity: '15 tonnes xenon',
      powerGeneration: 'Multi-Mission RTG + Solar',
      communicationRange: '100 AU',
      operationalRange: 'Outer Solar System'
    },
    crewRequirements: {
      pilot: 'Level 7 Deep Space License',
      engineer: 'Ion Propulsion Specialist',
      scientist: 'PhD in Relevant Field',
      medic: 'Emergency Medicine Certified',
      minimumCrew: 3,
      maximumCrew: 6
    }
  },
  {
    id: 'ranger',
    name: 'ISV Ranger "Endurance Class" Interstellar Cruiser',
    maxSpeed: 89875517, // 30% light speed
    warpCapable: true,
    warpFactor: 'Alcubierre Drive Mark III',
    fuelType: 'Antimatter Containment + Exotic Matter',
    amenities: ['Hibernation Complex', 'Multi-Cuisine Replicators', 'Holographic Recreation Deck', 'Zero-G Sports Arena', 'Observation Lounge'],
    capacity: 50,
    costMultiplier: 2.5,
    description: 'Humanity\'s first commercial interstellar vessel. Features breakthrough Alcubierre warp drive technology, allowing faster-than-light travel to nearby star systems. Only 3 exist.',
    image: '/images/ranger.jpg',
    manufacturer: 'Breakthrough Starshot Industries',
    yearBuilt: 2090,
    safetyRating: 9.2,
    comfortLevel: 9,
    certification: 'ISA-Class S Interstellar',
    lastMaintenance: '2090-06-30',
    totalFlightHours: 1,247,
    successfulMissions: 12,
    engineType: 'Alcubierre Warp Drive + Fusion Ramjet',
    thrust: 'Variable Spacetime Distortion',
    specificImpulse: 'Infinite (Warp Mode)',
    deltaV: 'Unlimited (Warp Capable)',
    radiationShielding: 'Deflector Array + Magnetic Field',
    gravityGeneration: 'Artificial Gravity Plating (1.0g)',
    lifeSupport: 'Closed Ecosystem with Biosphere',
    emergencyEscape: '10 FTL-capable lifeboats',
    features: {
      cryosleep: true,
      wifi: true,
      restaurant: true,
      gym: true,
      spa: true,
      entertainment: true,
    },
    technicalSpecs: {
      length: '400m',
      diameter: '80m',
      mass: '50,000 tonnes',
      cargoCapacity: '5,000 tonnes',
      fuelCapacity: '100kg antimatter + exotic matter',
      powerGeneration: 'Antimatter Reactor + Zero-Point Energy',
      communicationRange: 'Quantum Entanglement (Instantaneous)',
      operationalRange: '50 Light Years'
    },
    crewRequirements: {
      pilot: 'Level 10 Interstellar License + Warp Certification',
      engineer: 'Exotic Matter Specialist + PhD Physics',
      navigator: 'Quantum Navigation Certified',
      medic: 'Xenobiology + Emergency Medicine',
      minimumCrew: 12,
      maximumCrew: 20
    },
    warpCapabilities: {
      maxWarpFactor: 'Warp 2.1',
      warpRange: '50 light years',
      warpDuration: '72 hours maximum',
      cooldownPeriod: '24 hours between jumps',
      navigationAccuracy: '99.97%'
    }
  },
  {
    id: 'voyager',
    name: 'Luxury Starliner "Cosmic Majesty"',
    maxSpeed: 80000,
    warpCapable: false,
    fuelType: 'Fusion Plasma + Solar Collection',
    amenities: ['Full-Service Spa & Wellness Center', 'Michelin-Star Restaurant', 'IMAX Dome Theater', 'Casino & Gaming Lounge', 'Shopping Promenade', 'Artificial Beach Resort'],
    capacity: 200,
    costMultiplier: 1.8,
    description: 'The pinnacle of luxury space travel. This floating palace offers 5-star accommodations, world-class dining, and entertainment that rivals the finest Earth resorts.',
    image: '/images/voyager.jpg',
    manufacturer: 'Virgin Galactic Luxury Division',
    yearBuilt: 2089,
    safetyRating: 9.0,
    comfortLevel: 10,
    certification: 'ISA-Class L Luxury Cruise',
    lastMaintenance: '2090-07-10',
    totalFlightHours: 15,678,
    successfulMissions: 456,
    engineType: 'Fusion Torch Drive Array',
    thrust: '1,800 kN',
    specificImpulse: '3,500 seconds',
    deltaV: '12,000 m/s',
    radiationShielding: 'Luxury Composite + Magnetic Field',
    gravityGeneration: 'Rotating Habitat Rings (0.8g)',
    lifeSupport: 'Luxury ECLSS with Air Gardens',
    emergencyEscape: '50 luxury escape pods',
    features: {
      cryosleep: true,
      wifi: true,
      restaurant: true,
      gym: true,
      spa: true,
      entertainment: true,
    },
    technicalSpecs: {
      length: '800m',
      diameter: '200m',
      mass: '150,000 tonnes',
      cargoCapacity: '10,000 tonnes',
      fuelCapacity: '20,000 tonnes',
      powerGeneration: 'Fusion Reactor + Solar Collectors',
      communicationRange: '25 AU',
      operationalRange: 'Inner & Outer Solar System'
    },
    crewRequirements: {
      captain: 'Level 8 Cruise Ship License',
      engineer: 'Fusion Systems Certified',
      hospitality: 'Luxury Service Training',
      medic: 'Cruise Medicine Specialist',
      minimumCrew: 50,
      maximumCrew: 80
    },
    luxuryFeatures: {
      suiteTypes: ['Standard Cabin', 'Deluxe Suite', 'Presidential Suite', 'Owner\'s Penthouse'],
      diningOptions: ['Molecular Gastronomy', 'Traditional Earth Cuisine', 'Alien Fusion', 'Hydroponic Fresh'],
      entertainment: ['Zero-G Ballet', 'Holographic Concerts', 'Virtual Reality Worlds', 'Space Walks'],
      wellness: ['Anti-Gravity Massage', 'Cosmic Meditation', 'Fitness Programs', 'Medical Spa']
    }
  },
  {
    id: 'falcon',
    name: 'Adventure Craft "Millennium Falcon" (Replica)',
    maxSpeed: 150000,
    warpCapable: true,
    warpFactor: 'Hyperdrive Class 0.5 (Replica)',
    fuelType: 'Coaxium Fuel Cells + Ion Drive',
    amenities: ['Authentic Recreation Lounge', 'Dejarik Holochess Table', 'Smuggler\'s Compartments (Decorative)', 'Cockpit Experience'],
    capacity: 8,
    costMultiplier: 3.0,
    description: 'A meticulously crafted replica of the legendary Corellian freighter. While not the original, this ship captures the spirit of adventure with modern safety systems and authentic details.',
    image: '/images/falcon.jpg',
    manufacturer: 'Corellian Heritage Shipyards',
    yearBuilt: 2088,
    safetyRating: 8.5,
    comfortLevel: 6,
    certification: 'ISA-Class R Recreation/Adventure',
    lastMaintenance: '2090-06-20',
    totalFlightHours: 3,456,
    successfulMissions: 89,
    engineType: 'Modified Ion Drive + Hyperdrive Replica',
    thrust: '800 kN',
    specificImpulse: '2,800 seconds',
    deltaV: '18,000 m/s',
    radiationShielding: 'Standard Composite + Ray Shields',
    gravityGeneration: 'Artificial Gravity Deck Plating',
    lifeSupport: 'Standard ECLSS with Vintage Aesthetics',
    emergencyEscape: '2 escape pods + emergency beacon',
    features: {
      cryosleep: false,
      wifi: true,
      restaurant: false,
      gym: false,
      spa: false,
      entertainment: true,
    },
    technicalSpecs: {
      length: '34.75m',
      diameter: '25.61m',
      mass: '1,050 tonnes',
      cargoCapacity: '100 tonnes',
      fuelCapacity: '500 tonnes',
      powerGeneration: 'Fusion Reactor + Solar Backup',
      communicationRange: '15 AU',
      operationalRange: 'Solar System + Short Interstellar'
    },
    crewRequirements: {
      pilot: 'Level 6 Adventure Craft License',
      engineer: 'Vintage Systems Specialist',
      guide: 'Adventure Tourism Certified',
      minimumCrew: 2,
      maximumCrew: 4
    },
    adventureFeatures: {
      experiences: ['Asteroid Field Navigation', 'Kessel Run Simulation', 'Smuggler Role-Play', 'Classic Space Combat Training'],
      authenticity: ['Original Sound Effects', 'Period-Accurate Controls', 'Vintage Aesthetics', 'Historical Database'],
      safety: ['Modern Life Support', 'Updated Navigation', 'Emergency Systems', 'Insurance Coverage']
    }
  }
]

export const getSpaceshipById = (id) => {
  return spaceships.find(ship => ship.id === id)
}

export const getSpaceshipsByFeature = (feature) => {
  return spaceships.filter(ship => ship.features[feature])
}

export const calculateTravelTime = (distance, spaceshipId) => {
  const spaceship = getSpaceshipById(spaceshipId)
  if (!spaceship) return 0
  
  // Distance in light years, speed in km/h
  const distanceKm = distance * 9.461e12 // Convert light years to km
  const timeHours = distanceKm / spaceship.maxSpeed
  const timeDays = Math.round(timeHours / 24)
  
  return timeDays
}
