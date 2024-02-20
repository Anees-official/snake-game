let direction={x:0, y:0}
let speed=8;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:7,y:6}
function main(ctime) {
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000< 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
            return true;
        }
    }
    if (snake[0].x<=0 || snake[0].x>=18 || snake[0].y>=18 || snake[0].y<=0) {
        return true;
    }
}

function gameEngine(){
    // collide
    if(isCollide(snakeArr)){
        direction={x:0, y:0}
        alert("GAME OVER")
        snakeArr=[{x:13,y:15}]
        food={x:7,y:6}
        score=0
    }
    // upadting snake arr and food
    if (snakeArr[0].x===food.x && snakeArr[0].y===food.y) {
        snakeArr.unshift({x:snakeArr[0].x+direction.x, y:snakeArr[0].y+direction.y})
        let a=2;
        let b=18;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
        score=snakeArr.length-1;
        scoreboard.innerHTML = "SCORE:" + score;
    }
 
    for (let i = snakeArr.length-2; i>=0; i--) {
        // const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x += direction.x
    snakeArr[0].y += direction.y
    // display snake and food
    board.innerHTML=""
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index===0) {
            snakeElement.classList.add("head")
        }
        else{
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })
    // display food 
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("food")
        board.appendChild(foodElement)
}

// main logic
window.requestAnimationFrame(main)

window.addEventListener("keydown", e=>{

    if(e.key=="ArrowDown"){
        direction={x:0, y:1}
    }
    else if (e.key=="ArrowRight") {
        direction={x:1, y:0}   
    }
    else if(e.key=="ArrowLeft"){
        direction={x:-1, y:0}  
    }
    else{
        direction={x:0, y:-1}
    }

})

