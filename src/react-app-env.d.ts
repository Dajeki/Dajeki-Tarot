/// <reference types="react-scripts" />

type TarotElements = "fire" | "water" | "air" | "earth";
type TarotSuits = "wand" | "cup" | "sword" | "pentacle" | "aether";

type CardApiReturn = {
	card_name			: string,
	id					: number,
	card_rank			: number,
	element				: TarotElements,
	suit 				: TarotSuits,
	card_meaning_up		?: string,
	card_meaning_down	?: string,
}

type PastSpreadsApiReturn = {
	id: number,
	/** Date as UTC/GMT date. Convert to date object then to local time. */
	date_drawn					: string,
	card_one_spread_meaning		: string
	card_two_spread_meaning		: string
	card_three_spread_meaning	: string
	direction					: string,
	suit						: string,
	card_name					: string,
	card_id						: number
	element						: string,
	card_rank					: number,
	card_meaning_up				?: string,
	card_meaning_down			?: string,
}


type DajekiTarotUser = {
	username: string,
	imgUrl: string
}