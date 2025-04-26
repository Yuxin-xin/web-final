let score = 0;
let timeLeft = 180;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');

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
scoreDisplay.textContent = score;
setTimeout(() => goose.remove(), 200);
});
            
gameArea.appendChild(goose);
            
// 自动移动
let pos = 0;
const speed = 2 + Math.random() * 3;
const move = setInterval(() => {
pos += speed;
goose.style.bottom = pos + 'px';
                
// 移出屏幕后删除
if(pos > window.innerHeight) {
clearInterval(move);
goose.remove();
}
}, 20);
}

// 每1秒生成一只大鹅
setInterval(createGoose, 1000);
        
// 初始生成3只
for(let i=0; i<3; i++) {
setTimeout(createGoose, i * 300);
}