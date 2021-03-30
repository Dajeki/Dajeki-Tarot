import "../styles/Card.css";
import Glow from "./Glow";

function Card(): JSX.Element {
	/*
	 * TODO: Conditionally render cards for the randomly selected tarot card.
	 * TODO: Maintain state information so they can be used for shared state of the information panel
	 */

	return (
		<div className={"card default-border-radius"}>
			<h4>CARD NAME</h4>
			<img
				src={
					process.env.PUBLIC_URL +
					"/images/rider-waite/front/major/1Magician.jpg"
				}
				alt={""}
				style={{ height: "100%", maxWidth: "100%" }}
			/>
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					width: "100%"
				}}
			>
				<Glow>
					<img
						className={"icon-50px"}
						src={`${process.env.PUBLIC_URL}/images/symbols/elements/air.svg`}
						alt={""}
					/>
				</Glow>
				<Glow>
					<img
						className={"icon-50px"}
						src={`${process.env.PUBLIC_URL}/images/symbols/elements/spirit.svg`}
						alt={""}
					/>
				</Glow>
			</div>
		</div>
	);
}

export default Card;
