:root { --gold: #f39c12; --bg-dark: #121212; }
body { margin: 0; background: #000; font-family: 'Arial Black', sans-serif; color: white; overflow: hidden; }

#game-container { height: 100vh; display: flex; flex-direction: column; }

header { padding: 10px; background: rgba(0,0,0,0.8); text-align: center; border-bottom: 2px solid #333; }
.gold-display { font-size: 1.5rem; color: var(--gold); }
.stage-info { font-size: 0.8rem; color: #aaa; }

#battle-field { flex: 1.2; position: relative; background: linear-gradient(to bottom, #1a1a2e, #16213e); overflow: hidden; }

/* Barra de Vida estilo Tap Titans */
#enemy-health-bar { width: 80%; height: 20px; background: #333; margin: 20px auto 5px; border-radius: 10px; border: 2px solid #fff; overflow: hidden; }
#hp-progress { width: 100%; height: 100%; background: linear-gradient(to right, #e74c3c, #c0392b); transition: width 0.1s; }

#boss-container { height: 60%; display: flex; align-items: center; justify-content: center; position: relative; }
#enemy-sprite { font-size: 120px; transition: transform 0.05s; z-index: 1; }

/* Números de Daño Animados */
.dmg-num { position: absolute; color: white; font-weight: bold; font-size: 24px; pointer-events: none; animation: floatUp 0.6s ease-out forwards; z-index: 5; }
@keyframes floatUp {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
}

#player-team { position: absolute; bottom: 10px; width: 100%; display: flex; justify-content: center; gap: 20px; font-size: 40px; }

/* Panel de Mejoras */
#upgrade-panel { flex: 1; background: #1e1e1e; border-top: 4px solid #333; display: flex; flex-direction: column; }
.tab-menu { display: flex; background: #111; }
.tab-menu button { flex: 1; padding: 10px; background: none; border: none; color: #666; font-size: 0.7rem; border-bottom: 2px solid transparent; }
.tab-menu button.active { color: var(--gold); border-bottom: 2px solid var(--gold); }

.upgrade-list { overflow-y: auto; padding: 10px; }
.upgrade-item { display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid #444; }
.up-icon { font-size: 30px; margin-right: 15px; }
.up-info { flex: 1; display: flex; flex-direction: column; }
.up-name { font-size: 0.9rem; }
.up-cost { color: var(--gold); font-size: 0.8rem; }
.up-level { font-weight: bold; background: rgba(0,0,0,0.3); padding: 5px 10px; border-radius: 5px; }
