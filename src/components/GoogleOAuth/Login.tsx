import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline
} from "react-google-login";
import { refreshTokenSetup } from "../../utils/refreshToken";

const clientId =
	"914582580489-tms667vjlg9nq2n7c2rkjfbadsk2bsrp.apps.googleusercontent.com";

function Login(): JSX.Element {
	/*
	 *	On successful login or when login still available, send the information to the backend and make sure that user is registered
	 *	Setup the automatic refresh for the token based on the current response expires_in in the auth response.
	 */
	function onSuccess(res: GoogleLoginResponse | GoogleLoginResponseOffline) {
		console.log("[Login Success] Current User:", res as GoogleLoginResponse);

		fetch("http://localhost:8080/getLogonInfo", {
			headers: {
				authorization: `Bearer ${(res as GoogleLoginResponse).tokenId}`
			}
		})
			.then(res => res.text())
			.then(data => console.log(data))
			.catch(e => console.log(e));

		refreshTokenSetup(res as GoogleLoginResponse);
	}

	function onFailure(res: GoogleLoginResponse) {
		console.log("[Login Success] Current User:", res);
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
