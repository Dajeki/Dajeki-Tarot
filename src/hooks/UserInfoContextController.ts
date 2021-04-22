import { createContext } from "react";

export const UserInfoContext = createContext(
	{
		setUserInfo: undefined as unknown as React.Dispatch<React.SetStateAction<DajekiTarotUser>>,
	});
export const UserInfoProvider = UserInfoContext.Provider;