var rhit = rhit || {};

rhit.TankController = class {
	constructor() {
		const buttons = document.querySelectorAll(".driveButton");
		const sliderInput = document.querySelector("#baseSpeed");

		for (const button of buttons) {
			button.onclick = (event) => {
				const leftMultiplier = button.dataset.leftMultiplier;
				const rightMultiplier = button.dataset.rightMultiplier;
				const baseSpeed = sliderInput.value;
				const leftWheelSpeed = baseSpeed * leftMultiplier;
				const rightWheelSpeed = baseSpeed * rightMultiplier;
				this.sendDriveCommand(leftWheelSpeed, rightWheelSpeed);
			};
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
