//Shuffle function - create an array of random card symbols

function shuffle(array) {
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
}

//Model - holds the data of the app
function Model() {
    this.endGameStatus = false;
    this.time = 0;
    this.matches = 0;
    this.matchStatus = false;
    this.moves = 0;
    this.openCards = 0;
    this.show = [];
    this.symbols = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane", "fa fa-paper-plane", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
}
//Increase the moves
Model.prototype.increaseMoves = function() {
    this.moves++;
};
//Increase the matches
Model.prototype.increaseMatches = function() {
    this.matches++;
};
//When the number of matches is 8 the function end the game and open a modal window
Model.prototype.checkEndGame = function(selector) {
    if (this.matches === 8) {
        selector.className += " open";
        this.endGameStatus = true;
    }
};
//Reset all the variables inside of the model component
Model.prototype.resetModel = function() {
    this.endGameStatus = false;
    this.time = 0;
    this.matches = 0;
    this.matchStatus = false;
    this.moves = 0;
    this.openCards = 0;
    this.show = [];
};
Model.prototype.increaseTime = function() {
    this.time++;
};


//View component - responsible for the html and for everything that the user see
function View() {
    this.endMoves = document.querySelector(".end-moves");
    this.endTime = document.querySelector(".end-time");
    this.rating = document.querySelector(".stars1");
    this.winGameButton = document.getElementById("winGame");
    this.timer = document.querySelector(".timer");
    this.startGameButton = document.getElementById("startGame");
    this.modalEnd = document.querySelector(".modal-end");
    this.modalStart = document.querySelector(".modal");
    this.scores = document.querySelector(".score-panel");
    this.numberMoves = document.querySelector(".moves");
    this.stars = document.querySelectorAll(".fa-star");
    this.restart = document.querySelector(".restart");
    this.deck = document.querySelector(".deck");
    this.newGame = document.getElementById("new-game");
    this.cards = document.querySelectorAll(".card");
}

//Create the cards inside of the deck element and take the array with random symbols for a parameter
View.prototype.createCardsHtml = function(array) {
    this.deck.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        this.deck.innerHTML += '<li class="card"><i class="' + array[i] + '"></i></li>';
    }
};
//Update the strar - it takes the model moves for an argument and calculate the stars
View.prototype.updateStars = function(moves) {
    for (var i = 0; i < this.stars.length; i++) {
        if (moves > 30) {
            this.stars[2].className = "fa fa-star-o";
        } else if (moves > 25) {
            this.stars[1].className = "fa fa-star-o";
        } else if (moves > 20) {
            this.stars[0].className = "fa fa-star-o";
        } else {
            for (var j = 0; j < this.stars.length; j++) {
                this.stars[j].className = "fa fa-star";
            }
        }
    }
};
//Update the moves on the screen it takes a parameter - number of moves
View.prototype.updateMoves = function(moves) {
    this.numberMoves.innerHTML = moves;
};
//Reset the cards on the screen  - close every open card
View.prototype.resetCards = function(cards) {
    for (var i = 0; i < cards.length; i++) {
        cards[i].className = "card";
    }
};





//Controller - assign the event listeners and help the view and the controller to 'talk' to each other

function Controller() {
    this.model = new Model();
    this.view = new View();
    var that = this;
    this.checkMatches = function() {
        if (this.model.show.length === 2) {
            if (this.model.show[0].childNodes[0].className === this.model.show[1].childNodes[0].className) {
                that.model.show[0].className = "card open match";
                that.model.show[1].className = "card open match";
                console.log("There is a match!");
                this.model.show = [];
                that.model.increaseMatches();

            } else {
                setTimeout(function() {
                    that.model.show[0].className = "card";
                    that.model.show[1].className = "card";
                    console.log("No match");
                    that.model.show = [];
                }, 300);

            }
        }
    };
    //Add event listener to the restart button and call a method to restart the game
    this.restart = function() {
        this.view.restart.addEventListener("click", function() {
            that.resetGame();
        });
    };
    this.startTimer = function() {
        setInterval(function() {
            if (that.model.endGameStatus === false) {
                that.updateTime();
                console.log("it works");
            }
        }, 1000);


    };
    //Add the time and the stars to the end game modal window, it takes the number of the moves and the time as //parameters
    this.appendStarsToModal = function(selector, moves, time, timeselector, endmoves) {
        if (moves > 30) {
            selector.innerHTML = '<li><i class="fa fa-star fa-2x yellow"></i></li>';
        } else if (moves > 25) {
            selector.innerHTML = '<li><i class="fa fa-star fa-2x yellow"></i></li><li><i class="fa fa-star fa-2x yellow"></i></li>';
        } else {
            selector.innerHTML = '<li><i class="fa fa-star fa-2x yellow"></i></li><li><i class="fa fa-star fa-2x yellow"></i></li><li><i class="fa fa-star fa-2x yellow"></i></li>';
        }
        timeselector.innerHTML = "Your time is " + time;
        endmoves.innerHTML = 'Your moves are ' + moves;
    };
    this.transformSeconds = function(sec) {
        var hours = Math.floor(sec / 3600);
        var minutes = Math.floor((sec - (hours * 3600)) / 60);
        var seconds = sec - (hours * 3600) - (minutes * 60);

        // round seconds
        seconds = Math.round(seconds * 100) / 100;

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    };
    this.updateTime = function() {
        this.model.increaseTime();
        this.view.timer.innerHTML = this.transformSeconds(this.model.time);
    };
    //Method that reset the game
    this.resetGame = function() {
        this.model.resetModel();
        this.view.resetCards(this.view.cards);
        this.view.updateMoves(this.model.moves);
        this.view.updateStars(this.model.moves);
        that.displayCards();
    };
    //The function close the modal window after you win the game and start a new game
    this.closeModalEnd = function() {
        this.view.winGameButton.addEventListener("click", function() {
            that.view.modalEnd.classList.remove("open");
            that.resetGame();
        });
    };
    //Close the modal window before you start the game
    this.closeModalStart = function() {
        this.view.startGameButton.addEventListener("click", function() {
            that.view.modalStart.className += " hide";
            that.startTimer();
        });
    };
    //Call the method that creates the random card's html
    this.displayCards = function() {
        this.view.createCardsHtml(shuffle(this.model.symbols));

    };
    //Add click event to the cards - use event delegation
    this.addClickEvent = function() {
        this.view.deck.addEventListener("click", function(e) {
            e.preventDefault();
            if (e.target.className === "card") {
                e.target.className = "card open show";
                that.model.show.push(e.target);
                //Call the check match method
                that.checkMatches();
                that.model.increaseMoves();
                that.view.updateMoves(that.model.moves);
                that.view.updateStars(that.model.moves);
                that.model.checkEndGame(that.view.modalEnd);
                //this method add that stars and the time to the end game modal window
                that.appendStarsToModal(that.view.rating, that.model.moves, that.transformSeconds(that.model.time), that.view.endTime, that.view.endMoves);
            }
        });
    };
}
//Start the game
var start = new Controller();
start.closeModalEnd();
start.closeModalStart();
start.displayCards();
start.addClickEvent();
start.restart();