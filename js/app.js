// /*
//  * Create a list that holds all of your cards
//  */
// var symbolList = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane", "fa fa-paper-plane", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
// var opened = [];
// var moves = 0;
// var matches = 0;
// var timer = document.querySelector(".timer");
// var scores = document.querySelector(".score-panel");
// var numberMoves = document.querySelector(".moves");
// var stars = document.querySelectorAll(".fa-star");
// var restart = document.querySelector(".restart");
// var timer;
// var rating = 0;
// var deck = document.querySelector(".deck");
// var startTimer = true;
// var startNewGame = document.getElementById("new-game");


// // Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length,
//         temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// };


// /*
//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  */

// function init() {
//     deck.innerHTML = "";
//     var newCards = shuffle(symbolList);
//     moves = 0;
//     rating = 0;
//     timer = 0;
//     matches = 0;
//     document.querySelector(".moves").innerHTML = 0;
//     for (var i = 0; i < newCards.length; i++) {
//         deck.innerHTML += '<li class="card"><i class="' + newCards[i] + '"></i></li>';
//     }
//     for (var i = 0; i < stars.length; i++) {
//         stars[i].classList = "fa fa-star";
//     }
//     clickListener();
// };

// function clickListener() {
//     displayCard();
// };

// /*
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  * 
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  *  - if the list already has another card, check to see if the two cards match
//  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
//  */

// function displayCard() {
//     deck.addEventListener("click", function(e) {
//         var showCards = document.querySelectorAll(".show");
//         if (showCards.length > 1) {
//             return true;
//         }
//         if (e.target.classList.contains('open')) {
//             return true;
//         }
//         if (!e.target.classList.contains('match open')) {
//             e.target.classList += " open show";
//             addCard(e.target.innerHTML);
//         }
//     })
// };
// //Add card to the list of open cards
// function addCard(card) {
//     opened.push(card);
//     matchCheck();
// }

// //Check matches
// function matchCheck() {
//     if (opened[0] === opened[1]) {
//         console.log(opened[0])
//     }
// }










// restart.addEventListener("click", function() {
//     init();
// })

// init();



//Model - holds the data of the app
function Model() {
    this.matches = 0;
    this.endGame = false;
    this.matchStatus = false;
    this.moves = 0;
    this.openCards = 0;
    this.show = [];
    this.symbols = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane", "fa fa-paper-plane", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
};
Model.prototype.shuffle = function(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
Model.prototype.increaseOpenCards = function() {
    this.openCards++;
};
Model.prototype.increaseMoves = function() {
    this.moves++;
};
Model.prototype.increaseMatches = function() {
    this.matches++;
};
Model.prototype.pushOpened = function(card) {
    if (this.show.length < 2) {
        this.show.push(card);
    }
};
Model.prototype.checkMatch = function() {
    if (this.show.length === 2) {
        if (this.show[0] === this.show[1]) {
            console.log("There is a match");
            this.matches++;
            this.matchStatus = true;
        } else {
            console.log("There is no match!");
        }
    }
};
Model.prototype.checkEndGame = function() {
    if (this.matches === 8) {
        console.log("You won the game!");
        this.endGame = true;
    };
};
Model.prototype.resetModel = function() {
    this.matches = 0;
    this.matchStatus = false;
    this.moves = 0;
    this.openCards = 0;
    this.show = [];
}

function View() {
    this.timer = document.querySelector(".timer");
    this.startGameButton = document.getElementById("startGame");
    this.modalEnd = '<div class="modal"><div class="modal-content"><span class="close">&times;</span><h1>Congratulations!!</h1><h3>You have made 23 moves </h3><h3>You won 3 stars</h3><h3>You time is 3 minutes! </h3><button class="modal-button">OK</button></div></div>';
    this.modalStart = document.querySelector(".modal");
    this.scores = document.querySelector(".score-panel");
    this.numberMoves = document.querySelector(".moves");
    this.stars = document.querySelectorAll(".fa-star");
    this.restart = document.querySelector(".restart");
    this.deck = document.querySelector(".deck");
    this.newGame = document.getElementById("new-game");
    this.cards = document.querySelectorAll(".card");
};
View.prototype.createCardsHtml = function(array) {
    this.deck.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        this.deck.innerHTML += '<li class="card"><i class="' + array[i] + '"></i></li>';
    }
};
View.prototype.updateStars = function(moves) {
    for (var i = 0; i < this.stars.length; i++) {
        if (moves > 15) {
            this.stars[2].className = "fa fa-star-o";
        } else if (moves > 10) {
            this.stars[1].className = "fa fa-star-o";
        } else if (moves > 5) {
            this.stars[0].className = "fa fa-star-o";;
        } else {
            for (var j = 0; j < this.stars.length; j++) {
                this.stars[j].className = "fa fa-star";
            }
        }
    }
};
View.prototype.updateMoves = function(moves) {
    this.numberMoves.innerHTML = moves;
};
View.prototype.lockCards = function() {
    for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].className === "card open show") {
            this.cards[i].className = "card open match";
        }
    }
    console.log("Cards locked")
};
View.prototype.flipBackCards = function() {
    var that = this;
    setTimeout(function() {
        for (var i = 0; i < that.cards.length; i++) {
            if (that.cards[i].className === "card open show") {
                that.cards[i].className = "card";
            }
        }
    }, 300)

    console.log("Cards flipped!");
};
View.prototype.resetCards = function() {
    for (var i = 0; i < this.cards.length; i++) {
        this.cards[i].className = "card";
    }
};




//Controller - assign the event listeners and help the view and the controller to 'talk' to each other

function Controller() {
    //Assign self for an instance of this
    var self = this;
    this.model = new Model();
    this.view = new View();
    //Update the view = call methods form the View 
    this.viewUpdate = function() {
        this.view.updateStars(this.model.moves);
        this.view.updateMoves(this.model.moves);
    };
    //Display the cards on the screen
    this.displayCards = function() {
        this.view.createCardsHtml(this.model.shuffle(this.model.symbols));
    };
    //Update the model - call methods from the Model
    this.modelUpdate = function(element) {
        this.model.increaseOpenCards();
        this.model.increaseMoves();
        this.model.pushOpened(element);
        this.model.checkMatch();
        this.model.checkEndGame();
    };
    //Close the starting modal window and start the game
    this.closeStartModal = function() {
        var self = this;
        this.view.startGameButton.addEventListener("click", function(e) {
            e.preventDefault();
            self.view.modalStart.className += " hide";
        })
    };
    this.restartGame = function() {
        self.model.resetModel();
        self.view.updateStars(self.model.moves);
        self.view.updateMoves(self.model.moves);
        self.view.resetCards();
        console.log(self.model.moves)
        console.log("Game Restarted");

    };
    //Check if there is a match and if is true lock the opened cards, if it's false flip the cards back
    this.openCloseCard = function() {
        if (this.model.matchStatus === true && this.model.show.length === 2) {
            this.view.lockCards();
            this.model.matchStatus = false;
            this.model.show = [];
        } else if (self.model.matchStatus === false && this.model.show.length === 2) {
            this.view.flipBackCards();
            this.model.matchStatus = false;
            this.model.show = [];
        }
    };
    //Add event listener to the deck using event delegation
    this.AddClickEvent = function() {
        this.view.deck.addEventListener("click", this.clickCard);
        this.view.restart.addEventListener('click', this.restartGame);
        this.closeStartModal();
    };
    //The actions performed after the card is clicked
    this.clickCard = function(e) {
        if (e.target.className === "card") {
            if (e.target.className !== "card open show") {
                e.target.className = "card open show";
                self.viewUpdate();
                self.modelUpdate(e.target.innerHTML);
                self.openCloseCard();
                console.log("Card clicked!")
            }
        }
    };
}
Controller.prototype.init = function() {
    this.AddClickEvent();

};

var start = new Controller();
start.init();