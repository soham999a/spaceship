import axios from 'axios'

// NASA API endpoints
const NASA_EXOPLANET_API = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync'
const NASA_IMAGE_API = 'https://images-api.nasa.gov/search'
const NASA_APOD_API = 'https://api.nasa.gov/planetary/apod'

// You can get a free API key from https://api.nasa.gov/
const NASA_API_KEY = 'uOMS8AKUbcK9MLgnDaVN6wvYXpwfiOBW1SetEXzr' // User's NASA API key

// Fetch exoplanets from NASA Exoplanet Archive
export const fetchNASAExoplanets = async (limit = 50) => {
  try {
    console.log('🌌 Attempting to fetch NASA exoplanets...')

    // Use a simpler, more reliable query
    const query = `SELECT TOP ${limit} pl_name,sy_dist,pl_rade,pl_masse,pl_orbper,pl_eqt,disc_year FROM ps WHERE pl_name IS NOT NULL AND sy_dist IS NOT NULL AND sy_dist < 100 ORDER BY sy_dist ASC`

    // Try multiple approaches
    let response
    let attempts = 0
    const maxAttempts = 3

    // Attempt 1: Direct POST request (most reliable)
    try {
      attempts++
      console.log(`🚀 Attempt ${attempts}: Direct POST request to NASA API`)

      response = await axios.post(NASA_EXOPLANET_API,
        `query=${encodeURIComponent(query)}&format=json`,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        }
      )
      console.log('✅ Direct POST request successful')
    } catch (postError) {
      console.log('❌ Direct POST failed:', postError.message)

      // Attempt 2: Direct GET request
      try {
        attempts++
        console.log(`🚀 Attempt ${attempts}: Direct GET request to NASA API`)

        response = await axios.get(NASA_EXOPLANET_API, {
          params: {
            query: query,
            format: 'json'
          },
          timeout: 10000,
          headers: {
            'Accept': 'application/json'
          }
        })
        console.log('✅ Direct GET request successful')
      } catch (getError) {
        console.log('❌ Direct GET failed:', getError.message)

        // Attempt 3: CORS proxy fallback
        try {
          attempts++
          console.log(`🚀 Attempt ${attempts}: Using CORS proxy`)

          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(NASA_EXOPLANET_API + '?query=' + encodeURIComponent(query) + '&format=json')}`
          const proxyResponse = await axios.get(proxyUrl, { timeout: 15000 })

          if (proxyResponse.data && proxyResponse.data.contents) {
            try {
              response = { data: JSON.parse(proxyResponse.data.contents) }
              console.log('✅ CORS proxy request successful')
            } catch (parseError) {
              console.error('❌ Failed to parse proxy response:', parseError)
              throw new Error('Invalid JSON response from proxy')
            }
          } else {
            throw new Error('No data from proxy')
          }
        } catch (proxyError) {
          console.log('❌ CORS proxy failed:', proxyError.message)
          throw new Error('All NASA API attempts failed')
        }
      }
    }

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response.data)
      throw new Error('Invalid response format')
    }

    console.log(`Successfully fetched ${response.data.length} exoplanets from NASA`)

    const exoplanets = await Promise.all(response.data.slice(0, limit).map(async (planet, index) => {
      const planetName = planet[0] || `Exoplanet ${index + 1}`
      const distance = parseFloat(planet[1]) || Math.random() * 50 + 10
      const radius = planet[2] || null
      const mass = planet[3] || null
      const orbitalPeriod = planet[4] || null
      const temperature = planet[5] || null
      const discoveryYear = planet[6] || null

      return {
        id: `exo-${index}`,
        name: planetName,
        distance: distance,
        type: 'exoplanet',
        description: generatePlanetDescription([planetName, distance, radius, mass, orbitalPeriod, temperature, discoveryYear]),
        image: await fetchPlanetImage(planetName),
        tags: generatePlanetTags([planetName, distance, radius, mass, orbitalPeriod, temperature, discoveryYear]),
        baseCost: Math.floor(distance * 500 + Math.random() * 20000) + 15000,
        gravity: calculateGravity(mass),
        atmosphere: generateAtmosphere(temperature),
        temperature: temperature ? `${Math.round(temperature - 273.15)}°C` : 'Unknown',
        dayLength: `${Math.round(Math.random() * 48 + 12)} hours`,
        yearLength: orbitalPeriod ? `${Math.round(orbitalPeriod)} Earth days` : 'Unknown',
        population: 'Uninhabited',
        radius: radius ? `${radius.toFixed(2)} Earth radii` : 'Unknown',
        mass: mass ? `${mass.toFixed(2)} Earth masses` : 'Unknown',
        orbitalPeriod: orbitalPeriod ? `${orbitalPeriod.toFixed(1)} days` : 'Unknown',
        discoveryYear: discoveryYear || 'Unknown',
        travelPackages: generateTravelPackages([planetName, distance, radius, mass, orbitalPeriod, temperature, discoveryYear]),
        activities: generateActivities([planetName, distance, radius, mass, orbitalPeriod, temperature, discoveryYear]),
        facts: generateFacts([planetName, distance, radius, mass, orbitalPeriod, temperature, discoveryYear])
      }
    }))

    return exoplanets
  } catch (error) {
    console.error('Error fetching NASA exoplanets:', error)
    console.log('Falling back to predefined exoplanets...')
    // Return some fallback exoplanets if API fails
    return generateFallbackExoplanets()
  }
}

// Fetch images from NASA Image and Video Library
export const fetchNASAImages = async (searchTerm, limit = 5) => {
  try {
    const response = await axios.get(NASA_IMAGE_API, {
      params: {
        q: searchTerm,
        media_type: 'image',
        page_size: limit
      },
      timeout: 5000
    })

    if (response.data.collection.items.length > 0) {
      return response.data.collection.items.map(item => ({
        title: item.data[0].title,
        description: item.data[0].description,
        url: item.links ? item.links[0].href : null,
        date: item.data[0].date_created
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching NASA images:', error)
    return []
  }
}

// Fetch a specific planet image from NASA
export const fetchPlanetImage = async (planetName) => {
  console.log(`🖼️ Fetching image for planet: ${planetName}`)

  try {
    // Try NASA API first (we know this works from our test)
    const images = await fetchNASAImages('exoplanet', 3)
    if (images.length > 0) {
      const randomImage = images[Math.floor(Math.random() * images.length)]
      console.log(`✅ Using NASA image for ${planetName}: ${randomImage.url}`)
      return randomImage.url
    }
  } catch (apiError) {
    console.log(`NASA API failed for ${planetName}, using fallback`)
  }

  // Use reliable fallback images immediately
  const fallbackImage = await getDefaultSpaceImage()
  console.log(`🔄 Using fallback image for ${planetName}: ${fallbackImage}`)
  return fallbackImage
}

// Get a default space/planet image from NASA
export const getDefaultSpaceImage = async () => {
  try {
    // Use a curated list of reliable image URLs
    const defaultImages = [
      // Use reliable placeholder images that always work
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=300&fit=crop'
    ]

    // Try to fetch from NASA API first (we know this works)
    try {
      const images = await fetchNASAImages('exoplanet', 5)
      if (images.length > 0) {
        const randomImage = images[Math.floor(Math.random() * images.length)]
        console.log(`✅ Using NASA image: ${randomImage.url}`)
        return randomImage.url
      }
    } catch (apiError) {
      console.log('NASA API failed, using curated images:', apiError.message)
    }

    // Fallback to curated images
    const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)]
    console.log(`🔄 Using fallback image: ${randomImage}`)
    return randomImage
  } catch (error) {
    console.error('Error fetching default space image:', error)
    // Ultimate fallback - reliable image
    return 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
  }
}

// Synchronous fallback image generator for immediate use
export const getReliablePlanetImage = (planetName) => {
  const reliableImages = [
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=400&h=300&fit=crop'
  ]

  // Use planet name to consistently select the same image for the same planet
  const hash = planetName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const index = hash % reliableImages.length
  return reliableImages[index]
}

// Fetch Astronomy Picture of the Day
export const fetchAPOD = async (date = null) => {
  try {
    const params = {
      api_key: NASA_API_KEY
    }
    
    if (date) {
      params.date = date
    }

    const response = await axios.get(NASA_APOD_API, {
      params,
      timeout: 5000
    })

    return response.data
  } catch (error) {
    console.error('Error fetching APOD:', error)
    return null
  }
}

// Helper functions
const generatePlanetDescription = (planetData) => {
  const name = planetData[0]
  const distance = planetData[1]
  const temp = planetData[6]
  
  const descriptions = [
    `A mysterious exoplanet located ${distance?.toFixed(1)} light-years away.`,
    `An intriguing world in a distant star system, perfect for space exploration.`,
    `A fascinating planet that challenges our understanding of planetary formation.`,
    `An exotic world with unique characteristics waiting to be explored.`
  ]
  
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

const generatePlanetTags = (planetData) => {
  const tags = []
  const temp = planetData[6] // Temperature in Kelvin
  const mass = planetData[3]
  
  if (temp && temp > 273 && temp < 373) tags.push('Has Water')
  if (temp && temp < 200) tags.push('Cold')
  if (temp && temp > 400) tags.push('Hot')
  if (Math.random() > 0.7) tags.push('Adventure')
  if (Math.random() > 0.8) tags.push('Romantic')
  if (temp && temp > 250 && temp < 350) tags.push('Kid-Friendly')
  
  return tags
}

const calculateGravity = (mass) => {
  if (!mass) return Math.random() * 2 + 0.5
  // Simplified gravity calculation based on mass
  return Math.round((mass * 0.8 + Math.random() * 0.4) * 10) / 10
}

const generateAtmosphere = (temp) => {
  if (!temp) return 'Unknown'
  if (temp < 200) return 'Frozen, requires heating'
  if (temp > 400) return 'Toxic, requires cooling'
  if (temp > 250 && temp < 350) return 'Potentially breathable'
  return 'Requires life support'
}

const generateTravelPackages = (planetData) => {
  const packages = [
    'Scientific Research Expedition',
    'Exoplanet Photography Tour',
    'Astronomical Observation Package',
    'Deep Space Adventure',
    'Planetary Geology Study'
  ]
  
  return packages.slice(0, Math.floor(Math.random() * 3) + 1)
}

const generateActivities = (planetData) => {
  const activities = [
    'Surface Exploration',
    'Atmospheric Analysis',
    'Mineral Collection',
    'Star Gazing',
    'Zero-G Sports',
    'Scientific Research',
    'Photography Expedition'
  ]
  
  return activities.slice(0, Math.floor(Math.random() * 4) + 2)
}

const generateFacts = (planetData) => {
  const name = planetData[0]
  const distance = planetData[1]
  const discoveryYear = planetData[7]
  
  const facts = [
    `Discovered in ${discoveryYear || 'the early 21st century'}`,
    `Located ${distance?.toFixed(1)} light-years from Earth`,
    'One of thousands of confirmed exoplanets',
    'Detected using advanced space telescopes'
  ]
  
  return facts
}

const generateFallbackExoplanets = async () => {
  console.log('🔄 Generating fallback exoplanets with reliable images...')

  const fallbackPlanets = [
    {
      id: 'kepler-452b',
      name: 'Kepler-452b',
      distance: 1402,
      type: 'exoplanet',
      description: 'Earth\'s cousin - a potentially habitable super-Earth in the habitable zone of a sun-like star.',
      image: await getDefaultSpaceImage(),
      tags: ['Has Water', 'Kid-Friendly', 'NASA', 'Habitable Zone'],
      baseCost: 45000,
      gravity: '1.6g',
      atmosphere: 'Potentially breathable',
      temperature: '5°C',
      dayLength: '385 Earth days',
      yearLength: '385 Earth days',
      population: 'Uninhabited',
      radius: '1.6 Earth radii',
      mass: '5.0 Earth masses',
      orbitalPeriod: '385 days',
      discoveryYear: '2015',
      travelPackages: ['Habitability Study', 'Earth Comparison Tour', 'Kepler Mission Heritage'],
      activities: ['Surface Analysis', 'Climate Study', 'Atmospheric Research', 'Stellar Observation'],
      facts: ['Most Earth-like planet discovered by Kepler', 'Located in the habitable zone', 'Receives 10% more energy than Earth']
    },
    {
      id: 'proxima-b',
      name: 'Proxima Centauri b',
      distance: 4.24,
      type: 'exoplanet',
      description: 'The closest exoplanet to Earth, orbiting in the habitable zone of our nearest stellar neighbor.',
      image: await getDefaultSpaceImage(),
      tags: ['Adventure', 'Has Water', 'NASA', 'Closest'],
      baseCost: 35000,
      gravity: '1.1g',
      atmosphere: 'Unknown',
      temperature: '-39°C',
      dayLength: '11.2 Earth days',
      yearLength: '11.2 Earth days',
      population: 'Uninhabited',
      radius: '1.1 Earth radii',
      mass: '1.3 Earth masses',
      orbitalPeriod: '11.2 days',
      discoveryYear: '2016',
      travelPackages: ['Closest Exoplanet Tour', 'Red Dwarf Study', 'Alpha Centauri System'],
      activities: ['Proximity Research', 'Stellar Observation', 'Red Dwarf Analysis', 'Interstellar Travel'],
      facts: ['Closest exoplanet to Earth', 'Orbits Proxima Centauri, a red dwarf star', 'Tidally locked to its star']
    },
    {
      id: 'trappist-1e',
      name: 'TRAPPIST-1e',
      distance: 40,
      type: 'exoplanet',
      description: 'One of seven Earth-sized planets in the TRAPPIST-1 system, potentially habitable.',
      image: await getDefaultSpaceImage(),
      tags: ['Has Water', 'NASA', 'Multi-planet System', 'Earth-sized'],
      baseCost: 42000,
      gravity: '0.91g',
      atmosphere: 'Unknown',
      temperature: '-22°C',
      dayLength: 'Tidally locked',
      yearLength: '6.1 Earth days',
      population: 'Uninhabited',
      radius: '0.91 Earth radii',
      mass: '0.77 Earth masses',
      orbitalPeriod: '6.1 days',
      discoveryYear: '2017',
      travelPackages: ['Seven Worlds Tour', 'TRAPPIST System Explorer', 'Ultra-cool Dwarf Study'],
      activities: ['Multi-planet Observation', 'System Dynamics Study', 'Habitability Research', 'Transit Photography'],
      facts: ['Part of a 7-planet system', 'All planets are Earth-sized', 'System is 40 light-years away']
    },
    {
      id: 'k2-18b',
      name: 'K2-18b',
      distance: 124,
      type: 'exoplanet',
      description: 'A sub-Neptune exoplanet with water vapor detected in its atmosphere.',
      image: await getDefaultSpaceImage(),
      tags: ['Has Water', 'NASA', 'Water Vapor', 'Sub-Neptune'],
      baseCost: 38000,
      gravity: '2.3g',
      atmosphere: 'Water vapor detected',
      temperature: '-73°C to 47°C',
      dayLength: '33 Earth days',
      yearLength: '33 Earth days',
      population: 'Uninhabited',
      radius: '2.3 Earth radii',
      mass: '8.6 Earth masses',
      orbitalPeriod: '33 days',
      discoveryYear: '2015',
      travelPackages: ['Water World Explorer', 'Atmospheric Analysis', 'Hubble Heritage Tour'],
      activities: ['Atmospheric Research', 'Water Detection Study', 'Climate Analysis', 'Spectroscopy'],
      facts: ['Water vapor confirmed in atmosphere', 'Located in habitable zone', 'Studied by Hubble Space Telescope']
    },
    {
      id: 'toi-715b',
      name: 'TOI-715b',
      distance: 137,
      type: 'exoplanet',
      description: 'A recently discovered super-Earth in the habitable zone, found by TESS.',
      image: await getDefaultSpaceImage(),
      tags: ['NASA', 'TESS Discovery', 'Super-Earth', 'Recent'],
      baseCost: 41000,
      gravity: '1.5g',
      atmosphere: 'Unknown',
      temperature: 'Potentially temperate',
      dayLength: '19.3 Earth days',
      yearLength: '19.3 Earth days',
      population: 'Uninhabited',
      radius: '1.55 Earth radii',
      mass: '3.02 Earth masses',
      orbitalPeriod: '19.3 days',
      discoveryYear: '2024',
      travelPackages: ['TESS Discovery Tour', 'Recent Finds Explorer', 'Super-Earth Study'],
      activities: ['New World Exploration', 'TESS Mission Study', 'Habitability Assessment', 'Future Research'],
      facts: ['Discovered by TESS in 2024', 'Super-Earth in habitable zone', 'One of the newest confirmed exoplanets']
    }
  ]

  return fallbackPlanets
}
