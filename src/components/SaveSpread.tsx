import { FormEvent, useContext, useState, useRef, MouseEvent } from "react";
import { DrawnCardContext } from "../hooks/DrawnCardsContextController";
import { JwtContext } from "../hooks/UserJWTContextController";

import "../styles/SaveSpread.css";

function SaveSpread(): JSX.Element {

	const [selectedVal, setSelectedVal] = useState( "0" );
	const { cardsDrawn } = useContext( DrawnCardContext );
	const { jwt } = useContext( JwtContext );

	const selectMenuRef = useRef<HTMLSelectElement>( null );
	//Used for adding error responses
	const errorMessageRef = useRef<HTMLDivElement>( null );

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
					spreadDir: `${ cardsDrawn[0].card_meaning_up ? 1 : 0 }${ cardsDrawn[1].card_meaning_up ? 1 : 0 }${ cardsDrawn[2].card_meaning_up ? 1 : 0 }`,
				}),

			})
				.then( res => res.json())
				.then( data => {
					const utcd = new Date();
					utcd.setTime( data.availDate );
					//If there is an error in this object for this response, it could come with an availDate telling when the next available time you could save.
					if ( errorMessageRef.current && data.error ) {
						const timeToReset = 24 - ( utcd.getTimezoneOffset() / 60 );
						errorMessageRef.current.innerText =
						( data.error ? `${ data.error }` : "" ) +
							( data.availDate ? `\nCome back ${ utcd.toLocaleDateString() }` +
								` @ ${ timeToReset % 12 }${ ( Math.floor( timeToReset / 12 ) % 2 !== 0 ) ? "pm" : "am" }`
								:
								""
							);
					}
					if ( errorMessageRef.current && data.success ) {
						errorMessageRef.current.innerText = data.success;
					}
				});
		}
	}

	function handleSelectOnClick( e: MouseEvent<HTMLSelectElement | HTMLDivElement> ) {
		if( selectMenuRef.current ) {
			selectMenuRef.current.size = selectMenuRef.current.size === 9 ? 1 : 9;
		}
		if( +( e.target as HTMLSelectElement ).value >= 0 ) {
			setSelectedVal(( e.target as HTMLSelectElement ).value );
		}
	}

	return (
		<div className={"saveSpread"}>
			<form onSubmit={saveSpreadFormSubmit}>
				<div>
					<label htmlFor="spreadType"><h3>Spread Meaning</h3></label>
					<div className={"customSelect"}>
						<select
							value={selectedVal}
							className="spreadSelect"
							id="spreadType"
							ref={selectMenuRef}
							onMouseDown={handleSelectOnClick}
							onChange={() => { return; }} //onMouseDown handles the onChange one source of truth for custom select menu.
						>
							<option value="0"></option>
							<option value="1">Past, Present, Future</option>
							<option value="2">Nature, Cause, Solution</option>
							<option value="3">Situation, Obstacle, Advice</option>
							<option value="4">Current Standing, Aspire, How</option>
							<option value="5">You, Person, Relationship</option>
							<option value="6">Strength, Weakness, Advice</option>
							<option value="7">Mind, Body, Spirit</option>
							<option value="8">You, Your Current Path, Your Potential</option>
						</select>
						<div
							className={"selectIcon"}
							onClick={handleSelectOnClick}
						>
							<img src="https://img.icons8.com/metro/26/ACACAC/expand-arrow.png" />
						</div>
					</div>
				</div>
				<button
					type={"submit"}
					className="saveBtn"
					disabled={selectedVal === "0"}
				>
					Save Spread
				</button>
				<div ref={errorMessageRef}></div>
			</form>
		</div>
	);
}

export default SaveSpread;
