import { GoogleLogout } from "react-google-login";

/*
 * TODO: Sucessfully set state of the logged in user. 
 */

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function Logout(): JSX.Element {
	function onSuccess() {
		alert("Logout made successfully ✌🏻");
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
