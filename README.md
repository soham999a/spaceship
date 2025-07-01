# Space Tourism Portal 2090 🚀

A futuristic, immersive web application for booking interplanetary vacations across the galaxy. Built with React, Three.js, and real NASA data.

## ✨ Features

- **100+ Destinations**: Explore real NASA exoplanets and fictional worlds
- **3D Visualizations**: Interactive planet models and galaxy map
- **Spaceship Selection**: Choose from 5 different spacecraft
- **Real NASA Data**: Integration with NASA APIs
- **Travel Time Simulator**: Calculate journey times based on distance and speed
- **Booking System**: Complete vacation planning and booking flow
- **Futuristic UI**: Neon-themed, space-inspired design

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom space theme
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **APIs**: NASA Exoplanet Archive, NASA Image Library, NASA APOD

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with WebGL support

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd space-tourism-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── store/              # Redux store and slices
├── services/           # API services (NASA integration)
├── data/               # Static data (spaceships, fictional planets)
├── three/              # Three.js 3D components
└── assets/             # Images, fonts, icons
```

## 🌍 NASA API Integration

The app integrates with several NASA APIs:

- **NASA Exoplanet Archive**: Real exoplanet data
- **NASA Image and Video Library**: Planet and space imagery
- **NASA APOD**: Astronomy Picture of the Day

To use your own NASA API key:
1. Get a free API key from https://api.nasa.gov/
2. Replace `DEMO_KEY` in `src/services/nasaApi.js`

## 🎮 Features Overview

### Planet Explorer Dashboard
- Browse 100+ planets with filtering
- Real NASA exoplanet data
- Fictional worlds from popular sci-fi
- Advanced search and categorization

### Spaceship Selection
- 5 unique spacecraft with different capabilities
- Speed, fuel type, and amenities comparison
- Dynamic travel time calculations

### 3D Planet Visualization
- Interactive rotating planet models
- Galaxy map with zoom and navigation
- WebGL-powered graphics

### Booking System
- Complete travel planning workflow
- Package customization
- Boarding pass generation
- Trip cost calculations

## 🎨 Design System

The app uses a custom space-themed design system:

- **Colors**: Neon blue, purple, pink, green, orange
- **Typography**: Orbitron font for futuristic feel
- **Animations**: Smooth transitions and hover effects
- **Layout**: Responsive grid system

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Planets

1. Add to `src/data/fictionalPlanets.js`
2. Include required fields: name, distance, description, tags
3. Add travel packages and activities

### Customizing Spaceships

1. Edit `src/data/spaceships.js`
2. Define speed, fuel type, amenities
3. Set cost multipliers and features

## 🌟 Future Enhancements

- [ ] AI Space Assistant chatbot
- [ ] VR/AR planet exploration
- [ ] Real-time space weather
- [ ] Multiplayer booking system
- [ ] Blockchain-based tickets
- [ ] Mobile app version

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🚀 Deployment

The app can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build the project with `npm run build` and deploy the `dist` folder.

---

**Ready for your space adventure? 🌌**
