import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { JwtContext } from "../../hooks/UserJWTContextController";
import { UserInfoContext } from "../../hooks/UserInfoContextController";

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function Logout(): JSX.Element {

	const { setUserInfo } = useContext( UserInfoContext );
	const { setJwt } = useContext( JwtContext );

	function onSuccess() {
		setUserInfo({ username: "", imgUrl: "" });
		setJwt( "" );
	}

	return (
		<div>
			<GoogleLogout
				clientId={clientId}
				buttonText="Logout"
				onLogoutSuccess={onSuccess}
			></GoogleLogout>
		</div>
	);
}

export default Logout;
