import { createContext } from "react";
import { EPopupMenus } from "../utils/EPopupMenus";

export const DisplayedMenuContext = createContext({
	displayedMenu   : undefined as unknown as EPopupMenus,
	setDisplayedMenu: undefined as unknown as React.Dispatch<React.SetStateAction<EPopupMenus>>,
});
export const DisplayedMenuProvider = DisplayedMenuContext.Provider;
