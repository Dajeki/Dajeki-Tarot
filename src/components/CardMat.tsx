import "../styles/CardMat.css";
import Card from "./Card";

function CardMat(): JSX.Element {
	/*
	 * TODO: NONE!
	 */
	return (
		<div className={"mat default-border-radius"}>
			<Card />
			<Card />
			<Card />
		</div>
	);
}

export default CardMat;
