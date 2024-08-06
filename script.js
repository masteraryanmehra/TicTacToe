let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetButton");
let newGameBtn = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msg-container");
let winMsg = document.querySelector(".msg");
const originalColors = [];
let turn0 = true

let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

boxes.forEach((box) => {
    originalColors.push(window.getComputedStyle(box).backgroundColor); // Save the default color
});


const resetGame =() => {
    turn0 = true
    enableBoxes();
    msgContainer.classList.add("hide")
    count = 0;
    boxes.forEach((box, index) => {
        box.style.backgroundColor = originalColors[index];
    });

}



boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        
        if (turn0){
         box.innerText="O";
         box.style.backgroundColor="black";
         turn0 = false
        }
        else{
            box.innerText ="X";
            box.style.backgroundColor="white";
            turn0 = true;
        }
        box.disabled=true
        count++;
        console.log(count);
        checkWinner();
        

        
    })

})


const disableBoxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const drawGame = () => {
    winMsg.innerText="Game Resulted in Draw \n scroll down to review the recent game";
    msgContainer.classList.remove("hide");
}

const showWinner = (winner) => {
    winMsg.innerText = `Congratulations, Winner is ${winner} \n scroll down to review the recent game`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
        let winnerFound = false;

        for(pattern of winPatterns){
            const pos1Val = boxes[pattern[0]].innerText;
            const pos2Val = boxes[pattern[1]].innerText;
            const pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                if(pos1Val === pos2Val && pos2Val == pos3Val){
                    showWinner(pos1Val)
                    winnerFound = true; 
                    break;
                }
            }
        }
    if (!winnerFound && count === 9) {
        drawGame();
    }
    
};




newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame); 
