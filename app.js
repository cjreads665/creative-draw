let canvas = document.querySelector("canvas");
// console.log(canvas);
canvas.width = window.innerWidth
canvas.height = window.innerHeight
//when we press the mouse key, paint should start
//when we keep the mouse pressed and drag, the paint should continue
//when we release the mouse, the paint should stop

/**
 * make variables for last position record keeping
 * when mouse is down, we start the drawing using stroke
 * when mouse is moved, we take the position of the clicked
 * when mouse is up, we stop the drawing.
 * when we move the mouse, there should'nt be drawing active
 */

//saturation and lightness
let sat = document.getElementById('sat')
let lightness = document.getElementById('light')
let saturation = 0


let lastX= 0
let lastY= 0
let isDrawing = false
let hsl = 0
let size = 1

function drawMeToo(e){
    if(isDrawing==false) return;
   let context=canvas.getContext('2d')
//    console.log(saturation);
   context.beginPath()
   context.lineWidth = size
    context.moveTo(lastX,lastY)
    context.lineTo(e.offsetX,e.offsetY)
    // context.strokeStyle = `hsl(${hsl},100%,100%`)
    context.strokeStyle = `hsl(${hsl}, 100%, 50%)`;
    context.stroke()
    lastX = e.offsetX
    lastY = e.offsetY
    hsl++
    if(size==100) size=1
    size++
}



function drawMe(e){
    if(isDrawing==false) return;
   let context=canvas.getContext('2d')
//    console.log(saturation);
   context.beginPath()
   context.lineWidth = size
    context.moveTo(lastX,lastY)
    context.lineTo(e.targetTouches[0].clientX,e.targetTouches[0].clientY)
    // context.strokeStyle = `hsl(${hsl},100%,100%`)
    context.strokeStyle = `hsl(${hsl}, 100%, 50%)`;
    context.stroke()
    lastX = e.targetTouches[0].clientX
    lastY = e.targetTouches[0].clientY
    hsl++
    if(size==100) size=1
    size++
}


//responsive code for canvas
canvas.addEventListener('touchstart',(e)=>{
    isDrawing=true
    lastX = e.targetTouches[0].clientX
    lastY = e.targetTouches[0].clientY
})
canvas.addEventListener('touchend',()=>isDrawing=false)
canvas.addEventListener('touchmove',drawMe)




//responsive code for desktop canvas
canvas.addEventListener('mousemove',drawMeToo)
canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true
    lastX = e.offsetX
    lastY = e.offsetY
})
canvas.addEventListener('mouseup',()=>isDrawing=false)

//button for reset
document.querySelector('button').addEventListener('click', ()=>{
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
})