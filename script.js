let game = {
    gold: 0,
    stage: 1,
    clickDmg: 5,
    clickLv: 1,
    upCost: 10
};

let enemy = {
    hp: 50,
    maxHp: 50
};

const enemySprite = document.getElementById('enemy-sprite');
const dmgContainer = document.getElementById('damage-numbers');

// Función principal de golpe
enemySprite.addEventListener('mousedown', (e) => {
    doDamage(game.clickDmg, e.clientX, e.clientY);
});

function doDamage(amount, x, y) {
    enemy.hp -= amount;
    game.gold += 1;
    
    // Animación de golpe
    enemySprite.style.transform = "scale(0.9) translateY(10px)";
    setTimeout(() => enemySprite.style.transform = "scale(1)", 50);

    // Crear número flotante
    const num = document.createElement('div');
    num.className = 'dmg-num';
    num.innerText = "-" + amount;
    num.style.left = (x - 20) + "px";
    num.style.top = (y - 50) + "px";
    dmgContainer.appendChild(num);
    setTimeout(() => num.remove(), 600);

    if(enemy.hp <= 0) {
        nextEnemy();
    }
    updateUI();
}

function nextEnemy() {
    game.stage++;
    enemy.maxHp = Math.floor(50 * Math.pow(1.2, game.stage));
    enemy.hp = enemy.maxHp;
    game.gold += game.stage * 5;
    
    // Cambiar emoji aleatoriamente
    const icons = ["👿", "👹", "💀", "👽", "🐲"];
    enemySprite.innerText = icons[Math.floor(Math.random()*icons.length)];
}

function upgradeClick() {
    if(game.gold >= game.upCost) {
        game.gold -= game.upCost;
        game.clickLv++;
        game.clickDmg += 5;
        game.upCost = Math.floor(game.upCost * 1.5);
        updateUI();
    }
}

function updateUI() {
    document.getElementById('gold-count').innerText = game.gold;
    document.getElementById('stage-num').innerText = game.stage;
    document.getElementById('hp-progress').style.width = (enemy.hp / enemy.maxHp * 100) + "%";
    document.getElementById('click-lv').innerText = game.clickLv;
    document.getElementById('up-cost-val').innerText = game.upCost;
    document.getElementById('enemy-name').innerText = "ENEMIGO NIV. " + game.stage;
}
