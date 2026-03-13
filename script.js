// MEMORIA Y CARGA
let state = JSON.parse(localStorage.getItem('MageLegendSave')) || {
    gold: 0, gems: 0, stage: 1, dmg: 10, petDmg: 5, petLv: 1, inv: []
};

let enemy = { hp: 100, maxHp: 100, isBoss: false };
let bossTimer;
let currentTab = 'upgrades';

const MONSTERS = [
    "https://i.postimg.cc/XvM8D0Bq/m1.png",
    "https://i.postimg.cc/J0P76pX6/m2.png",
    "https://i.postimg.cc/85zXpYyP/m3.png"
];
const BOSSES = ["https://i.postimg.cc/Bv3vPzXz/boss1.png", "https://i.postimg.cc/1X9N6g9H/boss2.png"];
const PETS = ["https://i.ibb.co/mH7L6qB/egg.png", "https://i.postimg.cc/02m689p7/dragon-baby.png", "https://i.postimg.cc/9F7m9f9s/dragon-full.png"];

function init() {
    spawnEnemy();
    updateUI();
    switchTab('upgrades');
    // Bucle de daño de mascota
    setInterval(() => { if(state.petDmg > 0) applyDamage(state.petDmg, window.innerWidth/2, window.innerHeight/3, false, false); }, 2000);
    // Guardado auto cada 10s
    setInterval(() => localStorage.setItem('MageLegendSave', JSON.stringify(state)), 10000);
}

function handleTap(e) {
    let isCrit = Math.random() < 0.2;
    let power = isCrit ? state.dmg * 3 : state.dmg;
    
    // Feedback
    const img = document.getElementById('enemy-img');
    img.classList.add('hit-anim');
    setTimeout(() => img.classList.remove('hit-anim'), 50);
    
    if(isCrit) {
        document.getElementById('flash-overlay').style.opacity = "0.3";
        setTimeout(() => document.getElementById('flash-overlay').style.opacity = "0", 50);
        document.getElementById('game-container').classList.add('shake');
        setTimeout(() => document.getElementById('game-container').classList.remove('shake'), 200);
    }

    applyDamage(power, e.clientX, e.clientY, isCrit, true);
}

function applyDamage(amt, x, y, crit, isTap) {
    enemy.hp -= amt;
    if(isTap) state.gold += state.stage;
    
    spawnDmgNum(x, y, amt, crit);
    
    if(enemy.hp <= 0) {
        if(enemy.isBoss) {
            state.gems += 5;
            clearInterval(bossTimer);
            if(Math.random() < 0.8) document.getElementById('loot-chest').style.display = 'block';
        } else {
            if(Math.random() < 0.15) document.getElementById('loot-chest').style.display = 'block';
        }
        state.stage++;
        spawnEnemy();
    }
    updateUI();
}

function spawnEnemy() {
    enemy.isBoss = state.stage % 5 === 0;
    enemy.maxHp = enemy.isBoss ? state.stage * 600 : state.stage * 120;
    enemy.hp = enemy.maxHp;
    
    document.getElementById('enemy-name').innerText = enemy.isBoss ? "BOSS ANCESTRAL" : "ESBIRRO NIV. " + state.stage;
    document.getElementById('enemy-img').src = enemy.isBoss ? BOSSES[state.stage%BOSSES.length] : MONSTERS[state.stage%MONSTERS.length];
    
    if(enemy.isBoss) {
        document.getElementById('boss-timer').style.display = 'block';
        let time = 30;
        clearInterval(bossTimer);
        bossTimer = setInterval(() => {
            time--;
            document.getElementById('time-left').innerText = time;
            if(time <= 0) {
                clearInterval(bossTimer);
                state.stage = Math.max(1, state.stage - 1);
                spawnEnemy();
            }
        }, 1000);
    } else {
        document.getElementById('boss-timer').style.display = 'none';
    }
}

function spawnDmgNum(x, y, amt, crit) {
    const n = document.createElement('div');
    n.className = 'dmg-num';
    n.innerText = crit ? "🔥" + amt : amt;
    n.style.color = crit ? "#ffd700" : "#fff";
    n.style.left = (x - 30) + "px";
    n.style.top = (y - 80) + "px";
    document.getElementById('damage-popups').appendChild(n);
    setTimeout(() => n.remove(), 800);
}

function openChest() {
    document.getElementById('loot-chest').style.display = 'none';
    const rarities = [
        {n: "Común", m: 1, p: 0.7}, {n: "Raro", m: 4, p: 0.2}, 
        {n: "Épico", m: 12, p: 0.08}, {n: "LEGENDARIO", m: 60, p: 0.02}
    ];
    let r = Math.random(), cum = 0, sel = rarities[0];
    for(let rar of rarities){ cum += rar.p; if(r <= cum){ sel = rar; break; } }
    
    let bonus = state.stage * 8 * sel.m;
    state.inv.push({ n: "Reliquia " + sel.n, r: sel.n, d: bonus });
    state.dmg += bonus;
    alert(`¡ENCONTRASTE BOTÍN ${sel.n}!\n+${bonus} DAÑO`);
    updateUI();
}

function switchTab(t) {
    currentTab = t;
    const v = document.getElementById('menu-content');
    document.getElementById('tab-up').className = t === 'upgrades' ? 'active' : '';
    document.getElementById('tab-inv').className = t === 'inventory' ? 'active' : '';
    
    if(t === 'upgrades') {
        v.innerHTML = `
            <div class="card" onclick="buy('dmg')">🪄 <b>MEJORAR BÁCULO</b><br>Coste: 🪙 ${state.stage*30} | +20 ATQ</div>
            <div class="card" onclick="buy('pet')">🐉 <b>EVOLUCIONAR PET</b><br>Coste: 💎 ${state.petLv*10} | +40 DPS</div>
        `;
    } else {
        v.innerHTML = state.inv.length === 0 ? "Vacío" : state.inv.map(i => `<div class="card ${i.r}"><b>${i.n}</b><br>+${i.d} ATQ</div>`).join('');
    }
}

function buy(type) {
    if(type === 'dmg' && state.gold >= state.stage*30) {
        state.gold -= state.stage*30; state.dmg += 20;
    } else if(type === 'pet' && state.gems >= state.petLv*10) {
        state.gems -= state.petLv*10; state.petLv++; state.petDmg += 40;
        document.getElementById('pet-img').src = PETS[Math.min(state.petLv, 2)];
    }
    updateUI(); switchTab(currentTab);
}

function updateUI() {
    document.getElementById('gold').innerText = Math.floor(state.gold);
    document.getElementById('gems').innerText = state.gems;
    document.getElementById('stage-num').innerText = state.stage;
    document.getElementById('hp-fill').style.width = (enemy.hp / enemy.maxHp * 100) + "%";
    document.getElementById('hp-text').innerText = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;
}

init();
