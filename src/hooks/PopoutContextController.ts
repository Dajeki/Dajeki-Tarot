import { createContext } from "react";

export const PopoutContext = createContext(
	{
		popout   : undefined as unknown as [boolean, boolean],
		setPopout: undefined as unknown as React.Dispatch<React.SetStateAction<[boolean, boolean]>>,
	});
export const PopoutProvider = PopoutContext.Provider;