import { useContext } from "react";
import { UserInfoContext } from "../../hooks/UserInfoContextController";
import { JwtContext } from "../../hooks/UserJWTContextController";
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
	const { setUserInfo } = useContext( UserInfoContext );
	const { setJwt } = useContext( JwtContext );

	function onSuccess( res: GoogleLoginResponse | GoogleLoginResponseOffline ) {
		console.log( "[Login Success] Current User:", res as GoogleLoginResponse );

		//Check to make sure the response is a GoogleLoginResponse and that the user is actually signed in.
		if ( "profileObj" in res && res.isSignedIn()) {

			setUserInfo({ username: res.profileObj.givenName, imgUrl: res.profileObj.imageUrl });
			setJwt( res.tokenId );

			fetch( "http://localhost:8080/userInfo/login", {
				method : "POST",
				headers: {
					authorization: `Bearer ${ res.tokenId }`,
				},
			})
				.then( res => res.json())
				.then( data =>
					console.log( data.success ? `Success: ${ data.success }` : "", data.error ? `Error: ${ data.error }` : "" ),
				)
				.catch( e => console.log( e ));

			//send the setJwt action so the refresh can also update the memory
			refreshTokenSetup( res as GoogleLoginResponse, setJwt );
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