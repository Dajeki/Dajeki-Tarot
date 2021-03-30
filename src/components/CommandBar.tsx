import "../styles/CommandBar.css";
import { useContext } from "react";
import { PopoutContext } from "../hooks/PopoutContextController";
import Glow from "./Glow";

// TODO: Setup functionality for elements Draw, Shuffle, Select Spread, Save
// REQUIRED: Backend functionality first.
function CommandBar(): JSX.Element {
	let images = [
		`${process.env.PUBLIC_URL}/images/symbols/action/drawcard.svg`,
		`${process.env.PUBLIC_URL}/images/symbols/action/shuffle.svg`,
		`${process.env.PUBLIC_URL}/images/symbols/action/savespread.svg`
	];

	const { popout, setPopout } = useContext(PopoutContext);

	return (
		<footer>
			<div className={"commandBar default-border-radius"}>
				{images.map(
					(element: string, indx: number): JSX.Element => {

						return (
							<Glow toggle={true} key={indx}>
								<img
									className={"icon-50px"}
									src={process.env.PUBLIC_URL + element}
									alt={""}
								/>
							</Glow>
						);
					}
				)}
				<Glow toggle={true}>
					<img
						onClick={() => {
							setPopout([!popout[0], false]);
						}}
						className={"icon-50px"}
						src={`${process.env.PUBLIC_URL}/images/symbols/action/tarotspread.svg`}
						alt={""}
					/>
				</Glow>
			</div>
		</footer>
	);
}

export default CommandBar;
