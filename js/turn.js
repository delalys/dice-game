//------------------------------------//
// Turn
//------------------------------------//

function updateRollDice(target) {
	var dices = document.querySelectorAll('.board-controls_saved-dices .dice');
	var rollCountValue = parseInt(rollCount.textContent);
	// If not yet displayed, displays rolls count cartridge
	for (var i = 0; i < dices.length; i++) {
		var dice = dices[i];
		if (target == dice && rollCountValue == 0) {
			document.querySelector('.board-controls_turn-info.is-rolls-count').style.display = 'block';
			rollCountValue++;
			rollCount.textContent = rollCountValue;
		}
	}
	// Si un nouvea tour est commencé + click sur dé, ou si tour déjà commencé et nouveau clic sur roll
	if (rollCountValue != 0 && target == rollButton) {
		if (rollCountValue != 0) {
		}
		rollCountValue++;
		rollCount.textContent = rollCountValue;
	}
	if (dices = 0) {
		rollCountValue--;
		rollCount.textContent = rollCountValue;
		document.querySelector('.board-controls_turn-info.is-rolls-count').style.display = 'none';
	}
}
// Clear turns, reinitialise Rolls count, removes all saved dices, hides turn infos
function clearTurn() {
	var info = document.querySelectorAll('.board-controls_turn-info');
	for (var i = 0; i < info.length; i++) {
		info[i].style.display = "none";
	}
	rollCount.textContent = 0;
	// Removes Dices
	var dices = document.querySelectorAll('.board-controls_saved-dices .dice');
	for (var i = 0; i < dices.length; i++) {
		dices[i].remove();
	}
	// Removes Marks
	var marks = document.querySelectorAll('.board-controls_saved-dices .mark');
	for (var i = 0; i < marks.length; i++) {
		marks[i].remove();
	}

	// Adds number of dice saved to DOM
	document.querySelector('.board-controls_saved-dices').dataset.dice = 0;
}
// Initiate turn
document.addEventListener('click', function() {
	if (event.target == clearBtn) {
		clearTurn();
	}
});
