import React, { useContext, useEffect } from "react";
import { PastSpreadsContext } from "../hooks/PastSpreadsContextController";
import { SavedSpreadNeedReloadContext } from "../hooks/SavedSpreadNeedReloadContextController";
import { JwtContext } from "../hooks/UserJWTContextController";

import "../styles/PastSpreads.css";

function PastSpread(): JSX.Element {

	const { pastSpreads, setPastSpreads } = useContext( PastSpreadsContext );
	const { jwt } = useContext( JwtContext );
	const { needReload, setNeedReload } = useContext( SavedSpreadNeedReloadContext );

	useEffect(() => {
		if ( needReload && jwt ) {
			fetch( `${ process.env.REACT_APP_API_URL }/userInfo/past_spread`, {
				headers: {
					authorization: `Bearer ${ jwt }`,
				},
			})
				.then( res => res.json())
				.then(( pastSpreadData: PastSpreadsApiReturn[] ) => {
					setPastSpreads( pastSpreadData );
					setNeedReload( false );
				});
		}
	}, [jwt] );

	function formattedSavedSpreads() : JSX.Element[] {
		const formattedSpreads = [] as JSX.Element[];
		let cardDirections;
		for ( let i = 0; i < pastSpreads.length; i += 3 ) {
			//"101" or up down up for direction into ["1","0","1"] for conditional checking
			cardDirections = pastSpreads[i].direction.split( "" );
			formattedSpreads.push(
				<table key={i}>
					<thead>
						<tr>
							<th colSpan={4}>{
								`${ new Date( new Date( pastSpreads[i].date_drawn ).getTime() - new Date().getTimezoneOffset()).toLocaleDateString() } ` +
								`${ pastSpreads[i].card_one_spread_meaning } ` +
								`${ pastSpreads[i].card_two_spread_meaning } ` +
								`${ pastSpreads[i].card_three_spread_meaning }`
							}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{pastSpreads[i].card_name}</td>
							<td>{pastSpreads[i].element}</td>
							<td>{cardDirections[0] === "1" ? "Up" : "Down"}</td>
							<td>{cardDirections[0] === "1" ? pastSpreads[i].card_meaning_up : pastSpreads[i].card_meaning_down}</td>
						</tr>
						<tr>
							<td>{pastSpreads[i+1].card_name}</td>
							<td>{pastSpreads[i+1].element}</td>
							<td>{cardDirections[1] === "1" ? "Up" : "Down"}</td>
							<td>{cardDirections[1] === "1" ? pastSpreads[i+1].card_meaning_up : pastSpreads[i+1].card_meaning_down}</td>
						</tr>
						<tr>
							<td>{pastSpreads[i+2].card_name}</td>
							<td>{pastSpreads[i+2].element}</td>
							<td>{cardDirections[2] === "1" ? "Up" : "Down"}</td>
							<td>{cardDirections[2] === "1" ? pastSpreads[i+2].card_meaning_up : pastSpreads[i+2].card_meaning_down}</td>
						</tr>
					</tbody>
				</table>,
			);
		}
		return formattedSpreads;
	}

	return (
		<div className="savedSpreads">
			{
				!needReload && pastSpreads.length && jwt &&  formattedSavedSpreads()
			}
		</div>
	);
}

export default PastSpread;
