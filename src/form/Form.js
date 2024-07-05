import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import classNames from "classnames";

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
		formState: { errors },
		clearErrors,
		setError,
	} = useForm();

	// const [inputError, setInputError] = useState(false);

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

	const isValidDate = (errors) => {
		const errorsValues = Object.values(errors);
		const validateErrors = errorsValues.filter(
			({ type }) => type === "validate"
		);

		console.log("validateErrors: ", validateErrors);

		return validateErrors.length !== inputDateTypes.length;
	};

	console.log("errors: ", errors);
	console.log("errorsList: ", errorsList);
	// console.log("isValidDate: ", isValidDate);

	// function validationErrorMessage(dateType) {
	// 	if (!isValidDate) {
	// 		clearErrors();
	// 		if (dateType === "day") {
	// 			return "Must be a valid date";
	// 		}
	// 		return " "; // FIXME → надо: error.message || ' '
	// 	} else {
	// 		return `Must be a valid ${dateType}`;
	// 	}
	// }

	// }

	const inputError = (dateType) => {
		const hasCurrentDateTypeError = !!errors[dateType];

		const inputClass = classNames({
			input: true,
			"input-error": hasCurrentDateTypeError,
		});

		return inputClass;
	};

	const dateTypeError = (dateType) => {
		const hasCurrentDateTypeError = !!errors[dateType];

		const dateTypeClass = classNames({
			dateType: true,
			"dateType-error": hasCurrentDateTypeError,
		});

		return dateTypeClass;
	};

	function makeLabels() {
		return inputDateTypes.map((dateType, index) => {
			return (
				<label key={index}>
					<p className={dateTypeError(dateType)}>{dateType}</p>
					<input
						{...register(`${dateType}`, {
							required: "This field is required",
							validate: (value, formValues) =>
								validationMap[dateType](value, formValues) ||
								`Must be a valid ${dateType}`,
						})}
						placeholder={placeholderMap[dateType]}
						onChange={(e) =>
							(inputtedDate[dateType] = e.target.value)
						}
						className={inputError(dateType)}
					/>
					<p className="error-message">{errors[dateType]?.message}</p>
				</label>
			);
		});
	}

	return (
		<>
			<div className="card-form">
				<form
					onSubmit={handleSubmit((date) => {
						setDate(date);
					})}
				>
					<div className="form-container">
						<div className="labels">{makeLabels()}</div>

						{/* <p>{!isValidDate(errors) && "Must be a valid date"}</p> */}

						<div className="line-button">
							<div className="line"></div>
							<Button className="button" />
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default Form;
