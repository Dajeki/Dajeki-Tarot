import "../styles/CommandBar.css";
import { useContext } from "react";
import Glow from "./Glow";
import { PopoutContext } from "../hooks/PopoutContextController";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import { DisplayedMenuContext } from "../hooks/DisplayedMenuContextController";

import { EPopupMenus } from "../utils/EPopupMenus";

// TODO: Setup functionality for elements Save, previous spreads, information
function CommandBar(): JSX.Element {

	const { popout, setPopout } = useContext( PopoutContext );
	const { setCardsDrawn } = useContext( DrawnCardContext );
	const { setDisplayedMenu } = useContext( DisplayedMenuContext );

	return (
		<footer>
			<div className={"commandBar default-border-radius"}>

				<Glow toggle={true}>
					<img
						onClick={async () => {
							const response = await fetch( "http://localhost:8080/cards/3" );
							const cardResponse: CardApiReturn[] | { error: string } = await response.json();

							//If there is an error property in the object we need to display that instead of messing with the cardsDrawn array
							if ( "error" in cardResponse ) {
								console.log( cardResponse.error );
								return;
							}

							setCardsDrawn( [] );
							setCardsDrawn( cardResponse );

						}
						}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/drawcard.svg`}
						alt={""}
					/>
				</Glow>


				<Glow toggle={true}>
					<img
						onClick={() => {
							setPopout( [!popout[0], false] );
							setDisplayedMenu( EPopupMenus.PastSpread );
						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/shuffle.svg`}
						alt={""}
					/>
				</Glow>

				<Glow toggle={true}>
					<img
						onClick={() => {
							setPopout( [!popout[0], false] );
							setDisplayedMenu( EPopupMenus.SpreadInfo );
						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/tarotspread.svg`}
						alt={""}
					/>
				</Glow>

				<Glow toggle={true}>
					<img
						onClick={() => {
							return;
						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/savespread.svg`}
						alt={""}
					/>
				</Glow>
			</div>
		</footer>
	);
}

export default CommandBar;
