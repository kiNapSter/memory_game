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

for (let i = 0; i < mode_items.length; i++) {
  const element = mode_items[i];

  element.addEventListener("click", function (params) {
    for (let i = 0; i < mode_items.length; i++) {
      const element = mode_items[i];
      element.classList.remove("selected");
    }

    localStorage.setItem(
      "mode",
      JSON.stringify({
        path: element.dataset.modePath,
        ex: element.dataset.modeEx,
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
