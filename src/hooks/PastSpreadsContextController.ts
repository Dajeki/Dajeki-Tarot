import { createContext } from "react";

export const PastSpreadsContext = createContext({
	pastSpreads   : [{}] as PastSpreadsApiReturn[],
	setPastSpreads: undefined as unknown as React.Dispatch<React.SetStateAction<PastSpreadsApiReturn[]>>,
});
export const PastSpreadsProvider = PastSpreadsContext.Provider;