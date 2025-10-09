# Installation & Setup

Complete guide to installing and setting up Cosmic UI Lite in your project.

## 📋 Prerequisites

- **Node.js** 16+ (for development and building)
- **npm** or **yarn** package manager
- **TypeScript** 4.0+ (optional but recommended)
- **Modern browser** with ES6+ support

## 🚀 Quick Installation

### Method 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/fuR-Gaming/cosmic-ui-lite.git
cd cosmic-ui-lite

# Install dependencies
npm install

# Build the library
npm run build
```

### Method 2: Download Release

1. Go to [Releases](https://github.com/fuR-Gaming/cosmic-ui-lite/releases)
2. Download the latest release archive
3. Extract to your project directory
4. Run `npm install && npm run build`

### Method 3: Git Submodule

```bash
# Add as submodule
git submodule add https://github.com/fuR-Gaming/cosmic-ui-lite.git lib/cosmic-ui-lite
cd lib/cosmic-ui-lite
npm install && npm run build
```

## 📁 Directory Structure After Installation

```
cosmic-ui-lite/
├── src/                   # Source TypeScript files
├── dist/                  # Built output (generated after npm run build)
│   ├── index.esm.js       # ES Module build
│   ├── index.cjs.js       # CommonJS build
│   ├── index.umd.js       # UMD browser build
│   ├── index.d.ts         # TypeScript declarations
│   └── cosmic-ui.css      # Processed styles
├── package.json           # Dependencies and scripts
└── rollup.config.js       # Build configuration
```

## ⚙️ Build Commands

```bash
# One-time build
npm run build

# Watch mode for development
npm run build:watch
# or
npm run dev

# Build and run demo
npm run demo

# Clean build output
npm run clean
```

## 📦 Integration Methods

### ES Modules (Recommended)

```typescript
import { CosmicUI } from './path/to/cosmic-ui-lite/dist/index.esm.js';
import { CosmicButton, CosmicModal } from './path/to/cosmic-ui-lite/dist/index.esm.js';
```

### CommonJS (Node.js)

```javascript
const { CosmicUI } = require('./path/to/cosmic-ui-lite/dist/index.cjs.js');
```

### UMD (Browser Script Tag)

```html
<script src="./path/to/cosmic-ui-lite/dist/index.umd.js"></script>
<script>
  const { CosmicUI } = window.CosmicUILite;
</script>
```

## 🎨 CSS Integration

### Method 1: Link Tag (Recommended)

```html
<link rel="stylesheet" href="./path/to/cosmic-ui-lite/dist/cosmic-ui.css">
```

### Method 2: CSS Import

```css
@import url('./path/to/cosmic-ui-lite/dist/cosmic-ui.css');
```

### Method 3: JavaScript Import (Webpack/Bundler)

```typescript
import './path/to/cosmic-ui-lite/dist/cosmic-ui.css';
```

## 🔧 Framework Integration

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./cosmic-ui-lite/dist/cosmic-ui.css">
</head>
<body>
    <div id="app"></div>
    
    <script src="./cosmic-ui-lite/dist/index.umd.js"></script>
    <script>
        const { CosmicUI } = window.CosmicUILite;
        
        const button = CosmicUI.createButton({
            text: 'Hello Cosmos',
            variant: 'primary'
        });
        
        document.getElementById('app').appendChild(button);
    </script>
</body>
</html>
```

### TypeScript Project

```typescript
// types.d.ts (if using modules)
declare module '*cosmic-ui-lite*' {
  export * from './path/to/cosmic-ui-lite/dist/index';
}

// main.ts
import { CosmicUI } from './lib/cosmic-ui-lite/dist/index.esm.js';
import './lib/cosmic-ui-lite/dist/cosmic-ui.css';

const app = document.getElementById('app')!;

const button = CosmicUI.createButton({
  text: 'Launch Sequence',
  variant: 'primary',
  onClick: () => console.log('Launched!')
});

app.appendChild(button);
```

### Webpack Project

```javascript
// webpack.config.js
module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

// main.js
import { CosmicUI } from './lib/cosmic-ui-lite/dist/index.esm.js';
import './lib/cosmic-ui-lite/dist/cosmic-ui.css';
```

### Vite Project

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  // Vite handles CSS and ES modules automatically
});

// main.ts
import { CosmicUI } from './lib/cosmic-ui-lite/dist/index.esm.js';
import './lib/cosmic-ui-lite/dist/cosmic-ui.css';
```

## 🎮 Game Engine Integration

### Phaser 3

```typescript
// preload.js
class PreloadScene extends Phaser.Scene {
  preload() {
    // Phaser handles the game canvas
    // UI overlays use DOM elements
  }
}

// game.js
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

class GameScene extends Phaser.Scene {
  create() {
    // Create cosmic UI overlay
    const uiContainer = document.getElementById('ui-overlay');
    
    const button = CosmicUI.createButton({
      text: 'Pause Game',
      variant: 'secondary',
      onClick: () => this.scene.pause()
    });
    
    uiContainer.appendChild(button);
  }
}
```

### PixiJS

```typescript
import * as PIXI from 'pixi.js';
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

const app = new PIXI.Application();
document.body.appendChild(app.view);

// Cosmic UI as DOM overlay
const uiContainer = document.createElement('div');
uiContainer.style.position = 'absolute';
uiContainer.style.top = '0';
uiContainer.style.left = '0';
uiContainer.style.pointerEvents = 'none';
document.body.appendChild(uiContainer);

const button = CosmicUI.createButton({
  text: 'Settings',
  variant: 'primary'
});
button.style.pointerEvents = 'auto';
uiContainer.appendChild(button);
```

### Unity WebGL

```typescript
// unity-bridge.ts
declare global {
  interface Window {
    unityInstance: any;
  }
}

import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

// Create UI overlay for Unity game
const overlay = document.createElement('div');
overlay.id = 'cosmic-ui-overlay';
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.pointerEvents = 'none';

document.body.appendChild(overlay);

// Unity can call these functions
window.CosmicUIBridge = {
  showModal: (title: string, content: string) => {
    const modal = CosmicUI.createModal({
      title,
      content,
      buttons: [{ text: 'OK', variant: 'primary' }]
    });
    modal.show();
  }
};
```

## ✅ Verification

Test your installation:

```typescript
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

// Create test button
const testButton = CosmicUI.createButton({
  text: 'Installation Test',
  variant: 'primary',
  onClick: () => alert('Cosmic UI Lite is working!')
});

document.body.appendChild(testButton);
```

## 🔍 Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
npm run clean
npm run build
```

### Module Resolution Issues

```typescript
// Add to tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### CSS Not Loading

1. Verify CSS file path is correct
2. Check browser network tab for 404 errors
3. Ensure CSS is loaded after HTML elements are created

### TypeScript Errors

```bash
# Ensure TypeScript declarations are built
npm run build

# Check dist/index.d.ts exists
ls -la dist/
```

## 📱 Browser Support

### Minimum Requirements
- **Chrome** 60+ (2017)
- **Firefox** 55+ (2017)  
- **Safari** 11+ (2017)
- **Edge** 79+ (2020)

### Feature Dependencies
- **CSS Grid**: Layout system
- **CSS Custom Properties**: Theming
- **ES6 Modules**: Import/export
- **SVG**: Graphics rendering

### Polyfills (if needed)

```html
<!-- For older browsers -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,css-grid"></script>
```

## 🚀 Next Steps

- [Quick Start Guide](Quick-Start-Guide) - Create your first components
- [Component Reference](Component-Reference) - Explore all components
- [Complete Examples](Complete-Examples) - See real implementations

## 💡 Tips

- **Development**: Use `npm run build:watch` for rapid iteration
- **Production**: Always run `npm run build` for optimized output
- **TypeScript**: Use declaration files for better IDE support
- **Performance**: Load CSS early, JavaScript modules as needed