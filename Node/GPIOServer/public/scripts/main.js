/** namespace. */
var rhit = rhit || {};


rhit.ViewController = class {
	constructor() {
		console.log("Add button listeners");
		document.querySelector("#redLedOnButton").onclick = (event) => {
			this.handleLedOn("r");
		};
		document.querySelector("#redLedOffButton").onclick = (event) => {
			this.handleLedOff("r");
		};
		document.querySelector("#yellowLedOnButton").onclick = (event) => {
			this.handleLedOn("y");
		};
		document.querySelector("#yellowLedOffButton").onclick = (event) => {
			this.handleLedOff("y");
		};
		document.querySelector("#greenLedOnButton").onclick = (event) => {
			this.handleLedOn("g");
		};
		document.querySelector("#greenLedOffButton").onclick = (event) => {
			this.handleLedOff("g");
		};
	}
	handleLedOn(color) {
		console.log("You clicked LED ON for " + color);
		fetch('api/ledon/' + color);
	}
	handleLedOff(color) {
		console.log("You clicked LED OFF for " + color);	
		fetch('api/ledoff/' + color);
	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	new rhit.ViewController();
};

rhit.main();
