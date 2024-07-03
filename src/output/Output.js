import { DateTime } from "luxon";

function makeOutput(day, month, year) {
	const startDate = DateTime.fromObject({ day, month, year });
	const currentDate = DateTime.now();
	const diff = currentDate.diff(startDate, ["years", "months", "days"]);

	const result = diff.toObject();
	const dateTypes = Object.keys(result);

	console.log("result: ", result);

	return (
		<>
			{dateTypes.map((dateType, index) => (
				<p key={index}>
					{Math.floor(result[dateType]) || "--"} {dateType}
				</p>
			))}
		</>
	);
}

function Output({ inputtedDate }) {
	const { day, month, year } = inputtedDate;

	return <div className="output">{makeOutput(day, month, year)}</div>;
}

export default Output;
