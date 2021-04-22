//DECK VARIABLES
let suits = ["Heart", "Diamond", "Club", "Spade"];
let cards = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let deck = [];
//BUTTON VARIABLES
const newGameBtn = document.getElementById("fresh");
const dealBtn = document.getElementById("deal");
const hitBtn = document.getElementById("hit");
const stickBtn = document.getElementById("stick");
//DECK VARIABLES
const deckSizeBox = document.getElementById("deck-size-box");
let dealtCardsData = document.getElementsByClassName("card-data");
let dealtCards = document.getElementsByClassName("card");
//PLAYER VARIABLES
const pCard1 = document.getElementById("player-card1");
const pCard2 = document.getElementById("player-card2");
const pCard3 = document.getElementById("player-card3");
const pCard4 = document.getElementById("player-card4");
const pCard5 = document.getElementById("player-card5");
const pc1 = document.getElementById("pc1-data");
const pc2 = document.getElementById("pc2-data");
const pc3 = document.getElementById("pc3-data");
const pc4 = document.getElementById("pc4-data");
const pc5 = document.getElementById("pc5-data");
//DEALER VARIABLES
const dCard1 = document.getElementById("dealer-card1");
const dCard2 = document.getElementById("dealer-card2");
const dCard3 = document.getElementById("dealer-card3");
const dCard4 = document.getElementById("dealer-card4");
const dCard5 = document.getElementById("dealer-card5");
const dc1 = document.getElementById("dc1-data");
const dc2 = document.getElementById("dc2-data");
const dc3 = document.getElementById("dc3-data");
const dc4 = document.getElementById("dc4-data");
const dc5 = document.getElementById("dc5-data");
//SCORE VARIABLES
const pScore = document.getElementById("player-score");
const dScore = document.getElementById("dealer-score");
let playerScore = 0;
let dealerScore = 0;
//ACTIVE CARD VARIABLE
let playerCardsDealt = 0;
let dealerCardsDealt = 0;

//FUNCTIONS
const deckLength = () => {
    deckSizeBox.innerHTML = deck.length;
};
const newGame = () => {
    freshDeck();
    cardClear();
    updatePlayerScore(0);
    updateDealerScore(0);
};
const freshDeck = () => {
    let newDeck = new Array();
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < cards.length; j++) {
            let card = { Suit: suits[i], Value: cards[j] };
            newDeck.push(card);
        }
    }
    deck = newDeck;
    deckLength();
};
const cardClear = () => {
    for (let i = 0; i < dealtCardsData.length; i++) {
        dealtCardsData[i].innerHTML = "";
    }
    for (let j = 0; j < dealtCards.length; j++) {
        dealtCards[j].style.opacity = 0;
    }
};
const removeFromDeck = (num) => {
    deck.splice(num, 1);
};
const suitCheckUpdate = (card, item) => {
    if (card.Suit === "Heart") {
        let cardCh = item.children;
        cardCh[0].innerHTML = card.Value;
        cardCh[1].innerHTML = "&#9829";
        cardCh[2].innerHTML = "&#9829";
        cardCh[3].innerHTML = "&#9829";
        cardCh[4].innerHTML = card.Value;
        updateCardColor("red", item);
    } else if (card.Suit === "Diamond") {
        let cardCh = item.children;
        cardCh[0].innerHTML = card.Value;
        cardCh[1].innerHTML = "&#9830";
        cardCh[2].innerHTML = "&#9830";
        cardCh[3].innerHTML = "&#9830";
        cardCh[4].innerHTML = card.Value;
        updateCardColor("red", item);
    } else if (card.Suit === "Club") {
        let cardCh = item.children;
        cardCh[0].innerHTML = card.Value;
        cardCh[1].innerHTML = "&#9827";
        cardCh[2].innerHTML = "&#9827";
        cardCh[3].innerHTML = "&#9827";
        cardCh[4].innerHTML = card.Value;
        updateCardColor("black", item);
    } else {
        let cardCh = item.children;
        cardCh[0].innerHTML = card.Value;
        cardCh[1].innerHTML = "&#9824";
        cardCh[2].innerHTML = "&#9824";
        cardCh[3].innerHTML = "&#9824";
        cardCh[4].innerHTML = card.Value;
        updateCardColor("black", item);
    }
};
const randomCard = (item, person) => {
    let randomNum = Math.floor(Math.random() * deck.length);
    let card = deck[randomNum];
    suitCheckUpdate(card, item);
    if (person === "player") {
        updatePlayerScore(card.Value);
    } else if (person === "dealer") {
        updateDealerScore(card.Value);
    } else {
        console.log("error with score update");
    }
    removeFromDeck(randomNum);
    deckLength();
};
const updatePlayerScore = (num) => {
    if (isNaN(num)) {
        playerScore += 10;
        pScore.innerHTML = playerScore;
    } else if (num === 0) {
        playerScore = 0;
        pScore.innerHTML = playerScore;
    } else {
        playerScore += num;
        pScore.innerHTML = playerScore;
    }
};
const updateDealerScore = (num) => {
    if (isNaN(num)) {
        dealerScore += 10;
        dScore.innerHTML = dealerScore;
    } else if (num === 0) {
        dealerScore = 0;
        dScore.innerHTML = dealerScore;
    } else {
        dealerScore += num;
        dScore.innerHTML = dealerScore;
    }
};
const updateCardColor = (color, item) => {
    let cardCh = item.children;
    for (let i = 0; i < cardCh.length; i++) {
        cardCh[i].style.color = color;
    }
};
const dealCards = () => {
    setTimeout(() => {
        randomCard(pc1, "player");
        pCard1.style.opacity = 1;
    }, 200);
    setTimeout(() => {
        randomCard(dc1, "dealer");
        dCard1.style.opacity = 1;
    }, 400);
    setTimeout(() => {
        randomCard(pc2, "player");
        pCard2.style.opacity = 1;
    }, 600);
    setTimeout(() => {
        randomCard(dc2, "dealer");
        dCard2.style.opacity = 1;
    }, 800);
    playerCardsDealt = 2;
    dealerCardsDealt = 2;
};

//ONLOAD FUNCTION CALL
newGame();

//EVENT LISTENERS
newGameBtn.addEventListener("click", () => {
    dealBtn.disabled = false;
    hitBtn.disabled = true;
    stickBtn.disabled = true;
    newGame();
});
dealBtn.addEventListener("click", () => {
    dealBtn.disabled = true;
    hitBtn.disabled = false;
    stickBtn.disabled = false;
    dealCards();
});
