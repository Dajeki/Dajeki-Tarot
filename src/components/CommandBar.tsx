import "../styles/CommandBar.css";
import { useContext } from "react";
import { PopoutContext } from "../hooks/PopoutContextController";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import Glow from "./Glow";

// TODO: Setup functionality for elements Draw, Shuffle, Select Spread, Save
function CommandBar(): JSX.Element {
	const images = [
		`${ process.env.PUBLIC_URL }/images/symbols/action/shuffle.svg`,
		`${ process.env.PUBLIC_URL }/images/symbols/action/savespread.svg`,
	];

	const { popout, setPopout } = useContext( PopoutContext );
	const { setCardsDrawn } = useContext( DrawnCardContext );

	return (
		<footer>
			<div className={"commandBar default-border-radius"}>

				<Glow toggle={true}>
					<img
						onClick={async () => {
							const response = await fetch( "http://localhost:8080/cards/3" );
							const cardResponse: CardApiReturn[] | { error: string } = await response.json();

							//If there is an error property in the object we need to display that instead of messing with the cardsDrawn array
							if ( "error" in cardResponse ) {
								console.log( cardResponse.error );
								return;
							}

							setCardsDrawn( [] );
							setCardsDrawn( cardResponse );

						}
						}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/drawcard.svg`}
						alt={""}
					/>
				</Glow>


				{images.map(
					( element: string, indx: number ): JSX.Element => {

						return (
							<Glow toggle={true} key={indx}>
								<img
									className={"icon-50px"}
									src={process.env.PUBLIC_URL + element}
									alt={""}
								/>
							</Glow>
						);
					},
				)}
				<Glow toggle={true}>
					<img
						onClick={() => {
							setPopout( [!popout[0], false] );
						}}
						className={"icon-50px"}
						src={"https://img.icons8.com/fluent-systems-regular/100/FFFFFF/planner.png"}
						alt={""}
					/>
				</Glow>
				<Glow toggle={true}>
					<img
						onClick={() => {
							setPopout( [!popout[0], false] );
						}}
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/action/tarotspread.svg`}
						alt={""}
					/>
				</Glow>
			</div>
		</footer>
	);
}

export default CommandBar;
