import { useState } from "react";
import "../styles/App.css";
import Header from "./Header";
import CardMat from "./CardMat";
import CommandBar from "./CommandBar";
import Popout from "./Popout";
import { PopoutProvider } from "../hooks/PopoutContextController";

function App(): JSX.Element {
	const [popout, setPopout] = useState( [false, true] as [boolean, boolean] );

	return (
		<div className={"programContainer"}>
			<Header />
			<PopoutProvider value={{ popout, setPopout }}>
				<Popout />
				<CardMat />
				<CommandBar />
			</PopoutProvider>
		</div>
	);
}

export default App;
