import { createContext } from "react";

export const JwtContext = createContext(
	{
		jwt   : "",
		setJwt: undefined as unknown as React.Dispatch<React.SetStateAction<string>>,
	});
export const JWTProvider = JwtContext.Provider;