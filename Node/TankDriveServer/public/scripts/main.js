var rhit = rhit || {};

rhit.TankController = class {
	constructor() {
		const buttons = document.querySelectorAll(".driveButton");
		const sliderInput = document.querySelector("#baseSpeed");

		for (const button of buttons) {
			// For mobile using onclick is GREAT and WORKS!

			// button.onclick = (event) => {
			// 	const leftMultiplier = button.dataset.leftMultiplier;
			// 	const rightMultiplier = button.dataset.rightMultiplier;
			// 	const baseSpeed = sliderInput.value;
			// 	const leftWheelSpeed = baseSpeed * leftMultiplier;
			// 	const rightWheelSpeed = baseSpeed * rightMultiplier;
			// 	this.sendDriveCommand(leftWheelSpeed, rightWheelSpeed);
			// };

			// Desktop only
			button.onmousedown = (event) => {
				const leftMultiplier = button.dataset.leftMultiplier;
				const rightMultiplier = button.dataset.rightMultiplier;
				const baseSpeed = sliderInput.value;
				const leftWheelSpeed = baseSpeed * leftMultiplier;
				const rightWheelSpeed = baseSpeed * rightMultiplier;
				this.sendDriveCommand(leftWheelSpeed, rightWheelSpeed);
			}
			button.onmouseup = (event) => {
				this.sendStop();
			}

			document.onkeydown = (event) => {
				// console.log(`Type: ${event.type}   Key: ${event.key}`);
				this.handleKeyPress(event);
			}
			document.onkeyup = (event) => {
				// console.log(`Type: ${event.type}   Key: ${event.key}`);
				this.handleKeyPress(event);
			}

		}
	}

	handleKeyPress(event) {
		if (event.type == "keydown") {
			if (event.key == "ArrowUp") {
				this.sendDriveCommand(100, 100);
			} else if (event.key == "ArrowDown") {
				this.sendDriveCommand(-100, -100);
			} else if (event.key == "ArrowLeft") {
				this.sendDriveCommand(-100, 100);
			} else if (event.key == "ArrowRight") {
				this.sendDriveCommand(100, -100);
			}
		} else if (event.type == "keyup") {
			this.sendStop();
		} 
	}

	sendDriveCommand(leftWheelSpeed, rightWheelSpeed) {
		console.log(`Sent these values to the server: ${leftWheelSpeed} ${rightWheelSpeed}`);
		fetch(`api/motor/go/${leftWheelSpeed}/${rightWheelSpeed}`);
	}
	sendStop() {
		fetch(`api/motor/stop`);
	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	tankController = new rhit.TankController();
};

rhit.main();