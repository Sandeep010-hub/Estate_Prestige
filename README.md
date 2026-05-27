# 🏢 Estate Prestige

**A Modern Real-Time Tracking Real Estate Application**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38b2ac?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=nodedotjs)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Key Components](#key-components)
- [Development Guide](#development-guide)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [Support](#support)

---

## 🎯 Overview

**Estate Prestige** is a sophisticated real estate application designed to provide comprehensive property tracking, visualization, and management capabilities. The platform offers real-time property information, interactive blueprints, and seamless user engagement through multiple integrated channels.

### Core Capabilities
- 🏠 **Property Catalog**: Browse featured and comprehensive property listings
- 📊 **Real-Time Tracking**: Monitor property availability and updates instantly
- 🎨 **Interactive Blueprints**: Visualize property layouts with detailed plot information
- 📱 **Multi-Channel Communication**: WhatsApp integration for direct customer advisory
- 📝 **Inquiry Management**: Streamlined property inquiry and contact system
- 🎯 **Analytics Dashboard**: Track trust metrics and user engagement statistics

---

## ✨ Features

### For Users
- **Intuitive Property Discovery**: Browse properties with advanced filtering and detailed information
- **Interactive Visualizer**: 3D-like blueprint viewer for property layouts
- **Seamless Contact**: Quick inquiry submission with property pre-selection
- **WhatsApp Integration**: Direct advisory through WhatsApp messenger
- **Trust Indicators**: View statistics and success metrics

### For Developers
- **Type-Safe Development**: Full TypeScript support across the codebase
- **Hot Module Replacement**: Instant development feedback with Vite
- **Component-Driven Architecture**: Modular, reusable React components
- **Styling Framework**: Tailwind CSS for rapid UI development
- **Express Backend**: Node.js backend for API and server-side logic
- **Environment Management**: Secure configuration through environment variables

---

## 🛠 Tech Stack

### Frontend
- **React 19.0+**: Modern UI library with hooks and concurrent rendering
- **TypeScript 5.8**: Type-safe JavaScript for better development experience
- **Vite 6.2**: Lightning-fast build tool and development server
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icon library
- **Motion**: Smooth animations and transitions
- **Vite React Plugin**: Optimized React development support

### Backend
- **Express 4.21**: Lightweight Node.js web framework
- **Node.js 16+**: JavaScript runtime

### Build & Development
- **TypeScript Compiler**: Static type checking
- **ESBuild**: Fast JavaScript bundler
- **TSX**: TypeScript execution for Node.js

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Autoprefixer**: CSS vendor prefixing
- **PostCSS**: CSS transformation

---

## 📁 Project Structure

```
Estate_Prestige/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── HeroSection.tsx  # Landing hero section
│   │   ├── TrustStats.tsx   # Statistics display
│   │   ├── FeaturedProperties.tsx  # Featured listings
│   │   ├── ValueProps.tsx   # Value propositions
│   │   ├── PropertiesPage.tsx      # Full property catalog
│   │   ├── DetailsPage.tsx  # Property details view
│   │   ├── ContactPage.tsx  # Inquiry form
│   │   ├── BottomCTA.tsx    # Call-to-action section
│   │   ├── Footer.tsx       # Footer component
│   │   ├── VisualizerDrawer.tsx    # Blueprint viewer
│   │   └── WhatsAppAdvisory.tsx    # WhatsApp FAB
│   ├── data.ts              # Property data and constants
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── assets/                  # Static assets (images, fonts, etc.)
├── public/                  # Public assets
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── index.html               # HTML entry point
├── metadata.json            # Application metadata
└── README.md                # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **A Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Optional Requirements
- **Gemini API Key**: For AI-powered features (from [Google AI Studio](https://ai.google.dev/))
- **WhatsApp Business Account**: For WhatsApp integration features

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/Sandeep010-hub/Estate_Prestige.git

# Using SSH
git clone git@github.com:Sandeep010-hub/Estate_Prestige.git

# Navigate into the project directory
cd Estate_Prestige
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json` including:
- React and React DOM
- Vite and build tools
- Tailwind CSS
- TypeScript
- Express (for backend)
- And all other dependencies

### Step 3: Configure Environment Variables

```bash
# Create .env.local from the example
cp .env.example .env.local
```

Edit `.env.local` and add your configuration (see [Environment Configuration](#environment-configuration) section).

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:3000`
- **Network**: `http://<your-ip>:3000`

---

## 🔐 Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Gemini AI API Configuration
GEMINI_API_KEY="your_gemini_api_key_here"

# Application URL
# Used for self-referential links, OAuth callbacks, and API endpoints
APP_URL="http://localhost:3000"
```

### Getting API Keys

#### Gemini API Key
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create or select a project
4. Copy your API key
5. Paste into `GEMINI_API_KEY` in `.env.local`

#### APP_URL Configuration
- **Development**: `http://localhost:3000`
- **Production**: Your deployed application URL
- **Network Development**: `http://<your-machine-ip>:3000`

---

## 📝 Available Scripts

All scripts are defined in `package.json`:

### Development

```bash
# Start development server with HMR
npm run dev

# Runs on: http://localhost:3000
# Features: Hot Module Replacement, TypeScript checking
```

### Build

```bash
# Build for production
npm run build

# Creates optimized bundle in 'dist/' directory
# Output: Minified and tree-shaken code
```

### Preview

```bash
# Preview production build locally
npm run preview

# Allows testing the built application before deployment
```

### Maintenance

```bash
# Clean build artifacts
npm run clean

# Removes dist/ directory and server.js

# Type checking without emitting
npm run lint

# Checks TypeScript types without compilation
```

---

## 🏗 Architecture

### Application Flow

```
┌─────────────────────────────────────────┐
│         Browser (Client-Side)           │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │      React Application (SPA)      │  │
│  ├──────────────────────────────────┤  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Header Navigation        │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │  Current View (Tab-based)  │  │  │
│  │  │  • Home                    │  │  │
│  │  │  • Properties Catalog      │  │  │
│  │  │  • Property Details        │  │  │
│  │  │  • Contact/Inquiry         │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │  Footer                    │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │  Global Components         │  │  │
│  │  │  • Blueprint Visualizer    │  │  │
│  │  │  • WhatsApp Advisory FAB   │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
         ↓↑ API Requests/Responses ↓↑
┌─────────────────────────────────────────┐
│     Node.js/Express Backend (API)       │
├─────────────────────────────────────────┤
│  • Authentication & Authorization      │
│  • Property Data Management             │
│  • Inquiry Processing                   │
│  • External API Integration             │
└─────────────────────────────────────────┘
```

### State Management

The application uses React's built-in state management through:

- **useState Hooks**: Component-level state
- **Context (optional)**: For global state if needed
- **Props Drilling**: Data passed through component hierarchy

**Main State Variables** (in `App.tsx`):
- `currentTab`: Active page/view
- `selectedProperty`: Currently viewed property
- `selectedPlot`: Selected property plot
- `isBlueprintOpen`: Blueprint visualizer state

---

## 🧩 Key Components

### Header Component
- Navigation menu
- Tab switching (Home, Properties, Details, Contact)
- Enquiry button

### HeroSection Component
- Landing page visual
- Explore CTA button
- Branding and messaging

### FeaturedProperties Component
- Property card carousel
- Limited featured listings display
- Property selection triggers

### PropertiesPage Component
- Full property catalog
- Filtering and sorting capabilities
- Grid/list view options

### DetailsPage Component
- Comprehensive property information
- Plot selection interface
- Blueprint visualization trigger

### ContactPage Component
- Inquiry form collection
- Property/plot pre-population
- Submission handling

### VisualizerDrawer Component
- Interactive blueprint viewer
- Plot dimensions and details
- Inquiry integration

### WhatsAppAdvisory Component
- Floating action button (FAB)
- WhatsApp chat integration
- Quick contact option

---

## 👨‍💻 Development Guide

### Adding a New Component

1. **Create component file** in `src/components/`:
```typescript
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  // Define props
}

export default function MyComponent({ }: MyComponentProps) {
  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
}
```

2. **Import in App.tsx**:
```typescript
import MyComponent from './components/MyComponent';
```

3. **Use in render**:
```typescript
<MyComponent prop1="value" />
```

### Adding New Property Data

1. Update `src/data.ts`:
```typescript
export const properties: Property[] = [
  {
    id: "prop-001",
    name: "Luxury Apartments",
    location: "Downtown",
    plots: [
      {
        id: "plot-001",
        size: 1200,
        price: 500000,
        // ... other properties
      }
    ],
    // ... other property fields
  },
  // Add more properties
];
```

### Styling Components

Using Tailwind CSS classes:

```typescript
<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6">
  <h2 className="text-2xl font-bold text-white mb-4">Title</h2>
  <p className="text-gray-200">Description</p>
</div>
```

### Type Safety

Always define types for props and data:

```typescript
// src/types.ts
export interface Property {
  id: string;
  name: string;
  location: string;
  plots: Plot[];
}

export interface Plot {
  id: string;
  size: number;
  price: number;
}
```

---

## 🏗 Build & Deployment

### Development Build

```bash
npm run dev
```

**Output**: Unminified code with source maps
**Speed**: Fast (HMR enabled)
**Use Case**: Local development

### Production Build

```bash
npm run build
npm run preview
```

**Output**: Optimized, minified code in `dist/` directory
**Speed**: Slower build, faster runtime
**Use Case**: Deployment

### Build Output

The `dist/` directory contains:
- `index.html`: Minified HTML entry point
- `assets/`: JavaScript and CSS bundles
- `.map` files: Source maps for debugging

### Deployment Options

#### Cloud Run (Google AI Studio)
```bash
# Build and deploy
npm run build
# Upload dist/ directory to Cloud Run
```

#### Vercel
```bash
# Connect repository to Vercel
# Automatic deployments on push
```

#### Netlify
```bash
# Connect repository to Netlify
# Set build command: npm run build
# Set publish directory: dist
```

#### Traditional Server
```bash
npm run build
# Copy dist/ to web server
# Serve with HTTP server
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Fork & Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/Estate_Prestige.git
cd Estate_Prestige
```

### Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### Make Changes & Commit
```bash
git add .
git commit -m "feat: Add amazing feature"
```

### Push & Create Pull Request
```bash
git push origin feature/amazing-feature
# Create PR on GitHub
```

### Code Style Guidelines
- Use TypeScript for all new code
- Follow existing component patterns
- Add comments for complex logic
- Run type checking: `npm run lint`

---

## 📞 Support

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/Sandeep010-hub/Estate_Prestige/issues)
- **Email**: Contact repository owner
- **WhatsApp**: Use in-app WhatsApp advisory feature

### Common Issues

#### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- --port 3001
```

#### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force
# Reinstall
npm install
```

#### TypeScript Errors
```bash
# Run type checking
npm run lint

# Clear TypeScript cache
rm -rf node_modules/.cache
npm install
```

#### Build Fails
```bash
# Clean everything
npm run clean
npm cache clean --force

# Reinstall and rebuild
npm install
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- React team for the amazing UI library
- Vite team for the blazing-fast build tool
- Tailwind CSS for utility-first styling
- Google Gemini for AI capabilities
- All contributors and users

---

## 🚀 Quick Start Recap

```bash
# 1. Clone
git clone https://github.com/Sandeep010-hub/Estate_Prestige.git
cd Estate_Prestige

# 2. Install
npm install

# 3. Configure
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Run
npm run dev

# 5. Open browser
# Navigate to http://localhost:3000
```

---

**Happy Coding! 🎉**

Built with ❤️ by [Sandeep010-hub](https://github.com/Sandeep010-hub)
