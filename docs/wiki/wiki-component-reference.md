# Component Reference

Complete API reference for all Cosmic UI Lite components with detailed examples and options.

## 📋 Table of Contents

- [CosmicButton](#cosmicbutton)
- [CosmicModal](#cosmicmodal)
- [CosmicCard](#cosmiccard)
- [CosmicInfo](#cosmicinfo)
- [CosmicTag](#cosmictag)
- [Utility Methods](#utility-methods)
- [Type Definitions](#type-definitions)

---

## CosmicButton

Animated buttons with cosmic styling and multiple variants.

### Interface

```typescript
interface CosmicButtonOptions {
  text: string;                                    // Button text content
  variant?: 'default' | 'primary' | 'secondary' | 'danger'; // Visual style
  onClick?: () => void;                           // Click handler function
  disabled?: boolean;                             // Disabled state
  className?: string;                             // Additional CSS classes
}
```

### Usage

```typescript
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

const button = CosmicUI.createButton({
  text: 'Launch Sequence',
  variant: 'primary',
  onClick: () => {
    console.log('Button clicked!');
    // Your logic here
  },
  disabled: false,
  className: 'my-custom-class'
});

// Add to DOM
document.body.appendChild(button);
```

### Variants

#### Default
```typescript
const defaultButton = CosmicUI.createButton({
  text: 'Standard Action',
  variant: 'default'
});
```
- **Colors**: Electric blue theme
- **Use Case**: Regular actions, navigation

#### Primary  
```typescript
const primaryButton = CosmicUI.createButton({
  text: 'Primary Action',
  variant: 'primary'
});
```
- **Colors**: Enhanced blue with stronger glow
- **Use Case**: Main actions, confirmation

#### Secondary
```typescript
const secondaryButton = CosmicUI.createButton({
  text: 'Secondary Action', 
  variant: 'secondary'
});
```
- **Colors**: Solar orange theme
- **Use Case**: Alternative actions, cancel

#### Danger
```typescript
const dangerButton = CosmicUI.createButton({
  text: 'Delete Item',
  variant: 'danger'
});
```
- **Colors**: Alert red theme  
- **Use Case**: Destructive actions, warnings

### Advanced Examples

#### Disabled State
```typescript
const disabledButton = CosmicUI.createButton({
  text: 'Processing...',
  variant: 'primary',
  disabled: true,
  onClick: () => console.log('This won\'t fire')
});
```

#### Custom Styling
```typescript
const customButton = CosmicUI.createButton({
  text: 'Custom Button',
  className: 'large-button pulse-effect'
});

// Additional CSS
// .large-button { transform: scale(1.2); }
// .pulse-effect { animation: pulse 2s infinite; }
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | - | Button text (required) |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'default'` | Visual theme |
| `onClick` | `() => void` | `undefined` | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional CSS classes |

---

## CosmicModal

Full-featured modals with backdrop blur, animations, and flexible content.

### Interface

```typescript
interface CosmicModalOptions {
  title: string;                                  // Modal title
  content: string | HTMLElement;                  // Body content
  showCloseButton?: boolean;                      // Show X button (default: true)
  buttons: CosmicButtonOptions[];                 // Footer buttons (required)
  onClose?: () => void;                          // Close callback
  className?: string;                             // Additional CSS classes
}
```

### Usage

```typescript
const modal = CosmicUI.createModal({
  title: 'Mission Control',
  content: 'Ready for launch sequence?',
  buttons: [
    { 
      text: 'Cancel', 
      variant: 'secondary',
      onClick: () => console.log('Cancelled')
    },
    { 
      text: 'Launch', 
      variant: 'primary',
      onClick: () => {
        console.log('Launching!');
        // Launch logic
      }
    }
  ],
  onClose: () => console.log('Modal closed'),
  showCloseButton: true
});

// Show the modal
modal.show();
```

### Advanced Examples

#### HTML Content
```typescript
const htmlModal = CosmicUI.createModal({
  title: 'Ship Status',
  content: `
    <div class="status-panel">
      <h3>System Status</h3>
      <ul>
        <li>🟢 Navigation: Online</li>
        <li>🟢 Life Support: Online</li>
        <li>🟡 Weapons: Charging</li>
        <li>🔴 Shields: Offline</li>
      </ul>
      <p><strong>Ready for departure</strong></p>
    </div>
  `,
  buttons: [{ text: 'Acknowledge', variant: 'primary' }]
});
```

#### Element Content
```typescript
const contentDiv = document.createElement('div');
contentDiv.innerHTML = '<p>Dynamic content</p>';

const elementModal = CosmicUI.createModal({
  title: 'Dynamic Modal',
  content: contentDiv,
  buttons: [{ text: 'OK', variant: 'primary' }]
});
```

#### No Close Button
```typescript
const forcedModal = CosmicUI.createModal({
  title: 'Critical Alert',
  content: 'You must make a choice.',
  showCloseButton: false,
  buttons: [
    { text: 'Option A', variant: 'primary' },
    { text: 'Option B', variant: 'secondary' }
  ]
});
```

### Modal Methods

```typescript
// Create modal
const modal = CosmicUI.createModal(options);

// Show modal
modal.show();

// Close modal programmatically
modal.close();

// Create and show in one call
const quickModal = CosmicUI.createModal(options);
quickModal.show();
```

### Close Behavior

Modals can be closed by:
1. **X Button** (if `showCloseButton: true`)
2. **Escape Key** 
3. **Clicking Backdrop**
4. **Button Click** (automatic unless button has `no-auto-close` class)
5. **Programmatic Call** (`CosmicModal.close()`)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | - | Modal title (required) |
| `content` | `string \| HTMLElement` | - | Body content (required) |
| `buttons` | `CosmicButtonOptions[]` | - | Footer buttons (required) |
| `showCloseButton` | `boolean` | `true` | Show X close button |
| `onClose` | `() => void` | `undefined` | Close callback |
| `className` | `string` | `''` | Additional CSS classes |

---

## CosmicCard

Content cards with animated cosmic borders and hover effects.

### Interface

```typescript
interface CosmicCardOptions {
  title?: string;                                 // Optional card title
  content: string | HTMLElement;                  // Card content
  className?: string;                             // Additional CSS classes
}
```

### Usage

```typescript
const card = CosmicUI.createCard({
  title: 'Ship Systems',
  content: `
    <div class="system-info">
      <p><strong>Hull Integrity:</strong> 98%</p>
      <p><strong>Power Level:</strong> 87%</p>
      <p><strong>Crew Status:</strong> All stations manned</p>
    </div>
  `,
  className: 'status-card'
});

document.body.appendChild(card);
```

### Advanced Examples

#### Title-Only Card
```typescript
const titleCard = CosmicUI.createCard({
  title: 'Mission Objective',
  content: 'Reach the outer rim of the galaxy and establish contact with alien civilizations.'
});
```

#### Content-Only Card
```typescript
const contentCard = CosmicUI.createCard({
  content: `
    <div class="notification">
      <h3>Incoming Transmission</h3>
      <p>Unknown vessel approaching on vector 127.4</p>
      <small>Received: 2387.12.04 14:23:47</small>
    </div>
  `
});
```

#### Interactive Card
```typescript
const interactiveCard = CosmicUI.createCard({
  title: 'Navigation Console',
  content: `
    <div class="nav-controls">
      <button onclick="setDestination()">Set Destination</button>
      <button onclick="engage()">Engage</button>
      <div class="coordinates">
        <label>X: <input type="number" value="127.4"></label>
        <label>Y: <input type="number" value="89.2"></label>
        <label>Z: <input type="number" value="45.8"></label>
      </div>
    </div>
  `,
  className: 'interactive-card'
});
```

### Styling Cards

```css
/* Custom card styling */
.status-card {
  width: 300px;
  margin: 20px;
}

.interactive-card .nav-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.interactive-card input {
  width: 60px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid #00d4ff;
  color: white;
  padding: 4px;
}
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `undefined` | Optional card title |
| `content` | `string \| HTMLElement` | - | Card content (required) |
| `className` | `string` | `''` | Additional CSS classes |

---

## CosmicInfo

Overlay information popups with customizable title colors and backdrop options.

### Interface

```typescript
interface CosmicInfoOptions {
  title?: string;                                 // Optional title
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'golden-red'; // Title theme
  content: string | HTMLElement;                  // Info content
  className?: string;                             // Additional CSS classes
  onClose?: () => void;                          // Close callback
  showOverlay?: boolean;                         // Show backdrop overlay
}
```

### Usage

```typescript
const info = CosmicUI.createInfo({
  title: 'Navigation Update',
  titleColor: 'blue',
  content: 'Course correction complete. New ETA: 14:30 hours.',
  showOverlay: true,
  onClose: () => console.log('Info closed')
});

// Show the info popup
document.body.appendChild(info);
```

### Title Colors

#### Yellow (Golden Shimmer)
```typescript
const yellowInfo = CosmicUI.createInfo({
  title: 'WARNING',
  titleColor: 'yellow',
  content: 'Asteroid field detected ahead.'
});
```

#### Green (Sci-Fi Bright)
```typescript
const greenInfo = CosmicUI.createInfo({
  title: 'SYSTEMS ONLINE',
  titleColor: 'green', 
  content: 'All ship systems functioning normally.'
});
```

#### Blue (Electric Cyberpunk)
```typescript
const blueInfo = CosmicUI.createInfo({
  title: 'DATA LINK',
  titleColor: 'blue',
  content: 'Connected to galactic network.'
});
```

#### Purple (Mystic Gradient)
```typescript
const purpleInfo = CosmicUI.createInfo({
  title: 'ANOMALY DETECTED',
  titleColor: 'purple',
  content: 'Unknown energy signature in sector 7.'
});
```

#### Golden-Red (Fiery Blend)
```typescript
const goldenRedInfo = CosmicUI.createInfo({
  title: 'CRITICAL ALERT',
  titleColor: 'golden-red',
  content: 'Hull breach in engineering section!'
});
```

### Advanced Examples

#### No Title
```typescript
const noTitleInfo = CosmicUI.createInfo({
  content: `
    <div class="mission-briefing">
      <p>Mission parameters updated:</p>
      <ul>
        <li>Primary objective: Complete</li>
        <li>Secondary objective: In progress</li>
        <li>Optional objective: Available</li>
      </ul>
    </div>
  `,
  showOverlay: false
});
```

#### Interactive Info
```typescript
const interactiveInfo = CosmicUI.createInfo({
  title: 'COMMUNICATION',
  titleColor: 'green',
  content: `
    <div class="comm-panel">
      <p><strong>Incoming Message:</strong></p>
      <p>"This is Captain Reynolds. Respond immediately."</p>
      <div class="comm-buttons">
        <button onclick="respond()">Respond</button>
        <button onclick="ignore()">Ignore</button>
        <button onclick="block()">Block</button>
      </div>
    </div>
  `,
  showOverlay: true
});
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `undefined` | Optional title |
| `titleColor` | `'yellow' \| 'green' \| 'blue' \| 'purple' \| 'golden-red'` | `'blue'` | Title color theme |
| `content` | `string \| HTMLElement` | - | Info content (required) |
| `showOverlay` | `boolean` | `false` | Show backdrop overlay |
| `onClose` | `() => void` | `undefined` | Close callback |
| `className` | `string` | `''` | Additional CSS classes |

---

## CosmicTag

Location tags with flip animations, auto-dismiss, and positioning options.

### Interface

```typescript
interface CosmicTagOptions {
  title?: string;                                 // Optional tag title
  content: string | HTMLElement;                  // Tag content
  className?: string;                             // Additional CSS classes
  flipped?: boolean;                             // Horizontal flip
}
```

### Usage

```typescript
const tag = CosmicUI.createTag({
  title: 'TARGET ACQUIRED',
  content: `
    <div class="target-info">
      <h4>Mars Colony</h4>
      <p>Population: 1.2M</p>
      <p>Status: Friendly</p>
      <p>Distance: 4.7 AU</p>
    </div>
  `,
  flipped: false
});

// Position and add to DOM
tag.style.position = 'fixed';
tag.style.top = '100px';
tag.style.left = '200px';
document.body.appendChild(tag);
```

### Advanced Examples

#### Flipped Tag
```typescript
const flippedTag = CosmicUI.createTag({
  title: 'HOSTILE DETECTED',
  content: `
    <div class="threat-info">
      <h4>Klingon Warbird</h4>
      <p>Class: D'deridex</p>
      <p>Shields: 100%</p>
      <p>Weapons: Armed</p>
    </div>
  `,
  flipped: true // Flips horizontally
});
```

#### Location Array
```typescript
const locations = [
  { name: 'Earth', population: '7.8B', threat: 'GREEN' },
  { name: 'Alpha Centauri', population: '2.1M', threat: 'YELLOW' },
  { name: 'Vega System', population: 'Unknown', threat: 'RED' }
];

locations.forEach((location, index) => {
  const tag = CosmicUI.createTag({
    title: `LOCATION ${index + 1}`,
    content: `
      <div class="location-data">
        <h3>${location.name}</h3>
        <p><strong>Population:</strong> ${location.population}</p>
        <p><strong>Threat Level:</strong> ${location.threat}</p>
        <p><strong>Status:</strong> SCANNING...</p>
      </div>
    `,
    flipped: index % 2 === 0
  });
  
  // Random positioning
  tag.style.position = 'fixed';
  tag.style.top = `${50 + index * 120}px`;
  tag.style.left = `${100 + Math.random() * 300}px`;
  tag.style.zIndex = '1000';
  
  document.body.appendChild(tag);
});
```

#### Auto-Dismiss Tags
```typescript
const createTimedTag = (message: string, duration: number = 3000) => {
  const tag = CosmicUI.createTag({
    title: 'NOTIFICATION',
    content: `<p>${message}</p>`
  });
  
  tag.style.position = 'fixed';
  tag.style.top = '20px';
  tag.style.right = '20px';
  
  document.body.appendChild(tag);
  
  // Auto-remove after duration
  setTimeout(() => {
    if (tag.parentNode) {
      tag.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => tag.remove(), 300);
    }
  }, duration);
  
  return tag;
};

// Usage
createTimedTag('Message received from Command', 3000);
```

### Styling Tags

```css
/* Position tags */
.cosmic-tag {
  position: fixed;
  z-index: 1000;
}

/* Custom tag animations */
@keyframes slideInFromRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.slide-in-tag {
  animation: slideInFromRight 0.5s ease-out;
}

/* Responsive tag sizing */
@media (max-width: 768px) {
  .cosmic-tag {
    max-width: 80vw;
    font-size: 0.9em;
  }
}
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `undefined` | Optional tag title |
| `content` | `string \| HTMLElement` | - | Tag content (required) |
| `flipped` | `boolean` | `false` | Horizontal flip |
| `className` | `string` | `''` | Additional CSS classes |

---

## Utility Methods

Convenient methods for common UI patterns.

### Modal Instance Methods

Modals use instance methods for display control.

```typescript
const modal = CosmicUI.createModal({...});
modal.show();  // Show the modal
modal.close(); // Close it programmatically
```

### showError(title, message)

Shows a pre-configured error dialog.

```typescript
CosmicUI.showError(
  'System Failure',
  'Unable to connect to navigation systems. Please check your connection.'
);
```

### showConfirmation(title, message, onConfirm, onCancel)

Shows a confirmation dialog with Yes/No options.

```typescript
CosmicUI.showConfirmation(
  'Eject Warp Core',
  'This action will disable faster-than-light travel. Are you sure?',
  () => {
    console.log('Warp core ejected');
    // Eject logic
  },
  () => {
    console.log('Ejection cancelled');
  }
);
```

### showNotification(title, message)

Shows a toast-style notification.

```typescript
CosmicUI.showNotification(
  'Mission Complete',
  'Successfully docked at space station Omega-7'
);
```

---

## Type Definitions

Complete TypeScript interfaces for all components.

### Core Interfaces

```typescript
interface CosmicButtonOptions {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface CosmicModalOptions {
  title: string;
  content: string | HTMLElement;
  showCloseButton?: boolean;
  buttons: CosmicButtonOptions[];
  onClose?: () => void;
  className?: string;
}

interface CosmicCardOptions {
  title?: string;
  content: string | HTMLElement;
  className?: string;
}

interface CosmicInfoOptions {
  title?: string;
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'golden-red';
  content: string | HTMLElement;
  className?: string;
  onClose?: () => void;
  showOverlay?: boolean;
}

interface CosmicTagOptions {
  title?: string;
  content: string | HTMLElement;
  className?: string;
  flipped?: boolean;
}
```

### Main Class

```typescript
declare class CosmicUI {
  static createButton(options: CosmicButtonOptions): HTMLDivElement;
  static createModal(options: CosmicModalOptions): CosmicModal;
  static createCard(options: CosmicCardOptions): HTMLDivElement;
  static createInfo(options: CosmicInfoOptions): HTMLDivElement;
  static createTag(options: CosmicTagOptions): HTMLDivElement;

  static showError(title: string, message: string): void;
  static showConfirmation(title: string, message: string, onConfirm?: () => void, onCancel?: () => void): void;
  static showNotification(title: string, message: string): void;
}

declare class CosmicModal {
  static create(options: CosmicModalOptions): CosmicModal;
  show(): void;
  close(): void;
}
```

### Individual Component Classes

```typescript
declare class CosmicButton {
  static create(options: CosmicButtonOptions): HTMLDivElement;
}

declare class CosmicModal {
  static create(options: CosmicModalOptions): HTMLDivElement;
  static show(modal: HTMLDivElement): void;
  static close(modal: HTMLDivElement): void;
}

declare class CosmicCard {
  static create(options: CosmicCardOptions): HTMLDivElement;
}

declare class CosmicInfo {
  static create(options: CosmicInfoOptions): HTMLDivElement;
}

declare class CosmicTag {
  static create(options: CosmicTagOptions): HTMLDivElement;
}
```

---

## 🚀 Next Steps

- [Complete Examples](Complete-Examples) - See full implementations
- [Styling & Theming](Styling-&-Theming) - Customize the appearance  
- [Game Integration](Game-Integration) - Use with game engines
- [API Reference](API-Reference) - Low-level API documentation