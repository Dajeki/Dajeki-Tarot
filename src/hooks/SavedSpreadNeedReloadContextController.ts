import { createContext } from "react";

export const SavedSpreadNeedReloadContext = createContext({
	needReload   : true,
	setNeedReload: undefined as unknown as React.Dispatch<React.SetStateAction<boolean>>,
});
export const SavedSpreadNeedReloadProvider = SavedSpreadNeedReloadContext.Provider;