# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: One-Click Deploy (Recommended)
1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository: `https://github.com/soham999a/spaceship.git`
5. Vercel will automatically detect it's a static site
6. Click "Deploy"

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: spaceship (or your choice)
# - Directory: ./
# - Override settings? N
```

## Configuration

The project includes:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.gitignore` - Proper file exclusions
- ✅ Static HTML setup - Ready for deployment

## Important Notes

### Main File
- **Primary file**: `index.html` (Complete app with all features)
- **Alternative files**: Various test files (ignore these)

### Features Included
- 🌌 3D Galaxy Map with Three.js
- 🪐 Interactive Planet Viewer
- 🚀 20+ Spaceships with real images
- 🤖 AI Space Assistant (ARIA)
- 📊 NASA API Integration
- 💾 Functional Booking System
- 📱 Fully Responsive Design

### Performance
- All assets are optimized
- CDN-based libraries for fast loading
- Responsive design for all devices
- Real NASA data integration

## Post-Deployment

After deployment:
1. Test the 3D Galaxy Map
2. Try the Planet Viewer
3. Test the booking system
4. Chat with the AI Assistant
5. Verify NASA data loading

## Troubleshooting

If you encounter issues:
1. Check browser console for errors
2. Ensure all CDN resources load
3. Test on different browsers
4. Verify NASA API connectivity

## Custom Domain (Optional)

To add a custom domain:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain

---

**Your space tourism portal is ready to launch! 🚀**
