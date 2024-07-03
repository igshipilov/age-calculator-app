import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Output from "../output/Output.js";

import Button from "../button/Button.js";
import {
	validateDay,
	validateMonth,
	validateYear,
} from "../features/validation.js";

import "./Form.css";

function Form({ inputtedDate, date, setDate }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(
		() =>
			console.log(
				"day: ",
				date.day,
				"\n",
				"month: ",
				date.month,
				"\n",
				"year: ",
				date.year,
				"\n"
			),
		console.log("isSubmitSuccessful: ", isSubmitSuccessful)
	);

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

	return (
		<>
			<form
				onSubmit={handleSubmit((date) => {
					console.log("date: ", date, "\n", "errors: ", errors);

					setDate(date);
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
						onChange={(e) => setInputtedDate("day", e.target.value)}
						className="input"
					/>
					<p>{errors.day?.message}</p>
				</label>
				<label>
					<p>month</p>
					<input
						{...register("month", {
							required: "This field is required",
							validate: (value, formValues) =>
								validateMonth(value, formValues) ||
								"Must be a valid month",
							// pattern: {
							// 	value: /^(1[0-2]|0?[1-9])$/,
							// 	message: "Must be a valid month",
							// },
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

				<Button />
			</form>
		</>
	);
}

export default Form;
