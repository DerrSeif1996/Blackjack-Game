let firstCard = 7 ;
let secondCard = 3;
let Cards = [firstCard , secondCard] ;

let sum = firstCard + secondCard;
let hasBlackJack = false ;
let isAlive = true;
let gamestarted = false;
let message ="";
const message_el = document.getElementById("message-el");
const sumEl = document.querySelector("#sumEl");
const cardEl = document.querySelector("#cardEl");

function startGame(){
    renderGame();
}
function renderGame(){

    cardEl.textContent = `Cards: ${Cards[0]}  ${Cards[1]}` ;
    sumEl.textContent = `Sum: ${sum}`;
    if (sum <= 20) {
        message ="Do you want to draw a new card? 🙂";
    } else if (sum === 21) {
        message ="Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true ;
    } else {
        message ="You're out of the game! 😭";
        isAlive = false;
    }
    message_el.textContent = message ;
    gamestarted = true ;
}
function newCard(){
    if(hasBlackJack == false && isAlive == true && gamestarted == true){
        let newCardd = 11 ;
        sum+=newCardd;
        renderGame();
       
    }
    
}