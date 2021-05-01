import "../styles/Card.css";
import Glow from "./Glow";

type cardProp = {
	name?: string,
	element?: TarotElements,
	suit?: TarotSuits,
	style?: React.CSSProperties,
}

function Card({ name, element, suit, style:cardDirectionStyle } : cardProp ): JSX.Element {

	return (
		<div className={"card fade-in-bottom-rotate default-border-radius"}>
			<h4>{name}</h4>
			<img
				src={
					`${ process.env.PUBLIC_URL }/images/rider-waite/front/${ suit }/${ name }.jpg`
				}
				alt={""}
				style={{ ...cardDirectionStyle, height: "100%", maxWidth: "100%" }}
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
						src={`${ process.env.PUBLIC_URL }/images/symbols/elements/${ element }.svg`}
						alt={""}
					/>
				</Glow>
				<Glow>
					<img
						className={"icon-50px"}
						src={`${ process.env.PUBLIC_URL }/images/symbols/suits/${ suit }.svg`}
						alt={""}
					/>
				</Glow>
			</div>
		</div>
	);
}

export default Card;
