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
        // setError,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		// console.log("isSubmitSuccessful: ", isSubmitSuccessful);
		// console.log("errors: ", errors);
	});

	const inputDateTypes = ["day", "month", "year"];

	const validationMap = {
		day: validateDay,
		month: validateMonth,
		year: validateYear,
	};

	const placeholderMap = {
		day: "DD",
		month: "MM",
		year: "YYYY",
	};

	const errorsList = Object.keys(errors);
	const isWholeFormInvalid = errorsList.length === 3;

	console.log("errorsList: ", errorsList);
	console.log("isWholeFormInvalid: ", isWholeFormInvalid);

	function validationErrorMessage(dateType) {
		if (isWholeFormInvalid) {
			if (dateType === "day") {
				return "Must be a valid date";
			}
			return " ";
		} else {
			return `Must be a valid ${dateType}`;
		}
	}

    // ❌ не помогло
    // function validationErrorMessage(dateType) {
	// 	if (isWholeFormInvalid) {
	// 		if (dateType === "day") {
	// 			setError('day', { type: 'custom', message: 'hey hey hey'})
	// 		}

	// 		if (dateType === "month") {
	// 			setError('month', { type: 'custom', message: ''})
	// 		}

    //         if (dateType === "year") {
	// 			setError('year', { type: 'custom', message: ''})
	// 		}
	// 	} else {
	// 		return `Must be a valid ${dateType}`;
	// 	}
	// }
    

	function makeLabels() {
		return inputDateTypes.map((dateType, index) => {
			return (
				<label key={index}>
					<p>{dateType}</p>
					<input
						{...register(`${dateType}`, {
							required: "This field is required",
							validate: (value, formValues) =>
								validationMap[dateType](value, formValues) ||
								validationErrorMessage(dateType),
						})}
						placeholder={placeholderMap[dateType]}
						onChange={(e) =>
							(inputtedDate[dateType] = e.target.value)
						}
						className="input"
					/>
					<p>{errors[dateType]?.message}</p>
				</label>
			);
		});
	}

	return (
		<>
			<form
				onSubmit={handleSubmit((date) => {
					// console.log("date: ", date, "\n", "errors: ", errors);
					setDate(date);
				})}
			>
				{makeLabels()}
				{/* <p>{isWholeFormInvalid && "Must be a valid date"}</p> */}

				<hr className="line" />

				<Button />
			</form>
		</>
	);
}

export default Form;
