import "../styles/Card.css";
import Glow from "./Glow";

type cardProp = {
	name?: string,
	element?: TarotElements,
	suit?: TarotSuits
}

function Card({ name, element, suit } : cardProp ): JSX.Element {
	/*
	 * TODO: Conditionally render cards for the randomly selected tarot card.
	 * TODO: Maintain state information so they can be used for shared state of the information panel
	 */

	return (
		<div className={"card default-border-radius"}>
			<h4>{name}</h4>
			<img
				src={
					`${ process.env.PUBLIC_URL }/images/rider-waite/front/major/1Magician.jpg`
				}
				alt={""}
				style={{ height: "100%", maxWidth: "100%" }}
			/>
			<div
				style={{
					display       : "flex",
					justifyContent: "space-evenly",
					width         : "100%",
				}}
			>
				<Glow>
					<img
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/elements/${element}.svg`}
						alt={""}
					/>
				</Glow>
				<Glow>
					<img
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/elements/${suit}.svg`}
						alt={""}
					/>
				</Glow>
			</div>
		</div>
	);
}

export default Card;
