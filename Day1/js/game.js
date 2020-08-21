/*------------------------
        Variables
--------------------------*/
// Globale Variables
var flip_duration = 500, // duration to flip card
    cards = document.querySelectorAll(".card"),
    card_container = document.querySelector(".game__box"),
    correct_flip = 0,
    mode = JSON.parse(localStorage.getItem("mode"));

var c = 1;
for (let i = 0; i < cards.length; i++) {
    const element = cards[i].querySelector("img");
    element.src = "img/" + mode.path + "/" + c + mode.ex;
    cards[i].classList.add("is_fliped");
    if (i % 2 == 1) {
        c++;
    }
}

setTimeout(function (params) {
    cards.forEach((element) => element.classList.remove("is_fliped"));
}, 5000);

// Main function
for (let index = 0; index < cards.length; index++) {
    const element = cards[index];

    element.addEventListener("click", function (params) {
        main(this);
    });
}

// set Cards
var cards_indexes = Array.from(Array(cards.length).keys());
var shuffled_cards = shuffle(cards_indexes);
for (let i = 0; i < cards.length; i++) {
    const element = cards[i];

    element.style.order = shuffled_cards[i];
}
// Variables Fontion
var selected_stack = [];

function main(card) {
    // add card .back img src to selected stack
    if (
        !card.classList.contains("is_fliped") &&
        !card.classList.contains("is_matched")
    ) {
        selected_stack.push(card);
    }

    // Flip Card
    flipCard(card);

    if (selected_stack.length >= 2) {
        console.log("two cards selected");

        if (
            isSame(
                selected_stack[0].lastElementChild.firstElementChild.src,
                selected_stack[1].lastElementChild.firstElementChild.src
            )
        ) {
            selected_stack[0].classList.remove("is_fliped");
            selected_stack[1].classList.remove("is_fliped");
            selected_stack[0].classList.add("is_matched");
            selected_stack[1].classList.add("is_matched");
            selected_stack = [];
            correct_flip++;
        } else {
            setTimeout(function () {
                selected_stack[0].classList.remove("is_fliped");
                selected_stack[1].classList.remove("is_fliped");

                selected_stack = [];
            }, flip_duration);
        }

        if (correct_flip >= cards.length / 2) {
            console.log("Game Ended");
            setTimeout(function (params) {
                window.location.href = "end_game.html";
            }, 1000)

        }

        // Stop clicking
        disable_clicking();
    }
}


/*------------------------
        Functions
--------------------------*/
function flipCard(card) {
    card.classList.add("is_fliped");
}

function disable_clicking() {
    card_container.classList.add("disable_clicking");
    setTimeout(function (params) {
        card_container.classList.remove("disable_clicking");
    }, flip_duration);
}

function isSame(card_1, card_2) {
    if (card_1 == card_2) {
        return true;
    }

    return false;
}

// shuffle cards
function shuffle(array) {
    var rand,
        curr = array.length,
        temp;
    for (let i = curr - 1; i > 0; i--) {
        rand = Math.floor(Math.random() * i);

        temp = array[rand];
        array[rand] = array[i];
        array[i] = temp;
    }

    return array;
}