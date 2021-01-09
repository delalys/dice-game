class Dice {
	constructor(type, color, roll = false) {
		this.type = type;
		this.color = color;
		this.value = '';
		this.roll = roll;
	}

	get getValue() {
		if (this.type == 'typed3') {
			return Math.round(Math.random() * (3 - 1) + 1);
		} else if (this.type == 'typed4') {
			return Math.round(Math.random() * (4 - 1) + 1);
		}  else if (this.type == 'typed6') {
			return Math.round(Math.random() * (6 - 1) + 1);
		} else if (this.type == 'typed8') {
			return Math.round(Math.random() * (8 - 1) + 1);
		} else if (this.type == 'typed10') {
			return Math.round(Math.random() * (10 - 1) + 1);
		} else if (this.type == 'typed12') {
			return Math.round(Math.random() * (12 - 1) + 1);
		} else if (this.type == 'typed20') {
			return Math.round(Math.random() * (20 - 1) + 1);
		} else if (this.type == 'typedper') {
			return Math.round(Math.random() * (10 - 1) + 1) * 10;
		}
	}

	createHTML() {
		let dice = document.createElement("div");
		if (screenSm.matches || screenSmToLg.matches) {
			var classesToAdd = [ `dice`, `unrolled`, `dice-${this.color}`, `dice-${this.type}`];
		}
		var classesToAdd = [ `dice`, `unrolled`, `dice-${this.color}`, `dice-${this.type}`];
		dice.innerHTML += '<span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>';

		// if (this.type == 'typed4') {
		// 	var whiteImgUrl = "img/marble.webp";
		// 	var marble1ImgUrl = "img/marble.webp";

		// 	dice.innerHTML += `
		// 	<svg xmlns="http://www.w3.org/2000/svg" width="61" height="61"><path stroke="none" fill="url(#img1)" filter="url(#inset-shadow)" d="M26.169872981078 6.0551362713291a5 5 0 0 1 8.6602540378444 0l25.339745962156 43.889727457342a5 5 0 0 1 -4.3301270189222 7.5l-50.679491924311 0a5 5 0 0 1 -4.3301270189222 -7.5"></path>
		// 		<defs>
		// 			<pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
		// 				<image href="`+ whiteImgUrl +`" x="0" y="0" width="100" height="70" />
		// 			</pattern>
		// 		</defs>
		// 		<filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
		// 			<feComponentTransfer in=SourceAlpha>
		// 			<feFuncA type="table" tableValues="1 0" />
		// 			</feComponentTransfer>
		// 			<feGaussianBlur stdDeviation="5"/>
		// 			<feOffset dx="0" dy="0" result="offsetblur"/>
		// 			<feFlood flood-color="rgb(255, 255, 255)" result="color"/>
		// 			<feComposite in2="offsetblur" operator="in"/>
		// 			<feComposite in2="SourceAlpha" operator="in" />
		// 			<feMerge>
		// 			<feMergeNode in="SourceGraphic" />
		// 			<feMergeNode />
		// 			</feMerge>
		// 		</filter> 
		// 	</svg>
		// 	`;
		// }
		if (this.type == 'typed3' || this.type == 'typed4' || this.type == 'typed8' || this.type == 'typed10' || this.type == 'typed12' || this.type == 'typed20' || this.type == 'typedper') {
			dice.innerHTML += '<span class="dice__value">' + this.value + '</span>';
		}
		if (this.color == 'golden') {
			dice.innerHTML += `
			<div class="bg"></div>
			<div class="spark">
			<svg class="rotating" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" style="enable-background:new 0 0 320 320;" xml:space="preserve"><g><path d="M298.138,136.665c-62.065-13.011-110.576-61.522-123.585-123.588C172.955,5.458,166.235,0,158.448,0 s-14.507,5.458-16.104,13.078c-13.01,62.065-61.521,110.575-123.586,123.584c-7.62,1.597-13.079,8.318-13.079,16.104 s5.458,14.507,13.079,16.104c62.064,13.011,110.573,61.521,123.583,123.586c1.597,7.62,8.317,13.079,16.104,13.079 c7.786,0,14.507-5.458,16.104-13.079c13.011-62.065,61.523-110.575,123.588-123.583c7.62-1.597,13.079-8.317,13.079-16.104 C311.215,144.983,305.757,138.262,298.138,136.665z"/></g></svg>
			</div>
			`;
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