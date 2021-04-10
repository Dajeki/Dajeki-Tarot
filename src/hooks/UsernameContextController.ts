import { createContext } from "react";

export const UsernameContext = createContext(
	{
		setUsername: undefined as unknown as React.Dispatch<React.SetStateAction<string>>,
	});
export const UsernameProvider = UsernameContext.Provider;