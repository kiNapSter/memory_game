/*------------------------
        Variables
--------------------------*/
// Globale Variables
var flip_duration = 500, // duration to flip card
    cards = document.querySelectorAll(".card"),
    card_container = document.querySelector(".game__box"),
    correct_flip = 0,
    incorrect_flip = 0;
mode = JSON.parse(localStorage.getItem("mode"));

// set cards imgs fliped
var c = 1;
for (let i = 0; i < cards.length; i++) {
    const element = cards[i].querySelector("img");
    element.src = "img/" + mode.path + "/" + c + mode.ex;
    cards[i].classList.add("is_fliped");
    if (i % 2 == 1) {
        c++;
    }
}

// Wait x moment then flip (hide)
var t;
setTimeout(function (params) {
    cards.forEach((element) => element.classList.remove("is_fliped"));
    t = timer();
}, 5000);

// add event click to all cards
for (let index = 0; index < cards.length; index++) {
    const element = cards[index];

    element.addEventListener("click", function (params) {
        main(this);
    });
}

// shuffle cards 
var cards_indexes = Array.from(Array(cards.length).keys());
var shuffled_cards = shuffle(cards_indexes);
for (let i = 0; i < cards.length; i++) {
    const element = cards[i];

    element.style.order = shuffled_cards[i];
}


// Variables Function
var selected_stack = [];

function main(card) {
    // if card not selected (first card fliped) and not already correct 
    if (
        !card.classList.contains("is_fliped") &&
        !card.classList.contains("is_matched")
    ) {
        selected_stack.push(card); // add this card to selected stack  
    }

    // Flip Card
    flipCard(card); // add is_fliped class

    if (selected_stack.length >= 2) { // if there is two cards fliped
        // console.log("two cards selected");

        // check if are matched rmove is_fliped and add is_matched class ( change classes cause they have same proprities ) باش تبقا باينة
        // then emptying selected_stack annd increase correct flps
        // is_fliped ألا ماكانوش بحال بحال جواب صحيح حيد كلاس 
        // incorrect_flip زيد ف الاجوبة الغالطة
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
                incorrect_flip++;
            }, flip_duration);
        }


        // يعني كاع للكارطات تقلبو وسلات لعبة cards الا وصل عدد الاجابات صحيحة ل نص ديال
        // timer وقف
        // localStorage ف  time سطوكي
        // end_game منبعد 2 ثواني سير لصفحة 

        if (correct_flip >= cards.length / 2) {
            console.log("Game Ended");
            clearInterval(t);
            localStorage.setItem("time", document.querySelector(".time").textContent);
            localStorage.setItem("incorrect", incorrect_flip);
            setTimeout(function (params) {
                window.location.href = "end_game.html";

            }, 2000)

        }

        // Stop clicking
        disable_clicking();
    }
}

// ========== Timer ==========
function timer(end) {
    var minutes_element = document.querySelector(".minutes"),
        seconds_element = document.querySelector(".seconds"),
        minutes = 0,
        seconds = 0;

    var x = setInterval(function () {
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        seconds_element.textContent = seconds;
        minutes_element.textContent = minutes;

        seconds++;
    }, 1000);

    return x
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