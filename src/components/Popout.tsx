import "../styles/Popout.css";
import { useContext } from "react";
import { PopoutContext } from "../hooks/PopoutContextController";

function Popout(): JSX.Element {
	const {
		popout: [popoutOpen, popoutInitialClick],
	} = useContext( PopoutContext );

	return (
		<div
			className={`${ popoutOpen ? "slide-in-left" : "slide-out-left" } popout default-border-radius`}
			style={{ display: popoutInitialClick ? "none" : "block" }}
		>
			some text
		</div>
	);
}

export default Popout;
