let boxes = document.querySelectorAll('.cell')           //boxes
let winnerMsg = document.querySelector('#wins-msg')    //winner msg
let drawMsg = document.querySelector('#draw-msg')    //draw msg

gsap.from(boxes,{
    duration: 1,
    opacity: 0,
    ease: "power2.out", 
    stagger:0.2
})
gsap.from('.game-title',{
    duration: 1.5,
    y: -80,
    opacity: 0,
    ease: "power2.out",
})
gsap.from('footer',{
    duration: 2.4,
    y: 50,
    opacity: 0,
    ease: "power2.out",
})
gsap.to('#reset-button',{
    duration: 1,
    opacity: 1,
    delay:0.5,
    ease: "power    2.out",
})




let winConditionIndex = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



let player0 = true;
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(player0){
            box.textContent = 'O'
            player0 = false;
        }
        else {
            box.textContent = 'X'
            player0 = true;
        }
        box.disabled = true;
        checkWinningConditions(box.textContent);
        draw()
        gsap.from(drawMsg,{
            duration: 0.6,
            x: 500,
            opacity: 0,
            ease: "power2.out",
        })
    })
    
})

function checkWinningConditions(player){
    for(let condition of winConditionIndex){
        let values1 = boxes[condition[0]].innerHTML;    
        let values2 = boxes[condition[1]].innerHTML; 
        let values3 = boxes[condition[2]].innerHTML; 
        if(values1 != "" && values2 != "" && values3 != ""){
            if(values1 === values2 && values2 === values3){
                winnerMsg.classList.remove('hidden')
                winnerMsg.textContent = `Player ${player} wins!`
                disableBoxes()
                gsap.from(winnerMsg,{
                    duration: 0.6,
                    x: 500,
                    opacity: 0,
                    ease: "power2.out",
                })

            }   
        }   
    }
}
function draw(){
    let condition= true;
    boxes.forEach((box)=>{
        if(box.textContent === ''){
            condition = false
            return;
        }
    })   
    if(condition){
        let condition2 = winnerMsg.classList.contains('hidden')
        if(condition2){
            drawMsg.classList.remove('hidden')
        }
    } 
}

function reset(){
    winnerMsg.classList.add('hidden')
    drawMsg.classList.add('hidden')
    player0 = true;
    boxes.forEach((box)=>{
        box.textContent = '';
        box.disabled = false;
    })
}

function disableBoxes(){
    boxes.forEach((box)=>{
        box.disabled = true;
    })
}




