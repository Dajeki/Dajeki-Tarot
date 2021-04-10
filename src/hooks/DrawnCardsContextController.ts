import { createContext } from "react";

export const DrawnCardContext = createContext({
	cardsDrawn   : undefined as unknown as CardApiReturn[],
	setCardsDrawn: undefined as unknown as React.Dispatch<React.SetStateAction<CardApiReturn[]>>,
});
export const DrawnCardProvider = DrawnCardContext.Provider;