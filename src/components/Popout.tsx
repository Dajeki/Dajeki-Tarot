import "../styles/Popout.css";
import { useContext } from "react";
import { PopoutContext } from "../hooks/PopoutContextController";
import { DisplayedMenuContext } from "../hooks/DisplayedMenuContextController";

import { EPopupMenus } from "../utils/EPopupMenus";

function Popout(): JSX.Element {
	const {
		popout: [popoutOpen, popoutInitialClick],
	} = useContext( PopoutContext );
	const { displayedMenu, setDisplayedMenu } = useContext( DisplayedMenuContext );

	function getCurrentDisplayedMenuElement(): JSX.Element {
		//Stupid type coehersion for enum to a number
		switch ( +displayedMenu ) {
			case EPopupMenus.SpreadInfo:
				return ( <div>LOOKING AT SPREAD INFO</div> );
			case EPopupMenus.PastSpread:
				return ( <div>LOOKING AT PAST SPREADS</div> );
			default:
				return ( <div>HIT DEFAULT?</div> );
		}
	}

	return (
		<div
			className={`${ popoutOpen ? "slide-in-left" : "slide-out-left" } popout default-border-radius`}
			style={{ display: popoutInitialClick ? "none" : "block" }}
		>
			{
				getCurrentDisplayedMenuElement()
			}
		</div>
	);
}

export default Popout;
