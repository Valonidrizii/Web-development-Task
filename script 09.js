// Zgjedhim elementet e faqes sipas ID-së.
const countDisplay = document.getElementById("count");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const resetButton = document.getElementById("reset");

let count = 0;

// Përditësojmë numrin dhe gjendjen e butonit minus.
function updateCounter() {
  countDisplay.textContent = count;
  decreaseButton.disabled = count === 0;
}

increaseButton.addEventListener("click", function () {
  count += 1;
  updateCounter();
});

decreaseButton.addEventListener("click", function () {
  if (count > 0) {
    count -= 1;
  }

  updateCounter();
});

resetButton.addEventListener("click", function () {
  count = 0;
  updateCounter();
});

updateCounter();
