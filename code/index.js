// 获取大鹅元素
const goose = document.querySelector('.goose');

// 更新大鹅位置
function updateGoatPosition(e) {
    const offset = goose.classList.contains('has-image') ? 25 : 15;
    goose.style.left = `${e.clientX - offset}px`;
    goose.style.top = `${e.clientY - offset}px`;
    
    // 浮动效果
    const floatOffset = Math.sin(Date.now() / 300) * 3;
    goose.style.transform = `translateY(${floatOffset}px)`;
}

// 监听鼠标移动
document.addEventListener('mousemove', updateGoatPosition);

// 初始化位置
window.addEventListener('load', () => {
    const offset = goose.classList.contains('has-image') ? 25 : 15;
    goose.style.left = `${window.innerWidth / 2 - offset}px`;
    goose.style.top = `${window.innerHeight / 2 - offset}px`;
});

/*******************************
 * 后期添加动图时调用的函数
 * 示例: loadGoatImage('./assets/goat.gif');
 ******************************/
function loadGoatImage(imageUrl) {
    // 创建图片元素
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "大鹅动画";
    
    // 添加到大鹅元素中
    goose.appendChild(img);
    
    // 添加has-image类标记
    goose.classList.add('has-image');
    
    // 图片加载失败时回退到文字
    img.onerror = function() {
        goose.classList.remove('has-image');
        this.remove();
    };
}