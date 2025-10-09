# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Cosmic UI Lite** - a lightweight, zero-dependency TypeScript UI component library for futuristic/space-themed interfaces. Built with Rollup for optimal library distribution, providing SVG-based components with animated gradients, cosmic effects, and responsive design.

## Development Commands

### Build System
```bash
npm run build           # Build all output formats (ESM, CJS, UMD, types)
npm run build:watch     # Watch mode for development
npm run dev             # Alias for build:watch
npm run clean           # Clean dist directory
npm run demo            # Build and run demo system
```

### Build Pipeline
- **Rollup-based** build system with multiple output formats
- **TypeScript compilation** with declaration files
- **CSS processing** with PostCSS and minification
- **Tree-shaking support** for optimal bundle sizes

## Architecture Overview

### Project Structure
```
src/
├── components/          # Individual component classes
│   ├── CosmicButton.ts
│   ├── CosmicModal.ts
│   ├── CosmicCard.ts
│   ├── CosmicInfo.ts
│   └── CosmicTag.ts
├── utils/              # Shared utilities
│   ├── svg.ts          # SVG creation helpers
│   └── gradients.ts    # Gradient definitions & SVG elements
├── types/              # TypeScript definitions
│   └── index.ts
├── styles/             # CSS and styling
│   └── cosmic-ui.css
├── demo/               # Demo system
│   └── index.ts
└── index.ts            # Main entry point with CosmicUI class
```

### Modular Architecture
The library follows a modular architecture with strict separation of concerns:
- **Component Classes** - Individual component creators (CosmicButton, CosmicModal, etc.)
- **Utility Modules** - Shared SVG helpers and gradient generators
- **Type Definitions** - Complete TypeScript interfaces and types
- **Main Class** - CosmicUI static class for backward compatibility
- **Build Output** - Multiple formats (ESM, CJS, UMD) in `dist/`

### Component Architecture
Each component uses a consistent 4-layer structure:
1. **Wrapper Element** - Container with positioning and hover effects
2. **SVG Background** - Animated gradient fill using predefined paths
3. **SVG Border** - Animated outline with cosmic effects  
4. **Content Layer** - Text, buttons, and interactive elements

### SVG System
Components share a centralized SVG system in `src/utils/`:
- **svg.ts** - Core SVG creation utilities (`createSvgElement`, `createGradient`, `createPath`)
- **gradients.ts** - Gradient definitions and SVG element creation helpers
- **Path Definitions** - Reusable SVG paths in `PATHS` object for consistent shapes
- **ViewBox Standards** - Consistent dimensions in `VIEW_BOXES` object
- **Component-Specific Gradients** - Type-specific gradient stops (card, modal, info, button, tag)

### Type System
Comprehensive TypeScript support with:
- **Component Options** - Interfaces for each component type (Button, Modal, Card, Info, Tag)
- **Event Handlers** - Standardized callback interfaces
- **Theme Types** - Color themes and variants
- **Configuration Interfaces** - Animation, responsive, and CSS class definitions

## Component Categories

### Interactive Components
- **Button** - 4 variants (default, primary, secondary, danger) with hover effects
- **Modal** - Full-featured with backdrop, animations, required button array
- **Confirmation/Error/Notification** - Utility modals with predefined behaviors

### Display Components  
- **Card** - Content containers with hover effects
- **Info** - Overlay popups with 5 title color themes
- **Tag** - Location/status tags with flip orientation and auto-dismiss

## Key Implementation Details

### SVG Path System
- All shapes use predefined SVG paths stored in `PATHS` object
- Modal and tag components share `MODAL_BACKGROUND`/`MODAL_BORDER` paths
- Buttons use dedicated `BUTTON_BACKGROUND`/`BUTTON_BORDER` paths
- Consistent viewBox dimensions in `VIEW_BOXES` object

### Animation Layers
Three animation systems work together:
1. **Particle Flash** - Moving gradient backgrounds (8s cycle)
2. **Cosmic Pulse** - Border color cycling (3s alternate)  
3. **Hover Effects** - Transform and glow changes on interaction

### Responsive Design
CSS media queries handle responsive behavior:
- Desktop: Full size and effects
- Tablet (≤580px): Scaled components
- Mobile (≤480px): Compressed layout
- Small (≤430px): Ultra-compact mode

### Event Handling
- **Modal API**: Instance-based with `.show()` and `.close()` methods
- **Modal close**: Click overlay, Escape key, or close button
- **Auto-cleanup**: Event listeners removed on component destruction
- **Button interactions**: Support for disabled state and custom onClick handlers

## Distribution & Usage

### Package Exports
The library provides multiple export formats:
- **ESM**: `dist/index.esm.js` - Modern ES modules
- **CJS**: `dist/index.cjs.js` - CommonJS for Node.js 
- **UMD**: `dist/index.umd.js` - Universal module for browsers
- **Types**: `dist/index.d.ts` - TypeScript declarations
- **CSS**: `dist/cosmic-ui.css` - Component styles

### Usage Patterns

#### Library Import (Post-build)
```typescript
import { CosmicUI } from 'cosmic-ui-lite';
// CSS is automatically imported with the main module

const button = CosmicUI.createButton({
  text: 'Launch',
  variant: 'primary',
  onClick: () => console.log('Clicked!')
});
```

#### Individual Component Import
```typescript
import { CosmicButton, CosmicModal } from 'cosmic-ui-lite';

const button = CosmicButton.create({ text: 'Launch', variant: 'primary' });
const modal = CosmicModal.create({ title: 'Test', content: 'Content', buttons: [...] });
modal.show(); // Show the modal
modal.close(); // Close it programmatically
```

#### Demo System Usage
```typescript
import { createCosmicDemo } from 'cosmic-ui-lite';
createCosmicDemo(); // Adds floating demo panel with component tests
```

## Important Development Notes

### Build Requirements
- **Build First**: Run `npm run build` before testing or publishing
- **CSS Bundling**: CSS automatically processed and bundled during build
- **Multiple Outputs**: Supports ESM, CJS, UMD formats for different consumers
- **TypeScript Declarations**: Generated automatically during build process

### Development Guidelines
- **Modular Components**: Each component is self-contained in separate files
- **Shared Utilities**: Use `src/utils/` for common SVG and gradient functions
- **Modal Buttons Required**: Modals require buttons array for proper layout (console warning if omitted)
- **Modal API**: Modals use instance methods - `.show()` to display, `.close()` to dismiss
- **Zero Runtime Dependencies**: Pure vanilla TypeScript with no external runtime dependencies
- **SVG-Based**: All shapes use SVG paths for crisp rendering at any scale

### Build Output Structure
```
dist/
├── index.esm.js        # ES Module build
├── index.cjs.js        # CommonJS build  
├── index.umd.js        # UMD build for browsers
├── index.d.ts          # TypeScript declarations
├── cosmic-ui.css       # Processed and minified styles
└── demo/               # Built demo system
    └── index.js
```