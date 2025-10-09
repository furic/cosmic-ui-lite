# Complete Examples

Real-world implementation examples showcasing Cosmic UI Lite in action. Copy-paste ready code for common patterns and use cases.

## 📋 Table of Contents

- [Space Ship Dashboard](#space-ship-dashboard)
- [Game Menu System](#game-menu-system)
- [Mission Control Interface](#mission-control-interface)
- [Notification System](#notification-system)
- [Settings Panel](#settings-panel)
- [Combat HUD](#combat-hud)
- [Trading Interface](#trading-interface)
- [Communication System](#communication-system)

---

## Space Ship Dashboard

Complete dashboard interface with status cards, controls, and alerts.

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Starship Dashboard</title>
    <link rel="stylesheet" href="./cosmic-ui-lite/dist/cosmic-ui.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: white;
            min-height: 100vh;
        }
        
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .controls-panel {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .status-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            padding: 15px;
        }
        
        .status-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(0, 212, 255, 0.2);
        }
        
        .status-value {
            font-weight: bold;
        }
        
        .status-ok { color: #00ff88; }
        .status-warning { color: #ffaa00; }
        .status-danger { color: #ff4444; }
        
        .navigation-coords {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 15px;
        }
        
        .coord-input {
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid #00d4ff;
            color: white;
            padding: 8px;
            text-align: center;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div id="dashboard-container">
        <h1 style="text-align: center; margin-bottom: 30px;">🚀 STARSHIP COMMAND</h1>
        
        <div class="dashboard" id="dashboard-grid"></div>
        <div class="controls-panel" id="controls-panel"></div>
    </div>

    <script type="module" src="dashboard.js"></script>
</body>
</html>
```

### JavaScript Implementation

```javascript
// dashboard.js
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

class StarshipDashboard {
    constructor() {
        this.systems = {
            navigation: { status: 'ONLINE', power: 87 },
            lifeSupport: { status: 'ONLINE', power: 95 },
            shields: { status: 'CHARGING', power: 23 },
            weapons: { status: 'OFFLINE', power: 0 },
            engines: { status: 'ONLINE', power: 78 },
            communications: { status: 'ONLINE', power: 92 }
        };
        
        this.coordinates = { x: 127.4, y: 89.2, z: 45.8 };
        this.init();
    }
    
    init() {
        this.createDashboardCards();
        this.createControlPanel();
        this.startSystemMonitoring();
    }
    
    createDashboardCards() {
        const grid = document.getElementById('dashboard-grid');
        
        // System Status Card
        const systemsCard = CosmicUI.createCard({
            title: 'SYSTEM STATUS',
            content: this.generateSystemsHTML(),
            className: 'systems-card'
        });
        
        // Navigation Card
        const navCard = CosmicUI.createCard({
            title: 'NAVIGATION',
            content: this.generateNavigationHTML(),
            className: 'nav-card'
        });
        
        // Mission Status Card
        const missionCard = CosmicUI.createCard({
            title: 'CURRENT MISSION',
            content: `
                <div style="padding: 15px;">
                    <h3>Deep Space Exploration</h3>
                    <p><strong>Objective:</strong> Survey uncharted system Kepler-442</p>
                    <p><strong>Progress:</strong> 67% Complete</p>
                    <p><strong>ETA:</strong> 14.3 hours</p>
                    <div style="background: rgba(0,212,255,0.2); height: 8px; border-radius: 4px; margin: 10px 0;">
                        <div style="background: #00d4ff; height: 100%; width: 67%; border-radius: 4px;"></div>
                    </div>
                </div>
            `,
            className: 'mission-card'
        });
        
        // Crew Status Card
        const crewCard = CosmicUI.createCard({
            title: 'CREW STATUS',
            content: `
                <div style="padding: 15px;">
                    <div class="status-item">
                        <span>👨‍🚀 Captain Reynolds</span>
                        <span class="status-ok">ACTIVE</span>
                    </div>
                    <div class="status-item">
                        <span>👩‍🔬 Dr. Chen (Science)</span>
                        <span class="status-ok">ACTIVE</span>
                    </div>
                    <div class="status-item">
                        <span>👨‍🔧 Engineer Torres</span>
                        <span class="status-warning">REST</span>
                    </div>
                    <div class="status-item">
                        <span>👩‍✈️ Pilot Kim</span>
                        <span class="status-ok">ACTIVE</span>
                    </div>
                </div>
            `,
            className: 'crew-card'
        });
        
        grid.appendChild(systemsCard);
        grid.appendChild(navCard);
        grid.appendChild(missionCard);
        grid.appendChild(crewCard);
    }
    
    generateSystemsHTML() {
        return `
            <div class="status-grid">
                ${Object.entries(this.systems).map(([system, data]) => `
                    <div class="status-item">
                        <span>${system.toUpperCase()}</span>
                        <span class="status-value ${this.getStatusClass(data.status)}">
                            ${data.status} (${data.power}%)
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    generateNavigationHTML() {
        return `
            <div class="navigation-coords">
                <div>
                    <label>X Coordinate</label>
                    <input type="number" class="coord-input" value="${this.coordinates.x}" 
                           onchange="dashboard.updateCoordinate('x', this.value)">
                </div>
                <div>
                    <label>Y Coordinate</label>
                    <input type="number" class="coord-input" value="${this.coordinates.y}"
                           onchange="dashboard.updateCoordinate('y', this.value)">
                </div>
                <div>
                    <label>Z Coordinate</label>
                    <input type="number" class="coord-input" value="${this.coordinates.z}"
                           onchange="dashboard.updateCoordinate('z', this.value)">
                </div>
            </div>
        `;
    }
    
    getStatusClass(status) {
        switch(status) {
            case 'ONLINE': return 'status-ok';
            case 'CHARGING': case 'REST': return 'status-warning';
            case 'OFFLINE': return 'status-danger';
            default: return '';
        }
    }
    
    createControlPanel() {
        const panel = document.getElementById('controls-panel');
        
        const buttons = [
            {
                text: 'Red Alert',
                variant: 'danger',
                onClick: () => this.triggerRedAlert()
            },
            {
                text: 'Engage Warp',
                variant: 'primary',
                onClick: () => this.engageWarp()
            },
            {
                text: 'Hail Frequency',
                variant: 'secondary',
                onClick: () => this.openCommunications()
            },
            {
                text: 'System Diagnostics',
                variant: 'default',
                onClick: () => this.runDiagnostics()
            }
        ];
        
        buttons.forEach(buttonOptions => {
            const button = CosmicUI.createButton(buttonOptions);
            panel.appendChild(button);
        });
    }
    
    triggerRedAlert() {
        CosmicUI.createModal({
            title: '🚨 RED ALERT',
            content: `
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: #ff4444;">EMERGENCY PROTOCOLS ACTIVATED</h3>
                    <p>⚠️ Hostile vessel detected</p>
                    <p>🛡️ Shields automatically raised</p>
                    <p>⚔️ Weapons systems charging</p>
                    <p><strong>All hands to battle stations!</strong></p>
                </div>
            `,
            buttons: [
                { text: 'Battle Stations', variant: 'danger', onClick: () => this.battleStations() },
                { text: 'Cancel Alert', variant: 'secondary' }
            ]
        ).show();
    }
    
    engageWarp() {
        if (this.systems.engines.status !== 'ONLINE') {
            CosmicUI.showError('Warp Drive Offline', 'Engines must be online to engage warp drive.');
            return;
        }
        
        CosmicUI.showConfirmation(
            'Engage Warp Drive',
            `Set course for coordinates ${this.coordinates.x}, ${this.coordinates.y}, ${this.coordinates.z}?`,
            () => {
                CosmicUI.showNotification('Warp Engaged', 'Now traveling at warp factor 5');
                this.simulateWarpJump();
            }
        );
    }
    
    openCommunications() {
        const commModal = CosmicUI.createModal({
            title: '📡 COMMUNICATIONS',
            content: `
                <div style="padding: 15px;">
                    <h4>Active Frequencies:</h4>
                    <div style="margin: 15px 0;">
                        <button onclick="dashboard.hailStarfleet()" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: rgba(0,212,255,0.2); border: 1px solid #00d4ff; color: white;">
                            📻 Starfleet Command
                        </button>
                        <button onclick="dashboard.hailColony()" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: rgba(0,212,255,0.2); border: 1px solid #00d4ff; color: white;">
                            🏢 Mars Colony
                        </button>
                        <button onclick="dashboard.hailUnknown()" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: rgba(255,170,0,0.2); border: 1px solid #ffaa00; color: white;">
                            ❓ Unknown Signal
                        </button>
                    </div>
                </div>
            `,
            buttons: [{ text: 'Close', variant: 'secondary' }]
        });
        
        commModal.show();
    }
    
    runDiagnostics() {
        CosmicUI.showNotification('Diagnostics', 'Running system diagnostics...');
        
        setTimeout(() => {
            const diagnosticsModal = CosmicUI.createModal({
                title: '🔧 SYSTEM DIAGNOSTICS',
                content: `
                    <div style="padding: 15px;">
                        <h4>Diagnostic Results:</h4>
                        <div class="status-grid">
                            <div class="status-item">
                                <span>Hull Integrity</span>
                                <span class="status-ok">98.7%</span>
                            </div>
                            <div class="status-item">
                                <span>Power Distribution</span>
                                <span class="status-ok">OPTIMAL</span>
                            </div>
                            <div class="status-item">
                                <span>Life Support</span>
                                <span class="status-ok">NORMAL</span>
                            </div>
                            <div class="status-item">
                                <span>Warp Coils</span>
                                <span class="status-warning">MINOR STRESS</span>
                            </div>
                        </div>
                        <p><strong>Recommendation:</strong> Schedule maintenance in 72 hours.</p>
                    </div>
                `,
                buttons: [
                    { text: 'Schedule Maintenance', variant: 'primary', onClick: () => this.scheduleMaintenance() },
                    { text: 'Acknowledge', variant: 'secondary' }
                ]
            });
            
            diagnosticsModal.show();
        }, 2000);
    }
    
    // Event handlers
    updateCoordinate(axis, value) {
        this.coordinates[axis] = parseFloat(value);
        console.log(`Updated ${axis} coordinate to ${value}`);
    }
    
    battleStations() {
        this.systems.shields.status = 'ONLINE';
        this.systems.shields.power = 100;
        this.systems.weapons.status = 'ONLINE';
        this.systems.weapons.power = 100;
        this.updateDashboard();
        CosmicUI.showNotification('Battle Ready', 'All systems at combat readiness');
    }
    
    simulateWarpJump() {
        // Simulate warp effects
        document.body.style.filter = 'blur(2px)';
        setTimeout(() => {
            document.body.style.filter = 'none';
            this.coordinates.x += Math.random() * 100;
            this.coordinates.y += Math.random() * 100;
            this.coordinates.z += Math.random() * 100;
            this.updateDashboard();
        }, 1000);
    }
    
    hailStarfleet() {
        CosmicUI.showInfo({
            title: 'STARFLEET COMMAND',
            titleColor: 'blue',
            content: '"This is Admiral Kirk. Your mission parameters remain unchanged. Continue to designated coordinates. Starfleet out."',
            showOverlay: true
        });
    }
    
    hailColony() {
        CosmicUI.showInfo({
            title: 'MARS COLONY',
            titleColor: 'green',
            content: '"Greetings starship! This is Mars Colony Control. All systems green. Safe travels on your mission."',
            showOverlay: true
        });
    }
    
    hailUnknown() {
        CosmicUI.showInfo({
            title: 'UNKNOWN SIGNAL',
            titleColor: 'golden-red',
            content: '"*Static* ...seeking... *static* ...help us... *static* ...coordinates 84.2, 156.7... *signal lost*"',
            showOverlay: true
        });
    }
    
    scheduleMaintenance() {
        CosmicUI.showNotification('Maintenance Scheduled', 'Maintenance window scheduled for 2387.12.07 08:00');
    }
    
    updateDashboard() {
        // Re-render system cards with updated data
        document.getElementById('dashboard-grid').innerHTML = '';
        this.createDashboardCards();
    }
    
    startSystemMonitoring() {
        // Simulate system changes
        setInterval(() => {
            // Randomly fluctuate power levels
            Object.keys(this.systems).forEach(system => {
                if (this.systems[system].status === 'ONLINE') {
                    const currentPower = this.systems[system].power;
                    const change = (Math.random() - 0.5) * 10;
                    this.systems[system].power = Math.max(0, Math.min(100, currentPower + change));
                }
            });
            
            // Occasional status changes
            if (Math.random() < 0.02) { // 2% chance
                const systems = Object.keys(this.systems);
                const randomSystem = systems[Math.floor(Math.random() * systems.length)];
                const statuses = ['ONLINE', 'CHARGING', 'OFFLINE'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                this.systems[randomSystem].status = newStatus;
                
                if (newStatus === 'OFFLINE') {
                    CosmicUI.showNotification('System Alert', `${randomSystem.toUpperCase()} has gone offline`);
                }
            }
            
            this.updateDashboard();
        }, 5000); // Update every 5 seconds
    }
}

// Initialize dashboard
window.dashboard = new StarshipDashboard();
```

---

## Game Menu System

Complete main menu with settings, load/save, and transitions.

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmic Game Menu</title>
    <link rel="stylesheet" href="./cosmic-ui-lite/dist/cosmic-ui.css">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2), transparent 50%),
                linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e, #0f0f23);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .game-title {
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 50px;
            background: linear-gradient(45deg, #00d4ff, #ff6b35, #00d4ff);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
            animation: titlePulse 3s ease-in-out infinite alternate;
        }
        
        @keyframes titlePulse {
            from { text-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
            to { text-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 40px rgba(255, 107, 53, 0.3); }
        }
        
        .menu-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.8;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .menu-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .settings-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            padding: 20px;
            max-width: 400px;
        }
        
        .setting-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .setting-item label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .setting-item input, .setting-item select {
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid #00d4ff;
            color: white;
            padding: 8px;
            border-radius: 4px;
        }
        
        .save-slot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 4px;
            margin: 5px 0;
        }
        
        .save-info {
            flex: 1;
        }
        
        .save-actions {
            display: flex;
            gap: 10px;
        }
        
        @media (max-width: 768px) {
            .game-title {
                font-size: 2rem;
            }
            .settings-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="game-title">COSMIC ODYSSEY</div>
    <div class="subtitle">A Space Exploration Adventure</div>
    <div class="menu-container" id="main-menu"></div>

    <script type="module" src="game-menu.js"></script>
</body>
</html>
```

### JavaScript Implementation

```javascript
// game-menu.js
import { CosmicUI } from './cosmic-ui-lite/dist/index.esm.js';

class GameMenu {
    constructor() {
        this.settings = {
            difficulty: 'normal',
            graphics: 'high',
            audio: 75,
            music: 60,
            fullscreen: false,
            autosave: true
        };
        
        this.saveSlots = [
            { 
                id: 1, 
                name: 'Captain Reynolds', 
                level: 15, 
                location: 'Alpha Centauri',
                playtime: '23h 45m',
                date: '2024-01-15'
            },
            { 
                id: 2, 
                name: 'Commander Data', 
                level: 8, 
                location: 'Sol System',
                playtime: '12h 30m',
                date: '2024-01-10'
            },
            { 
                id: 3, 
                name: 'Empty Slot', 
                level: null, 
                location: null,
                playtime: null,
                date: null
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createMainMenu();
    }
    
    createMainMenu() {
        const container = document.getElementById('main-menu');
        container.innerHTML = '';
        
        const menuButtons = [
            {
                text: '🚀 New Game',
                variant: 'primary',
                onClick: () => this.newGame()
            },
            {
                text: '📁 Load Game',
                variant: 'default',
                onClick: () => this.showLoadMenu()
            },
            {
                text: '⚙️ Settings',
                variant: 'secondary',
                onClick: () => this.showSettings()
            },
            {
                text: '📊 Statistics',
                variant: 'default',
                onClick: () => this.showStatistics()
            },
            {
                text: '📜 Credits',
                variant: 'default',
                onClick: () => this.showCredits()
            },
            {
                text: '🚪 Exit Game',
                variant: 'danger',
                onClick: () => this.exitGame()
            }
        ];
        
        menuButtons.forEach(buttonOptions => {
            const button = CosmicUI.createButton(buttonOptions);
            container.appendChild(button);
        });
    }
    
    newGame() {
        CosmicUI.createModal({
            title: '🚀 NEW GAME',
            content: `
                <div style="padding: 20px; text-align: center;">
                    <h3>Choose Your Difficulty</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px; margin: 20px 0;">
                        <button onclick="gameMenu.startNewGame('easy')" style="padding: 15px; background: rgba(0,255,136,0.2); border: 1px solid #00ff88; color: white; border-radius: 4px;">
                            <strong>CADET</strong><br>
                            <small>Easy difficulty, more resources, forgiving combat</small>
                        </button>
                        <button onclick="gameMenu.startNewGame('normal')" style="padding: 15px; background: rgba(0,212,255,0.2); border: 1px solid #00d4ff; color: white; border-radius: 4px;">
                            <strong>OFFICER</strong><br>
                            <small>Normal difficulty, balanced gameplay</small>
                        </button>
                        <button onclick="gameMenu.startNewGame('hard')" style="padding: 15px; background: rgba(255,68,68,0.2); border: 1px solid #ff4444; color: white; border-radius: 4px;">
                            <strong>ADMIRAL</strong><br>
                            <small>Hard difficulty, limited resources, challenging combat</small>
                        </button>
                    </div>
                </div>
            `,
            buttons: [
                { text: 'Cancel', variant: 'secondary' }
            ]
        ).show();
    }
    
    showLoadMenu() {
        const loadMenuContent = `
            <div style="padding: 20px;">
                <h3>Load Game</h3>
                ${this.saveSlots.map(slot => `
                    <div class="save-slot">
                        <div class="save-info">
                            ${slot.level ? `
                                <div><strong>${slot.name}</strong></div>
                                <div>Level ${slot.level} • ${slot.location}</div>
                                <div style="font-size: 0.8em; opacity: 0.7;">
                                    ${slot.playtime} • ${slot.date}
                                </div>
                            ` : `
                                <div style="opacity: 0.5;">Empty Save Slot</div>
                            `}
                        </div>
                        <div class="save-actions">
                            ${slot.level ? `
                                <button onclick="gameMenu.loadGame(${slot.id})" style="padding: 5px 10px; background: rgba(0,212,255,0.2); border: 1px solid #00d4ff; color: white; border-radius: 3px;">
                                    Load
                                </button>
                                <button onclick="gameMenu.deleteGame(${slot.id})" style="padding: 5px 10px; background: rgba(255,68,68,0.2); border: 1px solid #ff4444; color: white; border-radius: 3px;">
                                    Delete
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        CosmicUI.createModal({
            title: '📁 LOAD GAME',
            content: loadMenuContent,
            buttons: [
                { text: 'Cancel', variant: 'secondary' }
            ]
        ).show();
    }
    
    showSettings() {
        const settingsContent = `
            <div class="settings-grid">
                <div class="setting-item">
                    <label>Difficulty</label>
                    <select onchange="gameMenu.updateSetting('difficulty', this.value)">
                        <option value="easy" ${this.settings.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                        <option value="normal" ${this.settings.difficulty === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="hard" ${this.settings.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
                    </select>
                </div>
                
                <div class="setting-item">
                    <label>Graphics Quality</label>
                    <select onchange="gameMenu.updateSetting('graphics', this.value)">
                        <option value="low" ${this.settings.graphics === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${this.settings.graphics === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${this.settings.graphics === 'high' ? 'selected' : ''}>High</option>
                        <option value="ultra" ${this.settings.graphics === 'ultra' ? 'selected' : ''}>Ultra</option>
                    </select>
                </div>
                
                <div class="setting-item">
                    <label>Audio Volume</label>
                    <input type="range" min="0" max="100" value="${this.settings.audio}" 
                           onchange="gameMenu.updateSetting('audio', this.value)">
                    <span>${this.settings.audio}%</span>
                </div>
                
                <div class="setting-item">
                    <label>Music Volume</label>
                    <input type="range" min="0" max="100" value="${this.settings.music}" 
                           onchange="gameMenu.updateSetting('music', this.value)">
                    <span>${this.settings.music}%</span>
                </div>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.settings.fullscreen ? 'checked' : ''} 
                               onchange="gameMenu.updateSetting('fullscreen', this.checked)">
                        Fullscreen Mode
                    </label>
                </div>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${this.settings.autosave ? 'checked' : ''} 
                               onchange="gameMenu.updateSetting('autosave', this.checked)">
                        Auto-save
                    </label>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(0,212,255,0.3);">
                <h4>Key Bindings</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em;">
                    <div>Move Forward: <strong>W</strong></div>
                    <div>Move Backward: <strong>S</strong></div>
                    <div>Move Left: <strong>A</strong></div>
                    <div>Move Right: <strong>D</strong></div>
                    <div>Fire Primary: <strong>Space</strong></div>
                    <div>Fire Secondary: <strong>Right Click</strong></div>
                    <div>Shield Toggle: <strong>F</strong></div>
                    <div>Pause Menu: <strong>Escape</strong></div>
                </div>
            </div>
        `;
        
        CosmicUI.createModal({
            title: '⚙️ SETTINGS',
            content: settingsContent,
            buttons: [
                { text: 'Save Settings', variant: 'primary', onClick: () => this.saveSettings() },
                { text: 'Reset to Defaults', variant: 'secondary', onClick: () => this.resetSettings() },
                { text: 'Cancel', variant: 'secondary' }
            ]
        ).show();
    }
    
    showStatistics() {
        CosmicUI.createModal({
            title: '📊 GAME STATISTICS',
            content: `
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div style="text-align: center; padding: 15px; border: 1px solid rgba(0,212,255,0.3); border-radius: 4px;">
                            <div style="font-size: 2em; color: #00d4ff;">42</div>
                            <div>Games Played</div>
                        </div>
                        <div style="text-align: center; padding: 15px; border: 1px solid rgba(0,212,255,0.3); border-radius: 4px;">
                            <div style="font-size: 2em; color: #00ff88;">156h</div>
                            <div>Total Playtime</div>
                        </div>
                        <div style="text-align: center; padding: 15px; border: 1px solid rgba(0,212,255,0.3); border-radius: 4px;">
                            <div style="font-size: 2em; color: #ffaa00;">87</div>
                            <div>Systems Explored</div>
                        </div>
                        <div style="text-align: center; padding: 15px; border: 1px solid rgba(0,212,255,0.3); border-radius: 4px;">
                            <div style="font-size: 2em; color: #ff4444;">23</div>
                            <div>Enemies Defeated</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <h4>Achievements</h4>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5em;">🏆</span>
                                <span>First Contact - Make contact with alien civilization</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5em;">🌌</span>
                                <span>Explorer - Visit 50 star systems</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5em; opacity: 0.3;">⚔️</span>
                                <span style="opacity: 0.5;">Warrior - Defeat 100 enemies (23/100)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            buttons: [
                { text: 'Close', variant: 'secondary' }
            ]
        ).show();
    }
    
    showCredits() {
        CosmicUI.createModal({
            title: '📜 CREDITS',
            content: `
                <div style="padding: 20px; text-align: center;">
                    <h3>COSMIC ODYSSEY</h3>
                    <p style="margin-bottom: 30px;"><em>A Space Exploration Adventure</em></p>
                    
                    <div style="text-align: left; max-width: 400px; margin: 0 auto;">
                        <h4>Development Team</h4>
                        <p><strong>Game Director:</strong> Alex Chen<br>
                        <strong>Lead Programmer:</strong> Sarah Johnson<br>
                        <strong>Art Director:</strong> Miguel Rodriguez<br>
                        <strong>Sound Designer:</strong> Emily Davis</p>
                        
                        <h4>Special Thanks</h4>
                        <p><strong>UI Framework:</strong> Cosmic UI Lite<br>
                        <strong>Music:</strong> Kevin MacLeod<br>
                        <strong>Beta Testers:</strong> The Gaming Community</p>
                        
                        <h4>Technology</h4>
                        <p><strong>Engine:</strong> Custom WebGL Engine<br>
                        <strong>Physics:</strong> Bullet Physics<br>
                        <strong>Audio:</strong> Web Audio API</p>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.7;">
                        © 2024 Space Games Studio. All rights reserved.
                    </p>
                </div>
            `,
            buttons: [
                { text: 'Close', variant: 'secondary' }
            ]
        ).show();
    }
    
    exitGame() {
        CosmicUI.showConfirmation(
            'Exit Game',
            'Are you sure you want to exit Cosmic Odyssey?',
            () => {
                CosmicUI.showNotification('Farewell', 'Thanks for playing Cosmic Odyssey!');
                setTimeout(() => window.close(), 2000);
            }
        );
    }
    
    // Event handlers
    startNewGame(difficulty) {
        CosmicUI.showNotification('New Game', `Starting new ${difficulty} difficulty game...`);
        setTimeout(() => {
            window.location.href = 'game.html?difficulty=' + difficulty;
        }, 1500);
    }
    
    loadGame(slotId) {
        const slot = this.saveSlots.find(s => s.id === slotId);
        if (slot && slot.level) {
            CosmicUI.showNotification('Loading', `Loading ${slot.name}'s game...`);
            setTimeout(() => {
                window.location.href = 'game.html?load=' + slotId;
            }, 1500);
        }
    }
    
    deleteGame(slotId) {
        const slot = this.saveSlots.find(s => s.id === slotId);
        CosmicUI.showConfirmation(
            'Delete Save',
            `Delete ${slot.name}'s save file? This cannot be undone.`,
            () => {
                const slotIndex = this.saveSlots.findIndex(s => s.id === slotId);
                this.saveSlots[slotIndex] = { 
                    id: slotId, 
                    name: 'Empty Slot', 
                    level: null, 
                    location: null, 
                    playtime: null, 
                    date: null 
                };
                CosmicUI.showNotification('Deleted', 'Save file deleted');
                setTimeout(() => this.showLoadMenu(), 1000);
            }
        );
    }
    
    updateSetting(key, value) {
        this.settings[key] = value;
        console.log(`Updated ${key} to ${value}`);
    }
    
    saveSettings() {
        localStorage.setItem('cosmic-odyssey-settings', JSON.stringify(this.settings));
        CosmicUI.showNotification('Settings Saved', 'Your preferences have been saved');
    }
    
    resetSettings() {
        this.settings = {
            difficulty: 'normal',
            graphics: 'high',
            audio: 75,
            music: 60,
            fullscreen: false,
            autosave: true
        };
        CosmicUI.showNotification('Settings Reset', 'Settings restored to defaults');
        setTimeout(() => this.showSettings(), 1000);
    }
}

// Initialize game menu
window.gameMenu = new GameMenu();
```

This example demonstrates:
- **Complete menu system** with navigation
- **Settings management** with persistent storage
- **Save/Load functionality** with visual slot representation
- **Modal dialogs** for confirmations and detailed views
- **Responsive design** that works on different screen sizes
- **Game integration points** for actual gameplay launch

The system is modular and can be easily extended with additional features like online leaderboards, multiplayer lobbies, or mod management interfaces.