//Game constant & variables

let inputDirection ={x:0, y:0};
let board=document.querySelector(".board");
let scoreBox=document.querySelector(".score");
let btn=document.querySelector(".btn");
let tryAgain=document.querySelector(".tryAgain");
let popup=document.querySelector(".popup");
let yourScore=document.querySelector(".your-score");
let hiscoreBox=document.querySelector(".hiScore");

let up=document.querySelector(".up");
let down=document.querySelector(".down");
let left=document.querySelector(".left");
let right=document.querySelector(".right");

const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let isPlaying = true;
let speed =4;
let score =0;
let lastPaintTime= 0;
let snakeArr = [ {x:13, y:15} ];

food = {x:6, y:7};


//Game functions

function main(ctime){
window.requestAnimationFrame(main);
if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
}
    lastPaintTime = ctime;
gameEngine();
}

function isCollide(snake){

    // if you bump into yourself

    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if you bump into the wall

    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){
         // Part 1: Updating the snake array & food
if(isPlaying === true){

         if(isCollide(snakeArr)){
            gameOverSound.play();
            musicSound.pause();
            inputDirection = {x:0, y:0};
            tryAgain.style.display="block";
            popup.style.display="block";
            board.style.opacity="0.9";
            // alert("Game over press any key to play again!");
            yourScore.innerText=`YOUR SCORE: ${score}`;
            snakeArr = [{x:13, y:15}];
            musicSound.play();
            score = 0;
         }

         tryAgain.addEventListener("click",()=>{
            tryAgain.style.display="none";
            popup.style.display="none";
            board.style.opacity="1";
            scoreBox.innerHTML= `Score: ${score}`;
         })

         //if you have eaten the food, increment the score and regenerate the food

         if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
            foodSound.play();
            score += 1;

            if(score > hiscoreVal){
                hiscoreVal = score;
                localStorage.setItem("hiScore", JSON.stringify(hiscoreVal));
                hiscoreBox.innerHTML= "HiScore: " + hiscoreVal;
            }

            // scoreBox.innerHTML= "Score: " + score;
            scoreBox.innerHTML= `Score: ${score}`;
            snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
            let a =2;
            let b =16;
            food= {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)*Math.random())} 
         }

         // Moving the snake

         for(let i= snakeArr.length -2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]};
         }
         snakeArr[0].x += inputDirection.x;
         snakeArr[0].y += inputDirection.y;

         // Part 2: Display the snake and food

    // Display the snake

   board.innerHTML="";
   snakeArr.forEach((e, index)=>{
   snakeElement=document.createElement("div");
   snakeElement.style.gridRowStart=e.y;
   snakeElement.style.gridColumnStart=e.x;

if(index === 0){
    snakeElement.classList.add("head");
}
else{
    snakeElement.classList.add("snake");
}
board.appendChild(snakeElement);
   }); 

// Display the food

   foodElement =document.createElement("div");
   foodElement.style.gridRowStart =food.y;
   foodElement.style.gridColumnStart =food.x;
   foodElement.classList.add("food");
   board.appendChild(foodElement);
}
pauseGame();
}


function pauseGame(){
    if(isPlaying === true){
        btn.addEventListener("click",()=>{
            isPlaying = false;
            btn.innerText="Play";
        })
    } 
    else if(isPlaying ===false){
        btn.addEventListener("click", ()=>{
            isPlaying =true;
            btn.innerText="Pause";
        })
    }
}

//Main logic start here

musicSound.play();

let hiScore = localStorage.getItem("hiscore");
if(hiScore === null){
    hiscoreVal =0;
    localStorage.setItem("hiScore", JSON.stringify(hiscoreVal))
}
else{
    hiscoreVal = JSON.parse(hiScore);
    hiscoreBox.innerHTML = "HiScore: " + hiScore;
}


window.requestAnimationFrame(main);


window.addEventListener("keydown", e =>{
    inputDirection= {x:0, y:0}             // Start the game
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            inputDirection.x=0;
            inputDirection.y=-1;
            isPlaying =true;
            break;

            case "ArrowDown":
            inputDirection.x=0;
            inputDirection.y=1;
            isPlaying =true;
            break;

            case "ArrowLeft":
            inputDirection.x=-1;
            inputDirection.y=0;
            isPlaying =true;
            break;

            case "ArrowRight":
            inputDirection.x=1;
            inputDirection.y=0;
            isPlaying =true;
            break;

            default:
                break;
    }
});

up.addEventListener("click", ()=>{
    inputDirection.x=0;
    inputDirection.y=-1;
    isPlaying =true;

})
down.addEventListener("click", ()=>{
    inputDirection.x=0;
    inputDirection.y=1;
    isPlaying =true;
})
left.addEventListener("click", ()=>{
    inputDirection.x=-1;
    inputDirection.y=0;
    isPlaying =true;
})
right.addEventListener("click", ()=>{
    inputDirection.x=1;
    inputDirection.y=0;
    isPlaying =true;
})



let touchStartX = 0;
let touchStartY = 0;

    board.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    });

    board.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if(Math.abs(deltaX) > Math.abs(deltaY)) {
        if(deltaX > 0 && inputDirection.x !== -1) {
            inputDirection.x=1;
            inputDirection.y=0;
            isPlaying=true;
        } 
        else if(deltaX < 0 && inputDirection.x !== 1) {
            inputDirection.x=-1;
            inputDirection.y=0;
            isPlaying=true;
        }
      } 
      else{
        if(deltaY > 0 && inputDirection.y !== -1) {
            inputDirection.x=0;
            inputDirection.y=1;
            isPlaying=true;
        }
      else if(deltaY < 0 && inputDirection.y !== 1) {
            inputDirection.x=0;
            inputDirection.y=-1;
            isPlaying=true;
        }
      }
    });





