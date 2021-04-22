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

type DajekiTarotUser = {
	username: string,
	imgUrl: string
}