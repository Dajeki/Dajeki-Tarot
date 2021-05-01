import React, { useContext } from "react";
import { DrawnCardContext } from "../../hooks/DrawnCardsContextController";

import "./SpreadInfo.css";

function SpreadInfo(): JSX.Element {

	const { cardsDrawn } = useContext( DrawnCardContext );

	return (
		<div className={"spreadContainer"}>
			{
				cardsDrawn.map(( cardDrawn, indx ) => {
					return (
						<div key={indx} className={"spreadInfo"}>
							<div>
								<img src={`${ process.env.PUBLIC_URL }/images/symbols/cards.svg`} />
								<h4 style={{ display: "inline-block" }}>{`Card ${ indx + 1 } Meaning`}</h4>
							</div>
							<div>
								<img src={`${ process.env.PUBLIC_URL }/images/symbols/elements/${ cardDrawn.element }.svg`} />
								<img src={`${ process.env.PUBLIC_URL }/images/symbols/${ ( cardDrawn.card_meaning_up ) ? "uparrow" : "downarrow" }.svg`} />
								<img src={`${ process.env.PUBLIC_URL }/images/symbols/suits/${ cardDrawn.suit }.svg`} />
							</div>
							<h5>{cardDrawn.card_name}</h5>
							<p>{cardDrawn.card_meaning_up ?? cardDrawn.card_meaning_down}</p>
						</div>
					);
				})
			}
		</div>
	);
}

export default SpreadInfo;
