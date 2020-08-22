// Define Elements
var timing = document.querySelector(".timing"),
    answers = document.querySelector(".incorrect_answer");

// Get element from LocalStorage
var time = localStorage.getItem("time"),
    inco = localStorage.getItem("incorrect");

// Fill Dom
timing.textContent = time;
answers.textContent = inco;