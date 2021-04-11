import { useState } from "react";
import "../styles/Header.css";
import Glow from "./Glow";
import Login from "./GoogleOAuth/Login";
import Logout from "./GoogleOAuth/Logout";
import { UsernameProvider } from "../hooks/UsernameContextController";


function Header(): JSX.Element {
	const [username, setUsername] = useState( "" );

	return (
		<header>
			<img
				className={"logo"}
				src={`${ process.env.PUBLIC_URL  }/images/symbols/crystalball.svg`}
				alt="Crystal Ball with eye in center"
			/>
			<Glow className="title">
				<h1>Dajeki Tarot</h1>
			</Glow>
			<Glow style={{ display: "inline-block", justifySelf: "flex-end" }}>
				<h3 className={"username"}>{username}</h3>
			</Glow>
			<div className={"userServicesSection"}>
				<UsernameProvider value={{ setUsername }}>
					{( username ) ? <Logout /> : <Login />}
				</UsernameProvider>
			</div>
		</header>
	);
}

export default Header;
