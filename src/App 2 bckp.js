import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { DateTime } from "luxon";

import logo from "./logo.svg";
import "./App.css";

import Form from "./form/Form.js";
import Button from "./button/Button.js";
import Output from "./output/Output.js";

function App() {
	const [day, setDay] = useState(null);
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);

	const [state, setState] = useState("idle"); // idle, sent, waiting

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	function setDate() {
		return {
			setDay,
			setMonth,
			setYear,
		};
	}

	const inputtedDate = { day, month, year };

	function setInputtedDate(type, value) {
		switch (type) {
			case "day": {
				inputtedDate.day = value;
				return;
			}

			case "month": {
				inputtedDate.month = value;
				return;
			}

			case "year": {
				inputtedDate.year = value;
				return;
			}
		}
	}

	function sendUserDate(e) {
		e.preventDefault();
		const { day, month, year } = inputtedDate;

		setDay(day);
		setMonth(month);
		setYear(year);
	}

	function makeOutput(day, month, year) {
		const startDate = DateTime.fromObject({ day, month, year });
		const currentDate = DateTime.now();
		const diff = currentDate.diff(startDate, ["years", "months", "days"]);

		const result = diff.toObject();
		const keys = Object.keys(result);

		return (
			<>
				{keys.map((key) => {
					return (
						<p>
							{Math.floor(result[key]) || "--"} {key}
						</p>
					);
				})}
			</>
		);
	}

	// function handleState() {
	// 	switch (state) {
	// 		case "idle": {
	// 			setState("sent");

	// 			const { day, month, year } = inputtedDate;

	// 			setDay(day);
	// 			setMonth(month);
	// 			setYear(year);
	// 			return;
	// 		}
	// 		case "sent": {
	// 			setState("waiting");
	// 			return;
	// 		}
	// 		default:
	// 			throw new Error(`Unknown state: ${state}`);
	// 	}
	// }

	useEffect(() =>
		console.log(
			"day: ",
			day,
			"\n",
			"month: ",
			month,
			"\n",
			"year: ",
			year,
			"\n"
		),
        console.log('isSubmitSuccessful: ', isSubmitSuccessful)

	);

	const longMonths = [1, 3, 5, 7, 8, 10, 12];

	const isLeap = (year) => new Date(year, 1, 29).getDate() === 29;

	const validateDay = (value, formValues) => {
		const { month, year } = formValues;
		const monthNum = parseInt(month);
		const yearNum = parseInt(year);
		const valueNum = parseInt(value);

		if (longMonths.includes(monthNum)) {
			return valueNum > 0 && valueNum <= 31;
		} else if (isLeap(yearNum)) {
			return valueNum > 0 && valueNum <= 29;
		} else if (!isLeap(yearNum)) {
			return valueNum > 0 && valueNum <= 28;
		} else {
			return valueNum > 0 && valueNum <= 30;
		}
	};

	const validateYear = (_value, formValues) => {
		const { year } = formValues;
		const yearNum = parseInt(year);
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		return yearNum > 1900 && yearNum <= currentYear;
	};

	function testFilling() {
		return (
			<>
				<p>HEY HEY HEY</p>;
			</>
		);
	}

	return (
		<div className="App">
			<div className="body">
				<div className="card">
					<form
						// onSubmit={(e) => sendUserDate(e)}
						onSubmit={handleSubmit((data) => {
							console.log(
								"data: ",
								data,
								"\n",
								"errors: ",
								errors
							);

							const { day, month, year } = data;
							setDay(day);
							setMonth(month);
							setYear(year);
						})}
					>
						<label>
							<p>day</p>
							<input
								{...register("day", {
									required: "This field is required",
									validate: (value, formValues) =>
										validateDay(value, formValues) ||
										"Must be a valid day",
								})}
								placeholder="DD"
								onChange={(e) =>
									setInputtedDate("day", e.target.value)
								}
								className="input"
							/>
							<p>{errors.day?.message}</p>
						</label>
						<label>
							<p>month</p>
							<input
								{...register("month", {
									required: "This field is required",
									pattern: {
										value: /^(1[0-2]|0?[1-9])$/,
										message: "Must be a valid month",
									},
								})}
								placeholder="MM"
								onChange={(e) =>
									setInputtedDate("month", e.target.value)
								}
								className="input"
							/>
							<p>{errors.month?.message}</p>
						</label>
						<label>
							<p>year</p>
							<input
								{...register("year", {
									required: "This field is required",
									validate: (value, formValues) =>
										validateYear(value, formValues) ||
										"Must be a valid year",
								})}
								placeholder="YYYY"
								onChange={(e) =>
									setInputtedDate("year", e.target.value)
								}
								className="input"
							/>
							<p>{errors.year?.message}</p>
						</label>
						<hr className="line" />

						<button type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="46"
								height="44"
								viewBox="0 0 46 44"
							>
								<g fill="none" stroke="#FFF" strokeWidth="2">
									<path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
								</g>
							</svg>
						</button>
					</form>

					<div className="output">{makeOutput(day, month, year)}</div>
				</div>
			</div>
		</div>
	);
}

export default App;
