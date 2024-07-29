
let playerr = {
    name: "oussama",
    credits: 125
};

let Bot = {
    name: "Bot",
    credits: 125
};




let Cards = [] ;
let bcards = [] ;
let sum = 0;
let sumb = 0;
let hasBlackJack = false ;
let isAlive = false;
let roundended = false;


let message ="";
const message_el = document.getElementById("message-el");
const sumEl = document.querySelector("#sumEl");
const sumElb = document.querySelector("#sumElb");
const cardEl = document.querySelector("#cardEl");
const cardElb = document.querySelector("#cardElb");


let playerScore = document.querySelector("#player");
playerScore.textContent = `${playerr.name} has $${playerr.credits}`;

let botScore = document.querySelector("#bot");
botScore.textContent = `${Bot.name} has $${Bot.credits}`;

function getrandomcard (){
    let randomNumber = Math.floor(Math.random()*13) + 1;
    if( randomNumber === 1){
        return 11
    }else if (randomNumber > 10 ){
        return 10
    }else { 
        return randomNumber 
    }
}


function startGame(){
    roundended = false;
    isAlive = true;
    hasBlackJack = false ;

    Cards = [getrandomcard (),getrandomcard ()];
    bcards = [getrandomcard (),getrandomcard ()];
    

    sum = Cards.reduce((a, b) => a + b, 0);
    sumb = bcards.reduce((a, b) => a + b, 0);


   
    renderGame();
    
}
function renderGame(){

    cardEl.textContent = "Your Cards: " + Cards.join(" / ");
    cardElb.textContent = "Bot Cards: " + bcards.join(" / ");
    sumEl.textContent = `Sum: ${sum}`;
    sumElb.textContent = `Bot Sum: ${sumb}`;

    if (sum <= 20 && roundended == false) {
        message ="Do you want to draw a new card? 🙂";
    } else if (sum === 21 && roundended == false) {
        message ="Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true ;
        roundended = true;
        renderbotgame();
    } else if (sum > 21 && roundended == false) {
        message ="You're out of the game! 😭";
        isAlive = false;
        roundended = true;
        renderbotgame();
    }else if (sum <= 20 && roundended == true) {
        message ="you ended the round 🙂";
        renderbotgame();
    } 
    message_el.textContent = message ;
    
}
function newCard(){
    if( isAlive == true && hasBlackJack == false && roundended == false ){
        let newCardd = getrandomcard ();
        sum+=newCardd;
        Cards.push(newCardd);
        renderGame();
    }
    
}

function renderbotgame(){
    
    while ( sumb < 17){
        bcards.push(getrandomcard ());
        sumb = bcards.reduce( (a , b) => a + b, 0 );
        
    }
    sumElb.textContent = `Bot sum: ${sumb}`;
    determineWinner();
}

function determineWinner(){
    if((sum > sumb && sum <= 21 ) || ( sumb > 21 && sum < 21) ) {
        message ="you won 🙂";
    }else if ((sumb > sum && sumb <= 21) ||( sum > 21 && sumb < 21) ){
        message ="you lost 🙂";
    }else {
        message = "It's a tie 🙂";
    }
    message_el.textContent = message ;

}
function endround(){
    if( isAlive == true && hasBlackJack == false){
        roundended = true;
        message ="you ended the round 🙂";
        renderbotgame();
    }
    
}