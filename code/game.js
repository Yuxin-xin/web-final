// 游戏状态
const gameState = {
    score: 0,
    timeLeft: 180, // 3分钟
    geese: []
};

// 初始化游戏
async function initGame() {
    // 获取摄像头
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert('无法访问摄像头: ' + err.message);
        return;
    }

    // 游戏循环
    const gameLoop = setInterval(() => {
        gameState.timeLeft--;
        
        // 更新计时器显示
        updateTimer();
        
        // 随机生成大鹅
        if(Math.random() < 0.02) {
            spawnGoose();
        }
        
        // 移动大鹅
        moveGeese();
        
        // 检查游戏结束
        if(gameState.timeLeft <= 0) {
            clearInterval(gameLoop);
            endGame();
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 修改spawnGoose函数
function spawnGoose() {
    const goose = document.createElement('div');
    goose.className = 'goose';
    goose.textContent = '🦢'; // 使用emoji
    goose.style.left = `${Math.random() * 80 + 10}%`;
    goose.style.bottom = '0px';
    goose.speed = 2 + Math.random() * 3;
    goose.caught = false;
    
    goose.addEventListener('click', () => catchGoose(goose));
    
    document.getElementById('game-area').appendChild(goose);
    gameState.geese.push(goose);
}


function moveGeese() {
    gameState.geese.forEach(goose => {
        if(!goose.caught) {
            const currentBottom = parseInt(goose.style.bottom) || 0;
            goose.style.bottom = `${currentBottom + goose.speed}px`;
            
            // 移除超出屏幕的大鹅
            if(currentBottom > window.innerHeight) {
                goose.remove();
                gameState.geese = gameState.geese.filter(g => g !== goose);
            }
        }
    });
}

// 修改catchGoose函数
function catchGoose(goose) {
    if(!goose.caught) {
        goose.caught = true;
        goose.classList.add('caught');
        gameState.score++;
        document.getElementById('score').textContent = `大鹅: ${gameState.score}只`;
        
        // 动画结束后移除
        setTimeout(() => {
            goose.remove();
            gameState.geese = gameState.geese.filter(g => g !== goose);
        }, 500);
    }
}


function endGame() {
    localStorage.setItem('gooseGameScore', gameState.score);
    window.location.href = 'final.html';
}

// 启动游戏
window.onload = initGame;