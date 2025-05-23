let text = document.getElementById('text');
let btn = document.getElementById('start-btn');
let green = document.getElementById('green');
let bigdoose = document.getElementById('bigGoose');
let header = document.getElementById('header');

let img = document.querySelector('goose');

if (!img) {
    img = document.createElement('div');
    img.className = 'goose';
    img.innerHTML = '<img src="asset/goose1.gif" alt="goose move">';
    document.body.appendChild(img);
}
let deg = 0
let imgx = 0
let imgy = 0
let imgl = 0
let imgt = 0
let y = 0
let index = 0

window.addEventListener('scroll', function(){
    let value = this.window.scrollY;

    text.style.top = 30+value * -0.5 + '%';
    bigdoose.style.top = 20+value * -0.3 + '%';
    btn.style.marginTop = value*0.5+'%';
})

window.addEventListener('mousemove',function(event){
    imgx = event.clientX - img.offsetLeft - img.clientWidth /2
    imgy = event.clientY - img.offsetTop - img.clientHeight /2
    deg = 360*Math.atan(imgy/imgx)/(2*Math.PI)
    index= 0
    let x = event.clientX
    if(img.offsetLeft<x){
        y=-180
    }else{
        y=0
    }
})
setInterval(()=>{
    img.style.transform = "rotateZ("+deg+"deg) rotateY("+y+"deg)"
    index++
    if(index<50){
        imgl+=imgx/50
        imgt+=imgy/50
    }
    img.style.left = imgl+"px"
    img.style.top = imgt+"px"
},10)


