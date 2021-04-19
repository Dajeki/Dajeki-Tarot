import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { JwtContext } from "../../hooks/UserJWTContextController";
import { UsernameContext } from "../../hooks/UsernameContextController";

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function Logout(): JSX.Element {

	const { setUsername } = useContext( UsernameContext );
	const { setJwt } = useContext( JwtContext );

	function onSuccess() {
		alert( "Logout made successfully ✌🏻" );
		setUsername( "" );
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
