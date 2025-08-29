# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application for the German citizenship test ("Leben in Deutschland" exam preparation). The application provides an interactive quiz interface with 3D visual elements and statistics tracking.

## Architecture

### Core Technologies
- Vanilla JavaScript ES6 classes
- Three.js for 3D graphics
- GSAP for animations
- CSS Grid and Flexbox for layout
- CSS Custom Properties for theming

### File Structure
- `index.html` - Main HTML structure with semantic sections
- `script.js` - Single JavaScript file containing the `LebenInDeutschlandQuiz` class
- `styles.css` - Complete CSS styling with responsive design

### Main Components
- **LebenInDeutschlandQuiz Class** (`script.js:1-776`): Main application controller
  - Question management and navigation with 10 sample civics questions
  - Real-time progress tracking and statistics calculation
  - Achievement system with unlockable badges
  - Interactive animations and sound effect simulations
  - Mobile-responsive navigation with hamburger menu
  - Theme toggle functionality (light/dark mode)
  - Particle system and cursor trail effects

### Key Features
- Interactive quiz with 10 sample questions about German civics
- Real-time progress tracking with circular progress indicator
- Achievement badge system with celebration animations
- 3D animated floating shapes and particle effects in hero section
- Responsive design with mobile hamburger menu
- Statistics display with animated number counters and progress bars
- Smooth scroll navigation between sections with scroll indicator
- CSS-only loading animation with 3D cube
- Dark/light theme switching with localStorage persistence
- Custom alert modals with success/failure animations
- Magnetic cursor effects and hover animations
- Sound effect simulations using CSS animations

## Development Notes

### Running the Application
This is a static website that can be opened directly in a browser:
```
# Open index.html in any modern browser
# No build process or server required
```

### External Dependencies
The application loads external libraries via CDN:
- Three.js (r128) from cdnjs
- GSAP (3.12.2) from cdnjs

### Styling Architecture
- CSS Custom Properties (CSS Variables) for consistent theming and dark mode
- Responsive breakpoints at 1024px, 768px, and 480px
- Advanced CSS animations including keyframes for floating, rotating, and glowing effects
- 3D transform effects using CSS `perspective` and `transform`
- CSS Grid for main layouts, Flexbox for components
- Gradient backgrounds with animated shifts and border effects
- Backdrop-filter blur effects for glassmorphism design
- Complex animation sequences for particle systems and celebrations

### JavaScript Architecture
- Single class-based architecture in `LebenInDeutschlandQuiz`
- Event-driven interactions with DOM manipulation
- Modular methods for different functionality areas:
  - `setupEventListeners()` - CTA buttons, navigation links, quiz controls
  - `setupMobileMenu()` - Hamburger menu functionality
  - `setupThemeToggle()` - Dark/light mode switching with localStorage
  - `setupScrollAnimations()` - IntersectionObserver for fade-in effects
  - `setupParticleSystem()` - Dynamic particle generation
  - `setupMagneticEffects()` - Hover animations for cards
  - Quiz management methods for question navigation and scoring
  - Achievement system with celebration animations
- No build tools or transpilation required
- Uses modern browser APIs (IntersectionObserver, localStorage, requestAnimationFrame)

### Mobile Considerations
- Hamburger menu implementation for mobile navigation
- CSS Grid layout switches to single column on mobile
- Touch-friendly button sizes and spacing
- Responsive font scaling

### Browser Compatibility
- Modern browser features used (CSS Grid, ES6 classes, CSS Custom Properties)
- Requires browsers with backdrop-filter support for glassmorphism effects
- Uses `IntersectionObserver` for scroll animations
- requestAnimationFrame for smooth animations
- localStorage for theme persistence
- Advanced CSS features: conic-gradient, clip-path, transform-style: preserve-3d
- Performance optimizations: disables complex animations on mobile (<480px)

### Git/Deployment Instructions
- **IMPORTANT**: Only push to GitHub when explicitly requested by the user
- User will give explicit permission before any git push operations
- Always wait for user confirmation before deploying changes