import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import { JwtContext } from "../hooks/UserJWTContextController";

import "../styles/SaveSpread.css";

function SaveSpread(): JSX.Element {

	const [selectedVal, setSelectedVal] = useState( "" );
	const { cardsDrawn } = useContext( DrawnCardContext );
	const { jwt } = useContext( JwtContext );

	function handleSelectedVal( event : ChangeEvent<HTMLSelectElement> ) {
		setSelectedVal( event.target.value );
		console.log( `Set selected val to ${ event.target.value }` );
	}

	/**
	 * Send to the backend in form of
	 * {
	 * 	cards : numbers[] //Array of card ID's
	 * 	spreadId : number //Value from spread meaning dropdown correlating to same backend ID
	 *  spreadDir: string //String bitmap for 1 as up and 0 as down
	 * }
	 */
	function saveSpreadFormSubmit( event: FormEvent<HTMLFormElement> ) {
		event.preventDefault();
		//check to make sure they have drawn something.
		if ( cardsDrawn.length ) {

			fetch( "http://localhost:8080/cards/save_spread", {
				method : "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization : `Bearer ${ jwt }`,
				},
				body: JSON.stringify({
					cards    : [cardsDrawn[0].id, cardsDrawn[1].id, cardsDrawn[2].id],
					spreadId : selectedVal,
					//This is the bitmap string
					spreadDir: `${ cardsDrawn[0].card_meaning_up?1:0 }${ cardsDrawn[1].card_meaning_up?1:0 }${ cardsDrawn[2].card_meaning_up?1:0 }`,
				}),

			}).then( res =>{ console.log( res ); });
		}
	}

	return (
		<div className={"saveSpread"}>
			<form onSubmit={saveSpreadFormSubmit}>
				<div>
					<label htmlFor="spreadType"><h3>Spread Meaning</h3></label>
					<select
						value={selectedVal}
						onChange={handleSelectedVal}
						className="spreadSelect"
						id="spreadTye"
					>
						<option value="1">Past, Present, Future</option>
						<option value="2">Nature, Cause, Solution</option>
						<option value="3">Situation, Obstacle, Advice</option>
						<option value="4">Current Standing, Aspire, How</option>
						<option value="5">You, Person, Relationship</option>
						<option value="6">Strength, Weakness, Advice</option>
						<option value="7">Mind, Body, Spirit</option>
						<option value="8">You, Your Current Path, Your Potential</option>
					</select>
				</div>
				<button
					type={"submit"}
					className="saveBtn"
					disabled={selectedVal === ""}
				/>
			</form>
		</div>
	);
}

export default SaveSpread;
