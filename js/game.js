class Game {
	constructor(diceType, numberOfDices, colorOfDices) {
		this.dices = this.createDices(diceType, numberOfDices, colorOfDices);
	}

	createDices(diceType, numberOfDices, colorOfDices) {
		var newDices = [];
		for (var i = 0; i < numberOfDices; i++) {
			let newDice = new Dice();
			newDice.color = colorOfDices;
			newDice.type = diceType;
			newDice.value = newDice.getValue;
			newDices.push(newDice);
		}
		return newDices;
	}

	clearTrack() {
		document.querySelector('.dice-track__dice-container').innerHTML = '';
	}

	roll(target) {
		for (var i = 0; i < this.dices.length; i++) {
			// Creates dice in DOM
			this.dices[i].createHTML();

			// Creates random value for animation
			var diceHTML = document.querySelector('.dice-track__dice-container').querySelectorAll('.dice')[i];
			var diceRotation = Math.round(Math.random() * (15 - -15) + -15);
			var diceTopPosition = Math.round(Math.random() * (2 - -2) + -2);
			var diceTimeTransition = Math.round(Math.random() * (300 - 250) + 250);
			if (screenSm.matches) {
				var diceLeftPosition = Math.round(Math.random() * (26 - -26) + -26);
				var diceTopPosition = Math.round(Math.random() * (15 - -15) + -15);
				twoHalfsGrid(diceHTML, i);
			} else if (screenSmToLg.matches) {
				var diceLeftPosition = Math.round(Math.random() * (30 - -30) + -30);
				twoHalfsGrid(diceHTML, i);
			} else if (screenLgMore.matches) {
				var diceLeftPosition = Math.round(Math.random() * (80 - -80) + -80);
				twoHalfsGrid(diceHTML, i);
			}
			
			setTimeout(function(i, diceHTML, diceRotation, diceTopPosition, diceLeftPosition, diceTimeTransition){ 
				
				// Randomise animation
				diceHTML.style.transform = `rotate(${diceRotation}deg)`;
				diceHTML.style.transition = `${diceTimeTransition}ms`;
				diceHTML.style.marginTop = `${diceTopPosition}px`;
				diceHTML.style.marginLeft = `${diceLeftPosition}px`;
				
				// Roll animation
				diceHTML.classList.remove('unrolled');

				// Shows notice
				document.querySelector('.notice').style.display = "block";

				// Count total
				countTotal('dice-track__dice-container', 'dice-track__score');
			}, 300, i, diceHTML, diceRotation, diceTopPosition, diceLeftPosition, diceTimeTransition);
		};

		updateRollDice(target);
		// if neumber of dices on game = 9, disable new dices
		maxDiceNumber();
	}


	// Roll dices with right sounds timing, or without
	sounds(event, target) {
		var golden = document.querySelector('input[name="dice-color"][value="golden"]:checked');
		var soundOn = document.querySelector('.mute-btn.sound-on');
		var rollSound = new Audio('sound/rolling-dice.mp3');
		var chorSound = new Audio('sound/chor.mp3');
		var gameOn = this;
		var targetOn = target;

		if (soundOn) {
			if (golden) {
				gameOn.clearTrack();
					chorSound.play();
				setTimeout(function(targetOn){
					gameOn.roll(target)
				}, 1500);
				setTimeout(function(){
					rollSound.play();
				}, 1500 + 0);
			} else {
				gameOn.clearTrack();
				gameOn.roll(target)
				rollSound.play();
			}
		} else {
			gameOn.clearTrack();
			gameOn.roll(target);
		}
	}
}




//------------------------------------//
// Dice number management
//------------------------------------//


function increaseDiceNumber() {
	var overallDiceNumber = document.querySelectorAll('.side-pannel__item--saved-dices .dice').length + parseInt(diceNumber.textContent);
	if (overallDiceNumber < 9) {
		diceNumber.textContent = parseInt(diceNumber.textContent) + 1;
	}
}

function maxDiceNumber() {
	var toRollDiceNumber = parseInt(diceNumber.textContent);
	var savedDiceNumber = document.querySelectorAll('.side-pannel__item--saved-dices .dice').length;
	var overallDiceNumber = savedDiceNumber + toRollDiceNumber;
	if (savedDiceNumber == 9 ) {
		document.querySelector('.side-pannel').classList.add('game-disabled');
	} else {
		document.querySelector('.side-pannel').classList.remove('game-disabled');
	}
	if (overallDiceNumber >= 9 ) {
		document.querySelector('.side-pannel').classList.add('max-dice-number', 'more-dice-disable');
	} else {
		document.querySelector('.side-pannel').classList.remove('max-dice-number', 'more-dice-disable');
	}
}

function decreaseDiceNumber() {
	// Check if 9 then display number
	maxDiceNumber();
	if (diceNumber.textContent > 1 ) {
		diceNumber.textContent = parseInt(diceNumber.textContent) - 1;
	}
	var savedDiceNumber = document.querySelectorAll('.side-pannel__item--saved-dices .dice').length;
	if (savedDiceNumber == 9) {
		diceNumber.textContent = parseInt(diceNumber.textContent) - 1;	
	}
	maxDiceNumber();
}

function updateDiceNumber() {
	document.addEventListener('click', function() {
		if (event.target == lessDiceBtn) {
			decreaseDiceNumber();
		}
		if (event.target == moreDiceBtn) {
			increaseDiceNumber();
		}
	});
};

updateDiceNumber();


var screenSm = window.matchMedia("(max-width: 575px)");
var screenSmToLg = window.matchMedia("(min-width: 576px) and (max-width: 1199px)");
var screenLgMore = window.matchMedia("(min-width: 1200px)");



//------------------------------------//
// Sound management
//------------------------------------//

var muteBtn = document.querySelector(".mute-btn");

function muteUnmute() {
	var muteClasses = muteBtn.classList;

	if (muteClasses.contains("sound-on")) {
		muteClasses.remove("sound-on");
	} else {
		muteClasses.add("sound-on");
	}
}

document.addEventListener('click', function() {
	if (event.target == muteBtn) {
		muteUnmute();
	}
});