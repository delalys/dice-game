const rollButton = document.getElementById('rollBtn');
var diceNumber = document.querySelector('#diceNumber');
const lessDiceBtn = document.querySelector('.setting__less');
const moreDiceBtn = document.querySelector('.setting__more');
const sidePannel = document.querySelector('.side-pannel');
const diceTrack = document.querySelector('.dice-track');
const rollCount = document.querySelector('.side-pannel__bottom .side-pannel__item--rolls-count .rolls');
const clearBtn = document.querySelector('.side-pannel__bottom .side-pannel__item--clear .clear-btn');

//------------------------------------//
// New game
//------------------------------------//
document.addEventListener('click', function() {
	if (event.target == rollBtn) {
		
		// Create game
		const numberOfDices = document.getElementById('diceNumber').textContent;
		const colorOfDices = document.querySelector('input[name="dice-color"]:checked').value;
		const diceType = document.querySelector('input[name="dice-type"]:checked').value;

		const game = new Game(diceType, numberOfDices, colorOfDices);

		// Roll dices
		game.sounds(event, event.target);
	}
});

// Sets class on saved dices marks for visual effect
function savedDiceMark() {
	var dices = document.querySelectorAll('.side-pannel__item--saved-dices .dice');
	var marks = document.querySelectorAll('.side-pannel__item--saved-dices .mark');
	// Displays marks
	document.querySelector('.side-pannel__bottom').style.display = "block";
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
	var dices = document.querySelectorAll('.dice-track .dice');
	var dicesBack = document.querySelectorAll('.side-pannel__item--saved-dices .dice');

	// Saving Dice and updating turn info
	for (var i = 0; i < dices.length; i++) {
		let dice = dices[i];
		let savedDice = document.querySelectorAll('.side-pannel__item--saved-dices .dice').length + 1;
		if (event.target == dice) {
			// Resets positionning
			dice.style.transform = 'rotate(0)';
			dice.style.top = 0;
			dice.style.marginLeft = 0;
			// Adds class to know its position
			dice.classList.add('saved');
			// Moves dice
			sidePannel.querySelector('.side-pannel__item--saved-dices .dices').appendChild(dice);
			// Updates score in dice-track controls
			countTotal('side-pannel__item--saved-dices', 'side-pannel__item--score');
			// Updates score in dice-track game
			countTotal('dice-track__dice-container', 'dice-track__score');
			// Updates dice number in controls
			decreaseDiceNumber();
			// Initilaise roll number to 1
			updateRollDice(dice);
			// Displays clear btn
			document.querySelector(`.side-pannel__item--clear`).style.display = 'block';
			// Adds number of dice saved to DOM
			document.querySelector('.side-pannel__item--saved-dices').dataset.dice = savedDice;
			// Adds visual dice spot
			savedDiceMark();
			// Check if 9 dices saved locks the game
			maxDiceNumber();
		}
	}

	// De-saving Dice and updating turn info
	for (var i = 0; i < dicesBack.length; i++) {
		let dice = dicesBack[i];
		let savedDice = document.querySelectorAll('.side-pannel__item--saved-dices .dice').length + 1;
		if (event.target == dice) {

			// Removes top position, css takes lead 
			dice.style.top = "";
			// Adds class to know its position
			dice.classList.remove('saved');
			// Moves dice
			diceTrack.querySelector('.dice-track__dice-container').appendChild(dice);
			// Updates dice-track contorls score
			countTotal('side-pannel__item--saved-dices', 'side-pannel__item--score');
			// Updates dice-track game score
			countTotal('dice-track__dice-container', 'dice-track__score');
			// Updates dice number in controls
			if (dices.length > 0 ) {
				increaseDiceNumber();
			}
			// Adds visual dice spot
			savedDiceMark();
			// Hides turn info and reset turn
			if (dicesBack.length == 1 ) {
				clearTurn();
			}
			// Check if 9 dices saved locks the game
			maxDiceNumber();
		}
	}
});

// Size correctyly UI on ios
// Listens to the resize event
window.addEventListener('resize', () => {
  // Execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.querySelector('.game-container').style.setProperty('--vh', `${vh}px`);
});
let vh = window.innerHeight * 0.01;
document.querySelector('.game-container').style.setProperty('--vh', `${vh}px`);

$(window).on("load", function(){
	$('.read-more').readmore({
		collapsedHeight: 100,
	});

	WebFontConfig = {
		google: {
			families: [ 'Staatliches', ]
		},
		/* Called when each requested web font has finished loading. The fontFamily parameter is the name of the font family, and fontDescription represents the style and weight of the font. */
		fontactive: function(fontFamily, fontDescription) {
			new CircleType(document.querySelector('.golden-logo .golden.over')).radius(84);
			new CircleType(document.querySelector('.golden-logo .golden.under')).radius(84);
		}
	};
});

$('#settingModal').on('shown.bs.modal', function (e) {
	new CircleType(document.querySelector('.golden-logo .golden.over')).radius(150);
	new CircleType(document.querySelector('.golden-logo .golden.under')).radius(150);
	$('.read-more').readmore({
		collapsedHeight: 100,
	});

})