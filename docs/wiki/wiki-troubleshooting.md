# Troubleshooting

Common issues, solutions, and debugging tips for Cosmic UI Lite.

## 📋 Quick Diagnostic

### Is it working at all?
```javascript
// Test basic functionality
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';
console.log('CosmicUI loaded:', typeof CosmicUI);

// Test component creation
const testButton = CosmicUI.createButton({
  text: 'Test',
  onClick: () => console.log('Working!')
});

document.body.appendChild(testButton);
```

### Check browser console
1. Open Developer Tools (F12)
2. Look for error messages in Console tab
3. Check Network tab for failed file loads

---

## 🚨 Common Issues

### Build & Installation

#### Error: `npm run build` fails

**Symptoms:**
```
Error: Cannot find module 'rollup'
```

**Solutions:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify Node.js version
node --version  # Should be 16+
npm --version   # Should be 7+

# Try alternative install
npm ci
```

#### Error: TypeScript compilation fails

**Symptoms:**
```
TS2307: Cannot find module './components/CosmicButton'
```

**Solutions:**
```bash
# Check file structure
ls -la src/components/

# Rebuild TypeScript declarations
npm run clean
npm run build

# Verify TypeScript config
cat tsconfig.json
```

#### Error: CSS not processing

**Symptoms:**
- CSS file missing from dist/
- Styles not applying

**Solutions:**
```bash
# Check PostCSS config
cat postcss.config.js

# Verify CSS source exists
ls -la src/styles/

# Manual CSS copy
cp src/styles/cosmic-ui.css dist/
```

### Import & Module Issues

#### Error: Cannot resolve module

**Symptoms:**
```javascript
// This doesn't work
import { CosmicUI } from 'cosmic-ui-lite';
```

**Solutions:**
```javascript
// Use relative path
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

// Or absolute path from project root
import { CosmicUI } from '/lib/cosmic-ui-lite/dist/index.esm.js';

// Check file exists
console.log(window.location.origin + '/cosmic-ui-lite/dist/index.esm.js');
```

#### Error: `CosmicUI is undefined`

**Symptoms:**
```javascript
TypeError: CosmicUI.createButton is not a function
```

**Solutions:**
```javascript
// Check import syntax
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

// Verify import worked
console.log('CosmicUI methods:', Object.keys(CosmicUI));

// Alternative UMD approach
// <script src="./cosmic-ui-lite/dist/index.umd.js"></script>
// const { CosmicUI } = window.CosmicUILite;
```

#### Error: CSS not loading

**Symptoms:**
- Components appear unstyled
- No cosmic effects

**Solutions:**
```html
<!-- Verify CSS path is correct -->
<link rel="stylesheet" href="./cosmic-ui-lite/dist/cosmic-ui.css">

<!-- Check in browser network tab -->
<!-- Should see 200 status for CSS file -->

<!-- Alternative: inline CSS -->
<style>
  @import url('./cosmic-ui-lite/dist/cosmic-ui.css');
</style>
```

### Runtime Issues

#### Error: Buttons don't respond to clicks

**Symptoms:**
- Click events not firing
- Console shows no errors

**Solutions:**
```javascript
// Check event handler syntax
const button = CosmicUI.createButton({
  text: 'Test',
  onClick: () => console.log('Clicked!') // Make sure this is a function
});

// Test programmatic click
button.click();

// Check for CSS pointer-events
button.style.pointerEvents = 'auto';

// Verify button is in DOM
console.log('Button in DOM:', document.contains(button));
```

#### Error: Modals don't show/hide properly

**Symptoms:**
- Modal appears but can't be closed
- Multiple modals stacking

**Solutions:**
```javascript
// Use modal instance methods
const modal = CosmicUI.createModal({...});
modal.show(); // Show the modal
modal.close(); // Close it programmatically

// Check for proper button setup
const modal = CosmicUI.createModal({
  title: 'Test',
  content: 'Test content',
  buttons: [ // Make sure buttons array exists
    { text: 'OK', variant: 'primary' }
  ]
});

// Instance close
modal.close();
```

#### Error: Animations not working

**Symptoms:**
- Components appear static
- No pulsing borders or effects

**Solutions:**
```javascript
// Check CSS custom properties support
console.log(CSS.supports('color', 'var(--cosmic-primary)'));

// Verify animation keyframes loaded
const animations = document.getAnimations();
console.log('Active animations:', animations.length);

// Test CSS animations manually
const test = document.createElement('div');
test.style.animation = 'cosmicPulse 3s infinite';
console.log('Animation applied:', test.style.animation);
```

### Performance Issues

#### Issue: Slow rendering/animations

**Symptoms:**
- Choppy animations
- Long load times
- Browser freezing

**Solutions:**
```javascript
// Limit concurrent animations
const maxAnimations = 10;
let activeAnimations = 0;

// Use requestAnimationFrame for manual animations
function smoothAnimation() {
  if (activeAnimations < maxAnimations) {
    requestAnimationFrame(smoothAnimation);
  }
}

// Monitor performance
console.time('component-creation');
const button = CosmicUI.createButton({...});
console.timeEnd('component-creation');

// Check memory usage
console.log('Memory:', performance.memory);
```

#### Issue: Memory leaks

**Symptoms:**
- Browser memory increasing over time
- Slower performance after extended use

**Solutions:**
```javascript
// Clean up event listeners
const cleanup = () => {
  // Remove components from DOM
  document.querySelectorAll('.cosmic-btn-wrapper').forEach(el => {
    el.remove();
  });
  
  // Clear any intervals/timeouts
  clearInterval(myInterval);
};

// Use WeakMap for component references
const componentCache = new WeakMap();

// Monitor DOM nodes
const observer = new MutationObserver(mutations => {
  console.log('DOM changes:', mutations.length);
});
```

---

## 🔍 Browser Compatibility

### Feature Detection

```javascript
// Check required features
const checkCompatibility = () => {
  const features = {
    cssGrid: CSS.supports('display', 'grid'),
    cssCustomProperties: CSS.supports('color', 'var(--test)'),
    es6Modules: typeof import !== 'undefined',
    svg: !!document.createElementNS,
    animations: 'Animation' in window
  };
  
  console.table(features);
  return Object.values(features).every(Boolean);
};

if (!checkCompatibility()) {
  console.warn('Some features may not work in this browser');
}
```

### Polyfills

```html
<!-- For older browsers -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,css-grid,IntersectionObserver"></script>

<!-- CSS Grid fallback -->
<style>
  .fallback-layout {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
```

### Browser-Specific Issues

#### Safari
```javascript
// Safari animation fix
const safariAnimationFix = () => {
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.querySelectorAll('.cosmic-border').forEach(el => {
      el.style.webkitAnimation = el.style.animation;
    });
  }
};
```

#### Internet Explorer (Legacy)
```html
<!-- IE11 polyfills -->
<script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3/minified.js"></script>
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3/dist/fetch.umd.js"></script>
```

---

## 🛠️ Development Tools

### Debug Mode

```javascript
// Enable debug logging
window.COSMIC_DEBUG = true;

// Custom debug logger
const debug = {
  log: (...args) => {
    if (window.COSMIC_DEBUG) {
      console.log('[Cosmic UI]', ...args);
    }
  },
  error: (...args) => {
    console.error('[Cosmic UI Error]', ...args);
  }
};

// Add to components
const createDebugButton = (options) => {
  debug.log('Creating button with options:', options);
  const button = CosmicUI.createButton(options);
  debug.log('Button created:', button);
  return button;
};
```

### Component Inspector

```javascript
// Inspect component structure
const inspectComponent = (element) => {
  const info = {
    tagName: element.tagName,
    classes: Array.from(element.classList),
    children: element.children.length,
    animations: element.getAnimations().map(a => a.animationName),
    computedStyle: window.getComputedStyle(element)
  };
  
  console.group('Component Inspector');
  console.log('Element:', element);
  console.table(info);
  console.groupEnd();
};

// Usage
document.addEventListener('click', (e) => {
  if (e.shiftKey && e.ctrlKey) {
    inspectComponent(e.target);
  }
});
```

### Performance Monitor

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      componentCreations: 0,
      modalOpens: 0,
      averageCreationTime: 0
    };
  }
  
  startTimer(operation) {
    return performance.now();
  }
  
  endTimer(operation, startTime) {
    const duration = performance.now() - startTime;
    console.log(`${operation} took ${duration.toFixed(2)}ms`);
    return duration;
  }
  
  trackComponentCreation(fn) {
    const start = this.startTimer('Component Creation');
    const result = fn();
    const duration = this.endTimer('Component Creation', start);
    
    this.metrics.componentCreations++;
    this.metrics.averageCreationTime = 
      (this.metrics.averageCreationTime + duration) / this.metrics.componentCreations;
    
    return result;
  }
}

const monitor = new PerformanceMonitor();

// Wrap component creation
const monitoredCreateButton = (options) => {
  return monitor.trackComponentCreation(() => CosmicUI.createButton(options));
};
```

---

## 📞 Getting Help

### Information to Include

When reporting issues, please provide:

1. **Environment Information**
```javascript
// Copy this output when reporting
console.log({
  userAgent: navigator.userAgent,
  viewport: `${window.innerWidth}x${window.innerHeight}`,
  cosmicUIVersion: '1.0.0', // Check your version
  nodeVersion: 'node --version output',
  npmVersion: 'npm --version output'
});
```

2. **Error Details**
- Full error message and stack trace
- Steps to reproduce
- Expected vs actual behavior
- Code snippet that causes the issue

3. **Console Output**
- Browser console errors
- Network tab showing failed requests
- Any warning messages

### Self-Diagnosis Checklist

Before reporting an issue:

- [ ] Built the library with `npm run build`
- [ ] Cleared browser cache and hard refresh
- [ ] Checked browser console for errors
- [ ] Verified file paths are correct
- [ ] Tested in multiple browsers
- [ ] Read the documentation relevant to your issue
- [ ] Searched existing issues on GitHub

### Community Resources

- **GitHub Issues**: [Report bugs and request features](https://github.com/fuR-Gaming/cosmic-ui-lite/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/fuR-Gaming/cosmic-ui-lite/discussions)
- **Wiki**: [Browse comprehensive documentation](https://github.com/fuR-Gaming/cosmic-ui-lite/wiki)

### Quick Fixes

```javascript
// Emergency fallback - minimal working setup
if (typeof CosmicUI === 'undefined') {
  window.CosmicUI = {
    createButton: (opts) => {
      const btn = document.createElement('button');
      btn.textContent = opts.text;
      btn.onclick = opts.onClick;
      btn.className = 'fallback-button';
      return btn;
    }
  };
}
```

---

## 🔧 Advanced Debugging

### Custom Error Handler

```javascript
window.addEventListener('error', (event) => {
  if (event.filename && event.filename.includes('cosmic-ui')) {
    console.group('🚨 Cosmic UI Error');
    console.error('Message:', event.message);
    console.error('File:', event.filename);
    console.error('Line:', event.lineno, 'Column:', event.colno);
    console.error('Stack:', event.error?.stack);
    console.groupEnd();
    
    // Optional: Send to analytics
    // analytics.track('cosmic_ui_error', { message: event.message });
  }
});
```

### Component Health Check

```javascript
const healthCheck = () => {
  const issues = [];
  
  // Check for missing CSS
  if (!document.querySelector('link[href*="cosmic-ui.css"]')) {
    issues.push('CSS file not loaded');
  }
  
  // Check for component count
  const components = document.querySelectorAll('[class*="cosmic-"]').length;
  if (components === 0) {
    issues.push('No cosmic components found');
  }
  
  // Check for JavaScript errors
  const errors = window.cosmicUIErrors || [];
  if (errors.length > 0) {
    issues.push(`${errors.length} JavaScript errors`);
  }
  
  console.log(issues.length === 0 ? '✅ Health check passed' : '❌ Issues found:', issues);
  return issues.length === 0;
};

// Run health check
setTimeout(healthCheck, 1000);
```