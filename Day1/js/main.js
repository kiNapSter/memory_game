// Start Sound Auto

/*==================
    Set Default Mode
====================*/
// Clear localStorage
localStorage.removeItem("mode");

// select Game Mode
var mode_items = document.querySelectorAll(
  ".mode__box .mode__item:not(.disable)"
);

var modeSelected = false;

for (let i = 0; i < mode_items.length; i++) { // loop 3la Ga3 mode_items 
  const element = mode_items[i];

  // add click event && remove "selcted" class from all element (then add "selected" class to cliked element)
  // check element if has a mode data attr then pick random element & store it mode
  // store attributes [path, extension] in local storage
  // add "selected" class to cliked element
  // set modeSelected = true to use it to check if any mode was selected when we click start game
  element.addEventListener("click", function (params) {
    // store mode info 
    var mode;

    for (let i = 0; i < mode_items.length; i++) {
      const element = mode_items[i];
      element.classList.remove("selected");
    }


    if (this.dataset.mode) {
      var new_ar = Array.from(mode_items).slice(0, -1); // convert Nodelist to an array and slice(0, -1) for 0 to Before the last

      mode = new_ar[Math.floor(Math.random() * new_ar.length)];
    } else {
      mode = element;
    }

    localStorage.setItem(
      "mode",
      JSON.stringify({
        path: mode.dataset.modePath,
        ex: mode.dataset.modeEx,
      })
    );
    this.classList.add("selected");
    modeSelected = true;
  });
}

document.getElementById("start__btn").addEventListener("click", function (e) {
  if (!modeSelected) {
    e.preventDefault();
  }
});

// ila kan random mode if element has data attr mode
// random between 0 and lenght - 2 bach n7ydu random elemnt 
// ++ use array.filter()

// =======================
//        For Testing
// =======================