let img = document.querySelector('goose')

if (!img) {
    img = document.createElement('div');
    img.className = 'goose';
    img.innerHTML = '<img src="asset/goose1.gif" alt="goose move">';
    document.body.appendChild(img);
}
// 定义小图片的旋转角度
let deg = 0
// 定义小图片位于网页左侧的位置
let imgx = 0
// 定义小图片位于网页顶部的位置
let imgy = 0
// 定义小图片x轴的位置
let imgl = 0
// 定义小图片y轴的位置
let imgt = 0
// 定义小图片翻转的角度
let y = 0
// 定义一个计数器
let index = 0

window.addEventListener('mousemove',function(event){
    // 获取网页左侧距离的图片位置
    imgx = event.clientX - img.offsetLeft - img.clientWidth /2
    // 多去网页顶部距离图片的位置
    imgy = event.clientY - img.offsetTop - img.clientHeight /2
    // 套入公式，定义图片的旋转角度
    deg = 360*Math.atan(imgy/imgx)/(2*Math.PI)
    // 每当鼠标移动的时候重置index
    index= 0
    // 定义当前鼠标的位置
    let x = event.clientX
    // 当鼠标的x轴大于图片的时候，提普安就要对着鼠标，所以需要将图片翻转过来
    // 否则就不用翻转
    if(img.offsetLeft<x){
        y=-180
    }else{
        y=0
    }
})
setInterval(()=>{
    // 设置小图片的旋转和翻转
    img.style.transform = "rotateZ("+deg+"deg) rotateY("+y+"deg)"
    index++
    // 在这里设置小图片的位置和速度，并判断小图片到达鼠标位置时停止移动
    if(index<50){
        imgl+=imgx/50
        imgt+=imgy/50
    }
    img.style.left = imgl+"px"
    img.style.top = imgt+"px"
},10)



/*// 获取大鹅元素
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

/*loadGoatImage('./assets/goose1.gif');
function loadGoatImage(imageUrl) {
    // 创建图片元素
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "goose move";
    
    // 添加到大鹅元素中
    goose.appendChild(img);
    
    // 添加has-image类标记
    goose.classList.add('has-image');
    
    // 图片加载失败时回退到文字
    img.onerror = function() {
        goose.classList.remove('has-image');
        this.remove();
    };
}*/