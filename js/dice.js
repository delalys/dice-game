class Dice {
	constructor(value, color, roll = false) {
		this.value = this.randomValue();
		this.color = color;
		this.roll = roll;
	}

	randomValue() {
		  return Math.round(Math.random() * (6 - 1) + 1);
	}

	createHTML() {
		let dice = document.createElement("div");
		if (screenSm.matches || screenSmToLg.matches) {
			var classesToAdd = [ `dice`, `dice-sm`, `unrolled`, `bg-${this.color}`];
		} else {
			var classesToAdd = [ `dice`, `unrolled`, `bg-${this.color}`];
		}

		dice.setAttribute('data-number', this.value);
		dice.classList.add(...classesToAdd);
		dice.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span>';

		document.querySelector('.board_dice-container').appendChild(dice);
		console.log(this);
	}
}

// Sets classes for a two halfs grid distribution
function twoHalfsGrid(dice, i) {
	dice.dataset.orderId = i;
	if (i % 2 == 0) {
		dice.classList.add('position-split-2', 'is-left');
	} else {
		dice.classList.add('position-split-2', 'is-right');
	}
}