const gameContainer = document.getElementById('game');
const resetBtn = document.querySelector('#reset');
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "brown",
  "green",
  "orange",
  "purple",
  "brown",
];
let firstChoice = null;
let secondChoice = null;
let score = 0;
let cardsMatched = 0;



/* === Helper Functions === */
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function resetUserSelectionVar() {
  firstChoice = null;
  secondChoice = null;
}

function handleCardClick(event) {
  // Reject user inputs if userSelection has yet to reset.
  if (firstChoice && secondChoice) return;

  const target = event.target;
  const { classList, tagName } = target;
  // Matched & currently selected cards cannot be re-selected
  if (target.classList.contains('matched')) {
    alert('You made an invalid selection, try again.');
    return;
  }

  // Add Select Class to Div
  target.classList.toggle('selected');
  // Add Background color to "show" card. 
  target.style.backgroundColor = classList[0];

  // Add Selections to Selection Object.
  if (!firstChoice) {
    firstChoice = target;
  } else {
    secondChoice = target;
    score += 1;
    updateScore(score);

    if (firstChoice.classList[0] === secondChoice.classList[0]) {
      firstChoice.classList.add('matched');
      firstChoice.classList.toggle('selected');
      secondChoice.classList.add('matched');
      secondChoice.classList.toggle('selected');
      resetUserSelectionVar()
      cardsMatched += 1;
    } else {
      setTimeout(() => {
        firstChoice.classList.toggle('selected');
        firstChoice.style.backgroundColor = "";
        secondChoice.classList.toggle('selected');
        secondChoice.style.backgroundColor = "";
        resetUserSelectionVar()
      }, 1000)
    }
  }

  // Check if all cards have been matched
  if (cardsMatched === gameContainer.childElementCount / 2) {
    alert(`Congratz you've won! \n Score: ${score} \n Select "Reset to Play Again`)
  }
}



// === Score === 
// Add one to score 
function updateScore(score) {
  const scoreLocation = document.querySelector('#score');
  scoreLocation.innerText = score;
}

function resetScore() {
  score = 0 
  updateScore(score);
}

/* === Game Controls === */
function resetGame() {
  // Remove all Cards
  gameContainer.innerHTML ="";

  // Reset Score & Reload Cards
  resetScore();
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

/* === Event Listeners === */
resetBtn.addEventListener('click', resetGame);

/* Initial Game Start */
window.addEventListener('load', () => {
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
})
