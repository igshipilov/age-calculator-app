import { useState, useEffect } from "react";

import "./App.css";

import Form from "./form/Form.js";
import Output from "./output/Output.js";

function App() {
	const [date, setDate] = useState({ day: null, month: null, year: null });
	const [state, setState] = useState("idle"); // idle, sent, waiting

	const inputtedDate = { day: date.day, month: date.month, year: date.year };

	return (
		<div className="App">
			<div className="body">
				<div className="card">
					<Form
						inputtedDate={inputtedDate}
						date={date}
						setDate={setDate}
					/>

					<Output inputtedDate={inputtedDate} />
				</div>
			</div>
		</div>
	);
}

export default App;
