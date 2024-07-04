import "./Button.css";

function Button({ state, setState }) {
	// function handleState() {
	// 	switch (state) {
	// 		case "idle": {
	// 			setState("sent");
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

	return (
		<button type="submit">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="23"
				height="22"
				viewBox="0 0 46 44"
			>
				<g fill="none" stroke="#FFF" strokeWidth="2">
					<path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
				</g>
			</svg>
		</button>
	);
}

export default Button;
