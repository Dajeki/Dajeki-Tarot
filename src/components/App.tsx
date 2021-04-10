import { useState } from "react";
import "../styles/App.css";
import Header from "./Header";
import CardMat from "./CardMat";
import CommandBar from "./CommandBar";
import Popout from "./Popout";
import { PopoutProvider } from "../hooks/PopoutContextController";
import { DrawnCardProvider } from "../hooks/DrawnCardsContextController";

function App(): JSX.Element {
	const [popout, setPopout] = useState( [false, true] as [boolean, boolean] );
	const [cardsDrawn, setCardsDrawn] = useState( [] as CardApiReturn[] );

	return (
		<div className={"programContainer"}>
			<Header />
			<DrawnCardProvider value={{ cardsDrawn, setCardsDrawn }}>
				<PopoutProvider value={{ popout, setPopout }}>
					<Popout />
					<CardMat />
					<CommandBar />
				</PopoutProvider>
			</DrawnCardProvider>
		</div>
	);
}

export default App;
