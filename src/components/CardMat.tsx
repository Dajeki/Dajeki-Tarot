import { useContext } from "react";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import "../styles/CardMat.css";
import Card from "./Card";

function CardMat(): JSX.Element {

	const { cardsDrawn } = useContext( DrawnCardContext );

	return (
		<div className={"mat default-border-radius"}>
			{
				cardsDrawn.map(( cardDrawn, indx ) => (
					<Card
						style={( cardDrawn.card_meaning_up ) ? {} : { transform: "rotate(180deg)" }}
						name={cardDrawn.card_name}
						element={cardDrawn.element}
						suit={cardDrawn.suit}
						key={indx}
					/>
				))
			}
		</div>
	);
}

export default CardMat;
