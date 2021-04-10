import { useContext } from "react";
import { UsernameContext } from "../../hooks/UsernameContextController";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { refreshTokenSetup } from "../../utils/refreshToken";

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(): JSX.Element {
	/*
	 *	On successful login or when login still available, send the information to the backend and make sure that user is registered
	 *	Setup the automatic refresh for the token based on the current response expires_in in the auth response.
	 */

	if ( clientId === undefined ) {
		throw new Error( "Must set REACT_APP_CLIENT_ID in .env file in project root." );
	}

	//Context provided from header element.
	const { setUsername } = useContext( UsernameContext );

	function onSuccess( res: GoogleLoginResponse | GoogleLoginResponseOffline ) {
		console.log( "[Login Success] Current User:", res as GoogleLoginResponse );

		//Check to make sure the response is a GoogleLoginResponse and that the user is actually signed in.
		if ( "profileObj" in res && res.isSignedIn()) {

			setUsername( res.profileObj.givenName );

			fetch( "http://localhost:8080/userInfo/login", {
				headers: {
					authorization: `Bearer ${ res.tokenId }`,
				},
			})
				.then( res => res.text())
				.then( data => console.log( data ))
				.catch( e => console.log( e ));

			refreshTokenSetup( res as GoogleLoginResponse );
		}
	}

	function onFailure( res: GoogleLoginResponse ) {
		console.log( "[Login Success] Already Logged In:", res );
	}

	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={"single_host_origin"}
				isSignedIn={true}
			/>
		</div>
	);
}

export default Login;