import { useState } from "react";
import "../styles/Header.css";
import Glow from "./Glow";
import Login from "./GoogleOAuth/Login";
import Logout from "./GoogleOAuth/Logout";
import { UserInfoProvider } from "../hooks/UserInfoContextController";


function Header(): JSX.Element {
	const [userInfo, setUserInfo] = useState({ username: "", imgUrl: "" });

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
			<div className={"username"}>
				<Glow style={{ display: "inline-block", justifySelf: "flex-end" }}>
					<h3 >{userInfo.username}</h3>
				</Glow>
				<img className={"profilePic"} src={userInfo.imgUrl} />
			</div>
			<div className={"userServicesSection"}>
				<UserInfoProvider value={{ setUserInfo }}>
					{( userInfo.username ) ? <Logout /> : <Login />}
				</UserInfoProvider>
			</div>
		</header>
	);
}

export default Header;
