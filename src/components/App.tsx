import "../lib/env"; //conditional render of development or production env variables COMMENT OUT FOR DEPLOYMENT ON HEROKU

import { useState } from "react";
import "../styles/App.css";
import Header from "./Header";
import CardMat from "./CardMat";
import CommandBar from "./CommandBar";
import Popout from "./Popout";
import { PopoutProvider } from "../hooks/PopoutContextController";
import { DrawnCardProvider } from "../hooks/DrawnCardsContextController";
import { DisplayedMenuProvider } from "../hooks/DisplayedMenuContextController";
import { SavedSpreadNeedReloadProvider } from "../hooks/SavedSpreadNeedReloadContextController";
import { JWTProvider } from "../hooks/UserJWTContextController";
import { EPopupMenus } from "../utils/EPopupMenus";
import { PastSpreadsProvider } from "../hooks/PastSpreadsContextController";

function App(): JSX.Element {
	const [popout, setPopout] = useState( [false, true] as [boolean, boolean] );
	const [cardsDrawn, setCardsDrawn] = useState( [] as CardApiReturn[] );
	const [displayedMenu, setDisplayedMenu] = useState( EPopupMenus.SpreadInfo );
	const [jwt, setJwt] = useState( "" );
	const [needReload, setNeedReload] = useState( true );
	const [pastSpreads, setPastSpreads] = useState( [{}] as PastSpreadsApiReturn[] );


	return (
		<div className={"programContainer"}>
			<JWTProvider value={{ jwt, setJwt }}>
				<PastSpreadsProvider value={{ pastSpreads, setPastSpreads }}>
					<SavedSpreadNeedReloadProvider value={{ needReload, setNeedReload }}>
						<Header />
						<DrawnCardProvider value={{ cardsDrawn, setCardsDrawn }}>
							<PopoutProvider value={{ popout, setPopout }}>
								<DisplayedMenuProvider value={{ displayedMenu, setDisplayedMenu }} >

									<Popout />
									<CardMat />
									<CommandBar />


								</DisplayedMenuProvider>
							</PopoutProvider>
						</DrawnCardProvider>
					</SavedSpreadNeedReloadProvider>
				</PastSpreadsProvider>
			</JWTProvider>
		</div>
	);
}

export default App;
