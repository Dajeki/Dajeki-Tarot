import "../styles/CommandBar.css";
import { useContext, useState } from "react";
import Glow from "./Glow";
import { PopoutContext } from "../hooks/PopoutContextController";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import { DisplayedMenuContext } from "../hooks/DisplayedMenuContextController";
import { EPopupMenus } from "../utils/EPopupMenus";

function CommandBar(): JSX.Element {

	const { setPopout } = useContext( PopoutContext );
	const { setCardsDrawn } = useContext( DrawnCardContext );
	const { setDisplayedMenu } = useContext( DisplayedMenuContext );

	const [lastClickedMenu, setLastClickedMenu] = useState( undefined as unknown as EPopupMenus );

	return (
		<footer>
			<div className={"commandBar default-border-radius"}>

				<Glow toggle={true}>
					<img
						onClick={async () => {
							const response = await fetch( `${ process.env.REACT_APP_API_URL }/cards/3` );
							const cardResponse: CardApiReturn[] | { error: string } = await response.json();

							//If there is an error property in the object we need to display that instead of messing with the cardsDrawn array
							if ( "error" in cardResponse ) {
								console.log( cardResponse.error );
								return;
							}

							setCardsDrawn( [] );
							setCardsDrawn( cardResponse );

						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/drawcard.svg`}
						alt={""}
					/>
				</Glow>


				<Glow toggle={true}>
					<img
						onClick={() => {
							if ( +lastClickedMenu === EPopupMenus.PastSpread ) {
								setPopout( [false, false] );
								//-1 to reset the enum last clicked so buttons work to open the menu back up.
								setLastClickedMenu( -1 );
								return;
							}

							setPopout( [true, false] );
							setDisplayedMenu( EPopupMenus.PastSpread );
							setLastClickedMenu( EPopupMenus.PastSpread );
						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/shuffle.svg`}
						alt={""}
					/>
				</Glow>

				<Glow toggle={true}>
					<img
						onClick={() => {

							if ( +lastClickedMenu === EPopupMenus.SpreadInfo ) {
								setPopout( [false, false] );
								//-1 to reset the enum last clicked so buttons work to open the menu back up.
								setLastClickedMenu( -1 );
								return;
							}

							setPopout( [true, false] );
							setDisplayedMenu( EPopupMenus.SpreadInfo );
							setLastClickedMenu( EPopupMenus.SpreadInfo );

						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/tarotspread.svg`}
						alt={""}
					/>
				</Glow>

				<Glow toggle={true}>
					<img
						onClick={() => {

							if ( +lastClickedMenu === EPopupMenus.SaveSpread ) {
								setPopout( [false, false] );
								//-1 to reset the enum last clicked so buttons work to open the menu back up.
								setLastClickedMenu( -1 );
								return;
							}

							setPopout( [true, false] );
							setDisplayedMenu( EPopupMenus.SaveSpread );
							setLastClickedMenu( EPopupMenus.SaveSpread );
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
