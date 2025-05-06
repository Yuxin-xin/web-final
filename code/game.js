let score = 0;
let timeLeft = 180;
let gameActive = true;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

//倒计时
function startTimer() {
    updateTimer(); // 立即更新显示
    
    const timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log("时间到！");
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startTimer();


// 生成大鹅
function createGoose() {
const goose = document.createElement('div');
goose.className = 'goose';
goose.innerHTML = '🍎';
            
// 随机位置（底部区域）
goose.style.left = Math.random() * (window.innerWidth - 60) + 'px';
goose.style.bottom = '0px';
goose.addEventListener('click', () => {
goose.style.transform = 'scale(0)';
score++;
scoreDisplay.textContent = 'you got :'+score ;
setTimeout(() => goose.remove(), 200);
});
            
gameArea.appendChild(goose);
            
// 自动移动
let posY = 0;
let velocityY = Math.random() * 5 + 15;
const speedX = Math.random() * 3;
const gravity = -1 * (Math.random() * 0.1 + 0.3);
let posX = Math.random() * window.innerWidth * 0.7;
let horizontalPos = 0;

const move = setInterval(() => {
posX += speedX;
posY += velocityY;
goose.style.left = posX + 'px';
velocityY += gravity;
goose.style.bottom = posY + 'px';
                
// 移出屏幕后删除
if (posY <= 0  || posX <= 0 || posX > innerWidth) {
    clearInterval(move);
    goose.remove();
}
},20);
}
/*if(pos > window.innerHeight) {
clearInterval(move);
goose.remove();
}
}, 20);
}*/



// 每1秒生成一只大鹅
setInterval(createGoose, 1000);
        
// 初始生成3只
for(let i=0; i<3; i++) {
setTimeout(createGoose, i * 300);
}

// Game variables


// Initialize camera
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });
        videoElement.srcObject = stream;
        await new Promise((resolve) => {
            videoElement.onloadedmetadata = () => {
                videoElement.play();
                resolve();
            };
        });
    } catch (error) {
        console.error('Camera error:', error);
        // Fallback background if camera fails
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Timer functions
function startTimer() {
    updateTimer();
    
    const timer = setInterval(() => {
        if (!gameActive) return;
        
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            alert(`游戏结束! 你抓到了 ${score} 只大鹅!`);
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Goose creation
function createGoose() {
    if (!gameActive) return;
    
    const goose = document.createElement('div');
    goose.className = 'goose';
    goose.innerHTML = '🦢';
    goose.style.color = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`;
    
    // Random starting position at bottom
    const startX = Math.random() * (window.innerWidth - 60);
    goose.style.left = `${startX}px`;
    goose.style.bottom = '0px';
    
    // Click handler
    goose.addEventListener('click', () => {
        if (!gameActive) return;
        
        goose.style.transform = 'scale(1.5) rotate(360deg)';
        score++;
        scoreDisplay.textContent = `大鹅: ${score}只`;
        setTimeout(() => {
            goose.remove();
        }, 200);
    });
    
    gameArea.appendChild(goose);
    
    // Physics movement
    let posY = 0;
    let posX = startX;
    let velocityY = Math.random() * 3 + 2;
    const speedX = (Math.random() - 0.5) * 4;
    const gravity = -0.1;
    const rotationSpeed = (Math.random() - 0.5) * 20;
    let rotation = 0;
    
    const move = () => {
        if (!gameActive) {
            clearInterval(moveInterval);
            return;
        }
        
        posX += speedX;
        posY += velocityY;
        velocityY += gravity;
        rotation += rotationSpeed;
        
        goose.style.left = `${posX}px`;
        goose.style.bottom = `${posY}px`;
        goose.style.transform = `rotate(${rotation}deg)`;
        
        // Remove when off screen
        if (posY <= -100 || posX <= -100 || posX > window.innerWidth + 100) {
            goose.remove();
            clearInterval(moveInterval);
        }
    };
    
    const moveInterval = setInterval(move, 20);
}

// Initialize game
async function initGame() {
    await setupCamera();
    startTimer();
    
    // Create geese periodically
    setInterval(createGoose, 800);
    
    // Initial geese
    for (let i = 0; i < 3; i++) {
        setTimeout(createGoose, i * 500);
    }
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', initGame);