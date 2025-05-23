let score = 0;
let timeLeft = 10;
let gameActive = true;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');




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
function endGame() {
    gameActive = false;
    localStorage.setItem('gooseGameScore', score);
    window.location.href = 'final.html'; // 跳转到昵称设置页面
}