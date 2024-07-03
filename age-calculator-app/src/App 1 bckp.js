import { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

import Form from "./form/Form.js";
import Button from "./button/Button.js";
import Output from "./output/Output.js";

function App() {
	const [day, setDay] = useState(0);
	const [month, setMonth] = useState(0);
	const [year, setYear] = useState(0);

	const [state, setState] = useState("idle"); // idle, sent, waiting

	function setDate() {
		return {
			setDay,
			setMonth,
			setYear,
		};
	}

	const inputtedDate = { day, month, year };

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
		)
	);

	return (
		<div className="App">
			<div className="body">
				<div className="card">
					<Form setDate={setDate} />
					<br className="line" />
					<Button state={state} setState={setState} />
					<Output state={state} inputtedDate={inputtedDate} />
				</div>
			</div>
		</div>
	);
}

export default App;
