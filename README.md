# Memory Card Game

A modern, interactive memory card game built with cutting-edge web technologies. This project demonstrates proficiency in React, Next.js, TypeScript, and modern UI/UX patterns.

## Overview

Memory Card Game is a fully functional browser-based game featuring multiple difficulty levels, persistent high score tracking, audio feedback, and a polished user interface. The application showcases clean architecture, responsive design, and best practices in modern web development.

## Key Features

- **Multiple Difficulty Levels**: Easy, Medium, and Hard modes with varying card counts and time pressure
- **Persistent High Scores**: Game statistics saved to browser storage with leaderboard functionality
- **Audio Feedback**: Sound effects for card flips and matches using Howler.js
- **Dark Mode Support**: Theme switching capability with next-themes
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Game Statistics**: Real-time move tracking and match counting
- **Accessibility**: Semantic HTML and accessible component patterns using Radix UI
- **Type Safety**: Full TypeScript implementation with strict type checking

## Tech Stack

### Frontend Framework & Libraries
- **Next.js 16** - React framework with server-side rendering and static generation
- **React 19** - Latest React with concurrent features and hooks
- **TypeScript** - Full static typing for code reliability

### Styling & Components
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Shadcn/ui** - High-quality component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful, consistent icon library

### Utilities & Features
- **Howler.js** - Audio playback library for game sound effects
- **next-themes** - Theme management for dark/light mode support
- **Class Variance Authority** - Type-safe component styling
- **Tailwind Merge** - Intelligent Tailwind class merging

### Development Tools
- **ESLint** - Code linting for code quality
- **TypeScript** - Static type checking

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── game/              # Game-specific components (GameBoard, MemoryCard)
│   ├── ui/                # Reusable UI components
│   └── [Feature].tsx      # Feature components (GameController, Settings, etc.)
├── contexts/              # React Context providers (GameSettingsContext)
├── hooks/                 # Custom React hooks
│   ├── useGameConfig.ts   # Difficulty configuration
│   ├── useHighScores.ts   # High score management
│   └── useGameConfig.ts   # Game logic hook
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
│   ├── audio.ts          # Sound effect utilities
│   └── shuffle.ts        # Card shuffling algorithm
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation & Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## Architecture Highlights

### State Management
- **React Context API** - Centralized game settings management
- **useState Hooks** - Local component state for game logic
- **Custom Hooks** - Encapsulated logic for reusability (useGameConfig, useHighScores)

### Game Logic
- **Modular Components** - Separated concerns (GameBoard, MemoryCard, Settings)
- **Callback Optimization** - useCallback hooks for performance optimization
- **Type-Safe Game State** - Interfaces for Card and GameState ensure type safety

### UI/UX
- **Shadcn Components** - Production-ready components with consistent styling
- **Responsive Layouts** - Tailwind CSS for mobile-first, responsive design
- **Theme System** - Light/dark mode with persistent user preferences
- **Accessible Interactions** - Radix UI primitives for WCAG compliance

## Notable Implementation Details

- **Card Shuffling Algorithm**: Implements proper randomization for unpredictable gameplay
- **High Score Persistence**: LocalStorage integration for multi-session score tracking
- **Audio Management**: Conditional sound playback with user-friendly muting options
- **Performance**: Optimized re-renders using React.memo and useCallback hooks
- **Type Safety**: 100% TypeScript coverage with strict null checks

## Learning & Development

This project demonstrates:
- Modern React patterns and hooks best practices
- Next.js App Router and server components concepts
- TypeScript usage in large applications
- Component composition and reusable patterns
- State management at scale with Context API
- Performance optimization techniques
- Responsive design principles
- Accessibility standards implementation

---

Built with ❤️ as a demonstration of full-stack JavaScript capabilities.
