import React, { useEffect, useState } from "react";
import { Digit } from "./digit.jsx";

const Home = () => {
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(true);
	const [mode, setMode] = useState("up");
	const [inputValue, setInputValue] = useState("");     // countdown
	const [alertValue, setAlertValue] = useState("");     // alerta
	const [alertShown, setAlertShown] = useState(false);  // evita repetir

	useEffect(() => {
		let interval = null;

		if (isRunning) {
			interval = setInterval(() => {
				setTimer(prev => {
					const next =
						mode === "down"
							? Math.max(prev - 1, 0)
							: prev + 1;

					// 🚨 ALERTA
					if (
						alertValue !== "" &&
						!alertShown &&
						next === Number(alertValue)
					) {
						alert("¡Has llegado al tiempo marcado!");
						setAlertShown(true);
					}

					// detener countdown en 0
					if (mode === "down" && prev === 0) {
						setIsRunning(false);
						return 0;
					}

					return next;
				});
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isRunning, mode, alertValue, alertShown]);

	const digits = String(timer).padStart(6, "0").split("");

	const startCountdown = () => {
		const value = Number(inputValue);
		if (isNaN(value) || value < 0) return;

		setMode("down");
		setTimer(value);
		setAlertShown(false); // reset alerta
		setIsRunning(true);
	};

	const resetAll = () => {
		setTimer(0);
		setAlertShown(false);
	};

	return (
		<div className="text-center">

			{/* CONTADOR */}
			<div className="d-flex justify-content-center mb-3">
				<Digit number={<i className="far fa-clock"></i>} />
				{digits.map((digit, index) => (
					<Digit key={index} number={digit} />
				))}
			</div>

			{/* INPUTS */}
			<div style={{ marginBottom: "10px" }}>
				<input
					type="number"
					placeholder="Countdown desde..."
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				/>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<input
					type="number"
					placeholder="Alerta en..."
					value={alertValue}
					onChange={e => {
						setAlertValue(e.target.value);
						setAlertShown(false);
					}}
				/>
			</div>

			{/* BOTONES */}
			<div className="d-flex justify-content-center gap-3 mt-4">
				<button
					className="btn btn-success btn-lg"
					onClick={() => setIsRunning(true)}
				>
					Start
				</button>

				<button
					className="btn btn-danger btn-lg"
					onClick={() => setIsRunning(false)}
				>
					Stop
				</button>

				<button
					className="btn btn-warning btn-lg"
					onClick={resetAll}
				>
					Reset
				</button>

				<button
					className="btn btn-info btn-lg"
					onClick={startCountdown}
				>
					Countdown
				</button>
			</div>


		</div>
	);
};

export default Home;
