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
		let classesToAdd = [ `dice`, `unrolled`, `bg-${this.color}`];

		dice.setAttribute('data-number', this.value);
		dice.classList.add(...classesToAdd);
		dice.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span>';

		document.querySelector('.board_dice-container').appendChild(dice);
	}
}