const cvsB = document.getElementById("canvas-battle");
const ctxB = cvsB.getContext("2d");
const cvsR = document.getElementById("canvas-runes");
const ctxR = cvsR.getContext("2d");
let game = { score: 0, coins: 0, damage: 40, runes: [], active: false };
let enemy = { hp: 100, maxHp: 100 };

function startGame() { 
    document.getElementById('start-screen').style.display = 'none'; 
    game.active = true; 
    resize(); 
    update(); 
}

function resize() {
    cvsB.width = cvsB.offsetWidth; cvsB.height = cvsB.offsetHeight;
    cvsR.width = cvsR.offsetWidth; cvsR.height = cvsR.offsetHeight;
}

function update() {
    if(!game.active) return;
    ctxB.clearRect(0,0,cvsB.width, cvsB.height);
    ctxR.clearRect(0,0,cvsR.width, cvsR.height);
    
    // Dibujar Enemigo (un círculo simple para probar)
    ctxB.fillStyle = "white"; ctxB.font = "80px Arial"; ctxB.textAlign = "center";
    ctxB.fillText("👻", cvsB.width/2, cvsB.height/2);

    // Dibujar Runas
    game.runes.forEach((r, i) => {
        r.y += 3;
        ctxR.fillStyle = "cyan"; ctxR.beginPath(); ctxR.arc(r.x, r.y, 25, 0, Math.PI*2); ctxR.fill();
        if(r.y > cvsR.height) game.runes.splice(i, 1);
    });

    document.getElementById("score").innerText = game.score;
    document.getElementById("coins").innerText = game.coins;
    document.getElementById("hp-fill").style.width = (enemy.hp/enemy.maxHp*100) + "%";
    requestAnimationFrame(update);
}

cvsR.onmousedown = (e) => {
    let rect = cvsR.getBoundingClientRect();
    let x = e.clientX - rect.left; let y = e.clientY - rect.top;
    game.runes.forEach((r, i) => {
        if(Math.hypot(x-r.x, y-r.y) < 30) {
            game.runes.splice(i, 1); game.score++; enemy.hp -= 20;
            if(enemy.hp <= 0) enemy.hp = 100;
        }
    });
};

setInterval(() => { if(game.active) game.runes.push({x: Math.random()*cvsR.width, y: -20}); }, 1000);
