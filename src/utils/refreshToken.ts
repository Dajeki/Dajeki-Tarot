import { GoogleLoginResponse } from "react-google-login";

export function refreshTokenSetup( res: GoogleLoginResponse ): void {
	//How long till we need to refresh the token
	let refreshTiming = ( res.tokenObj.expires_in || 3600 - 5 * 60 ) * 1000;

	async function refreshToken() {
		const newAuthRes = await res.reloadAuthResponse();
		refreshTiming = ( newAuthRes.expires_in || 3600 - 5 * 60 ) * 1000;

		console.log( "newAuthRes:", newAuthRes );
		//saveUserToken( newAuthRes.access_token);
		console.log( "new auth token", newAuthRes.id_token );

		//Setup the next timer after the first one
		setTimeout( refreshToken, refreshTiming );
	}

	//setup initial refresh
	setTimeout( refreshToken, refreshTiming );
}
