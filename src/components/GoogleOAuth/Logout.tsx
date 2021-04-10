import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { UsernameContext } from "../../hooks/UsernameContextController";

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function Logout(): JSX.Element {

	const { setUsername } = useContext( UsernameContext );

	function onSuccess() {
		alert( "Logout made successfully ✌🏻" );
		setUsername( "" );
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
