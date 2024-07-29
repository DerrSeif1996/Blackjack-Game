let player = {
    name: "oussama",
    credits: 125
};

let bot = {
    name: "Bot",
    credits: 125
};

let playerCards = [];
let botCards = [];
let playerSum = 0;
let botSum = 0;
let hasBlackJack = false;
let isAlive = false;
let roundEnded = false;

let message = "";
const messageEl = document.getElementById("message-el");
const playerSumEl = document.querySelector("#sumEl");
const botSumEl = document.querySelector("#sumElb");
const playerCardEl = document.querySelector("#cardEl");
const botCardEl = document.querySelector("#cardElb");

let playerScoreEl = document.querySelector("#player");
let botScoreEl = document.querySelector("#bot");

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    return randomNumber === 1 ? 11 : randomNumber > 10 ? 10 : randomNumber;
}

function startGame() {
    roundEnded = false;
    isAlive = true;
    hasBlackJack = false;

    playerCards = [getRandomCard(), getRandomCard()];
    botCards = [getRandomCard(), getRandomCard()];

    playerSum = playerCards.reduce((a, b) => a + b, 0);
    botSum = botCards.reduce((a, b) => a + b, 0);

    updateScores();
    botSumEl.textContent = `Bot Sum: 0`;
    renderGame();
}

function renderGame() {
    updateCardElements(playerCardEl, "Your Cards: ", playerCards);
    updateCardElements(botCardEl, "Bot Cards: ", []);

    playerSumEl.textContent = `Sum: ${playerSum}`;
    updateGameStatus();
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack && !roundEnded) {
        let newCard = getRandomCard();
        playerSum += newCard;
        playerCards.push(newCard);
        renderGame();
    }
}

function renderBotGame() {
    while (botSum < 17) {
        botCards.push(getRandomCard());
        botSum = botCards.reduce((a, b) => a + b, 0);
    }
    updateCardElements(botCardEl, "Bot Cards: ", botCards);
    botSumEl.textContent = `Bot Sum: ${botSum}`;
    determineWinner();
}

function determineWinner() {
    if ((playerSum > botSum && playerSum <= 21) || (botSum > 21 && playerSum <= 21)) {
        message = "You won 🙂";
        player.credits += 10;
        bot.credits -= 10;
    } else if ((botSum > playerSum && botSum <= 21) || (playerSum > 21 && botSum <= 21)) {
        message = "You lost 🙂";
        player.credits -= 10;
        bot.credits += 10;
    } else {
        message = "It's a tie 🙂";
    }
    updateScores();
    messageEl.textContent = message;
}

function endRound() {
    if (isAlive && !hasBlackJack) {
        roundEnded = true;
        message = "You ended the round 🙂";
        renderBotGame();
    }
}

function updateGameStatus() {
    if (playerSum <= 20 && !roundEnded) {
        message = "Do you want to draw a new card? 🙂";
    } else if (playerSum === 21 && !roundEnded) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
        roundEnded = true;
        renderBotGame();
    } else if (playerSum > 21 && !roundEnded) {
        message = "You're out of the game! 😭";
        isAlive = false;
        roundEnded = true;
        renderBotGame();
    } else if (playerSum <= 20 && roundEnded) {
        message = "You ended the round 🙂";
        renderBotGame();
    }
}

function updateCardElements(element, text, cards) {
    element.textContent = text + cards.join(" / ");
}

function updateScores() {
    playerScoreEl.textContent = `${player.name} has $${player.credits}`;
    botScoreEl.textContent = `${bot.name} has $${bot.credits}`;
}
