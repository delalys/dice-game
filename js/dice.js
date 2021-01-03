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
			var classesToAdd = [ `dice`, `dice-sm`, `unrolled`, `dice-${this.color}`];
		} else {
			var classesToAdd = [ `dice`, `unrolled`, `dice-${this.color}`];
		}

		if (this.color == 'golden') {
			classesToAdd.push('dice-gold');
			dice.innerHTML = `<span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <div class="bg"></div>
                <div class="spark">
                  <svg class="rotating" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" style="enable-background:new 0 0 320 320;" xml:space="preserve"><g><path d="M298.138,136.665c-62.065-13.011-110.576-61.522-123.585-123.588C172.955,5.458,166.235,0,158.448,0 s-14.507,5.458-16.104,13.078c-13.01,62.065-61.521,110.575-123.586,123.584c-7.62,1.597-13.079,8.318-13.079,16.104 s5.458,14.507,13.079,16.104c62.064,13.011,110.573,61.521,123.583,123.586c1.597,7.62,8.317,13.079,16.104,13.079 c7.786,0,14.507-5.458,16.104-13.079c13.011-62.065,61.523-110.575,123.588-123.583c7.62-1.597,13.079-8.317,13.079-16.104 C311.215,144.983,305.757,138.262,298.138,136.665z"/></g></svg>
                </div>
			`;
		} else {
			dice.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
		}

		dice.setAttribute('data-number', this.value);
		dice.classList.add(...classesToAdd);

		document.querySelector('.dice-track__dice-container').appendChild(dice);
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