let player = { gold: 0, dmg: 10, stage: 1, clickCount: 0 };
let enemy = { hp: 100, maxHp: 100 };

// Función de Tap (El corazón del juego)
function handleTap(e) {
    const isCritical = Math.random() < 0.15; // 15% de crítico
    let finalDmg = isCritical ? player.dmg * 3 : player.dmg;

    enemy.hp -= finalDmg;
    player.gold += player.stage;

    // Efectos visuales
    const boss = document.getElementById('boss-sprite');
    boss.classList.add('shake');
    setTimeout(() => boss.classList.remove('shake'), 100);

    if(isCritical) {
        triggerFlash();
        showDamage(e.clientX, e.clientY, finalDmg, true);
    } else {
        showDamage(e.clientX, e.clientY, finalDmg, false);
    }

    if(enemy.hp <= 0) spawnNewEnemy();
    updateUI();
}

function showDamage(x, y, amount, critical) {
    const div = document.createElement('div');
    div.className = 'dmg-popup';
    if(critical) div.style.color = '#ffd700';
    div.innerText = (critical ? "🔥 " : "") + amount;
    div.style.left = (x - 20) + "px";
    div.style.top = (y - 50) + "px";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 700);
}

function triggerFlash() {
    const flash = document.getElementById('flash-overlay');
    flash.style.opacity = "0.3";
    setTimeout(() => flash.style.opacity = "0", 100);
}

function spawnNewEnemy() {
    player.stage++;
    enemy.maxHp = Math.floor(100 * Math.pow(1.3, player.stage));
    enemy.hp = enemy.maxHp;
    // Animación de entrada de jefe
    document.getElementById('boss-sprite').style.transform = "scale(0)";
    setTimeout(() => {
        document.getElementById('boss-sprite').style.transform = "scale(1)";
        const icons = ["👿", "👺", "🧟", "🐉", "👹"];
        document.getElementById('boss-sprite').innerText = icons[player.stage % icons.length];
    }, 200);
}

function updateUI() {
    document.getElementById('gold-count').innerText = Math.floor(player.gold);
    document.getElementById('stage-num').innerText = player.stage;
    document.getElementById('hp-progress').style.width = (enemy.hp / enemy.maxHp * 100) + "%";
    document.getElementById('hp-text').innerText = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;
}

// Inicializar lista de mejoras
const upgrades = [
    { name: "Poder del Mago", icon: "🧙‍♂️", cost: 15, baseDmg: 5 },
    { name: "Búho Compañero", icon: "🦉", cost: 100, baseDmg: 20 },
    { name: "Llama Eterna", icon: "🔥", cost: 500, baseDmg: 100 }
];

function loadUpgrades() {
    const container = document.getElementById('upgrade-list');
    upgrades.forEach((up, i) => {
        container.innerHTML += `
            <div class="upgrade-item" onclick="buyUpgrade(${i})">
                <div style="font-size:30px; margin-right:15px">${up.icon}</div>
                <div style="flex:1">
                    <div style="font-weight:bold">${up.name}</div>
                    <div style="color:var(--gold)">🪙 ${up.cost}</div>
                </div>
                <button style="background:var(--gold); border:none; border-radius:10px; padding:8px">SUBIR</button>
            </div>
        `;
    });
}

function buyUpgrade(id) {
    if(player.gold >= upgrades[id].cost) {
        player.gold -= upgrades[id].cost;
        player.dmg += upgrades[id].baseDmg;
        upgrades[id].cost = Math.floor(upgrades[id].cost * 1.6);
        document.getElementById('upgrade-list').innerHTML = "";
        loadUpgrades();
        updateUI();
    }
}

loadUpgrades();
