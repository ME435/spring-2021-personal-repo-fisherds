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

		document.querySelector("#readButton").onclick = (event) => {
			this.handleRead();
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
	async handleRead() {
		console.log("Fetch the pushbutton state, then update the UI");
		// fetch("api/read").then((response) => {
		// 	console.log(response);
		// });
		// console.log("This log happen BEFORE the fetch return.");

		const response = await fetch("api/read");
		const data = await response.json();
		const isHigh = data["isHigh"];
		
		// if (isHigh) {
		// 	document.querySelector("#readOutput").innerHTML = "The pushbutton is HIGH";
		// } else {
		// 	document.querySelector("#readOutput").innerHTML = "The pushbutton is Low";
		// }
		document.querySelector("#readOutput").innerHTML = isHigh ? "The pushbutton is HIGH" : "The pushbutton is LOW";

	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	new rhit.ViewController();
};

rhit.main();
