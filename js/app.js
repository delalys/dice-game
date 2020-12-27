const rollButton = document.getElementById('rollBtn');
var diceNumber = document.querySelector('#diceNumber');
const lessDiceBtn = document.querySelector('.less-dices-btn');
const moreDiceBtn = document.querySelector('.more-dices-btn');
const boardControls = document.querySelector('.board-controls');
const board = document.querySelector('.board');
const rollCount = document.querySelector('.board-controls_turn-info .rolls');
const clearBtn = document.querySelector('.board-controls_turn-info.is-clear .clear-btn');

//------------------------------------//
// New game
//------------------------------------//
document.addEventListener('click', function() {
	if (event.target == rollBtn) {
		
		// Create game
		const numberOfDices = document.getElementById('diceNumber').textContent;
		const colorOfDices = document.querySelector('input[name="colorDices"]:checked').value;

		const game = new Game(numberOfDices, colorOfDices);

		// Roll dices
		game.roll(event.target);
	}
});

// Sets class on saved dices marks for visual effect
function savedDiceMark() {
	var dices = document.querySelectorAll('.board-controls_saved-dices .dice');
	var marks = document.querySelectorAll('.board-controls_saved-dices .mark');
	// Displays marks
	document.querySelector('.board-controls_turn-infos').style.display = "block";
	// Add saved class to marks when a dice is saved
	for (var i = 0; i < dices.length; i++) {
		marks[i].classList.add('saved');
	}
	// Removes saved class to mark to in use
	for (var i = dices.length; i < marks.length; i++) {
		marks[i].classList.remove('saved');
	}
}


//------------------------------------//
// Dices saving management
//------------------------------------//

// Counts number of dices on game
function countTotal(pathDice, pathScore) {
	// Display infos cartdrige
	document.querySelector(`.${pathDice}`).style.display = 'block';
	document.querySelector(`.${pathScore}`).style.display = 'block';
	// Gets score of all dices and assigns it to score location
	var dices = document.querySelectorAll(`.${pathDice} .dice`);
	var scoreLocation = document.querySelector(`.${pathScore} .score`);
	var sum = 0;
	for (var i = 0; i < dices.length; i++) {
		sum = sum + parseInt(dices[i].dataset.number);
	}
	scoreLocation.textContent =  sum;
}

document.addEventListener('click', function() {
	var dices = document.querySelectorAll('.board .dice');
	var dicesBack = document.querySelectorAll('.board-controls_saved-dices .dice');

	// Saving Dice and updating turn info
	for (var i = 0; i < dices.length; i++) {
		let dice = dices[i];
		let savedDice = document.querySelectorAll('.board-controls_saved-dices .dice').length + 1;
		if (event.target == dice) {
			// Resets positionning
			dice.style.transform = 'rotate(0)';
			dice.style.top = 0;
			dice.style.marginLeft = 0;
			// Moves dice
			boardControls.querySelector('.board-controls_saved-dices .dices').appendChild(dice);
			// Updates board contorls score
			countTotal('board-controls_saved-dices', 'board-controls_turn-info.is-score');
			// Updates board game score
			countTotal('board_dice-container', 'board_score');
			// Updates dice number in controls
			decreaseDiceNumber();
			// Initilaise roll number to 1
			updateRollDice(dice);
			// Displays clear btn
			document.querySelector(`.board-controls_turn-info.is-clear`).style.display = 'block';
			// Adds number of dice saved to DOM
			document.querySelector('.board-controls_saved-dices').dataset.dice = savedDice;
			// Adds visual dice spot
			savedDiceMark();
			// Check if 9 dices saved locks the game
			maxDiceNumber();
		}
	}

	// De-saving Dice and updating turn info
	for (var i = 0; i < dicesBack.length; i++) {
		let dice = dicesBack[i];
		let savedDice = document.querySelectorAll('.board-controls_saved-dices .dice').length + 1;
		if (event.target == dice) {

			// Removes top position, css takes lead 
			dice.style.top = "";
			// Moves dice
			board.querySelector('.board_dice-container').appendChild(dice);
			// Updates board contorls score
			countTotal('board-controls_saved-dices', 'board-controls_turn-info.is-score');
			// Updates board game score
			countTotal('board_dice-container', 'board_score');
			// Updates dice number in controls
			var test = parseInt(diceNumber.textContent);
			if (dices.length > 0 ) {
				increaseDiceNumber();
			}
			// Adds visual dice spot
			savedDiceMark();
			// Hides turn info and reset turn
			if (dicesBack.length == 1 ) {
				console.log('dicesBack.length = '+dicesBack.length);
				clearTurn();
			}
			// Check if 9 dices saved locks the game
			maxDiceNumber();
		}
	}
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.querySelector('.game-container').style.setProperty('--vh', `${vh}px`);
});
let vh = window.innerHeight * 0.01;
document.querySelector('.game-container').style.setProperty('--vh', `${vh}px`);