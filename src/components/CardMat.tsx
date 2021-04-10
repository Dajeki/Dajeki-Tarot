import { useContext } from "react";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import "../styles/CardMat.css";
import Card from "./Card";

function CardMat(): JSX.Element {
	/*
	 * TODO: NONE!
	 */

	const { cardsDrawn, setCardsDrawn } = useContext( DrawnCardContext );

	return (
		<div className={"mat default-border-radius"}>
			{cardsDrawn.map(( cardDrawn ) => ( <Card name={cardDrawn.card_name} element={cardDrawn.element} suit={cardDrawn.suit} /> ))}
		</div>
	);
}

export default CardMat;
