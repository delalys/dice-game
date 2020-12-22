class Game {
	constructor(numberOfDices, colorOfDices, ready = false, played = false) {
		this.dices = this.createDices(numberOfDices, colorOfDices);
		this.ready = ready;
		this.played = played;
	}

	createDices(numberOfDices, colorOfDices) {
		var newDices = [];

		for (var i = 0; i < numberOfDices; i++) {
			let newDice = new Dice();
			newDice.color = colorOfDices;
			newDices.push(newDice);
		}
		return newDices;
	}

	roll(target) {
		document.querySelector('.board_dice-container').innerHTML = '';
		for (var i = 0; i < this.dices.length; i++) {
			// Creates dice in DOM
			this.dices[i].createHTML();

			// Creates random value for animation
			var diceHTML = document.querySelector('.board_dice-container').querySelectorAll('.dice')[i];
			var diceRotation = Math.round(Math.random() * (500 - 1) + 1);
			var diceTopPosition = Math.round(Math.random() * (2 - -2) + -2);
			var diceLeftPosition = Math.round(Math.random() * (150 - -150) + -150);
			var diceTimeTransition = Math.round(Math.random() * (500 - 300) + 300);
			
			setTimeout(function(i, diceHTML, diceRotation, diceTopPosition, diceLeftPosition, diceTimeTransition){ 
				
				// Randomise animation
				diceHTML.style.transform = `rotate(${diceRotation}deg)`;
				diceHTML.style.transition = `${diceTimeTransition}ms`;
				diceHTML.style.top = `${diceTopPosition}px`;
				diceHTML.style.marginLeft = `${diceLeftPosition}px`;
				
				// Roll animation
				diceHTML.classList.remove('unrolled');

				// Count total
				countTotal('board_dice-container', 'board_score');
			}, 300, i, diceHTML, diceRotation, diceTopPosition, diceLeftPosition, diceTimeTransition);
		}

		updateRollDice(target);
	}

	sum() {

	}
}