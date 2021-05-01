import React, { useState } from "react";
import "./Glow.css";

type MyProps = {
	toggle?: boolean;
	className?: string;
	style ?: React.CSSProperties
}

type WithChildren<T extends Record<string, unknown>> = T & {
	children: React.ReactElement<MyProps>
}

function Glow({
	className: origClassName,
	children : child,
	toggle,
	style : glowStyle,
}: WithChildren<MyProps> ): JSX.Element {
	//click and hover state of glow icons
	const [hovered, setHovered] = useState( false );
	const [clicked, setClicked] = useState( false );

	if ( React.Children.count( child ) !== 1 ) {
		throw new Error( "💥 Glow effect can only have one child element." );
	}

	const toggleHover = () => {
		setHovered( !hovered );
	};

	const toggleClick = ( function () {
		let currentTimeout: NodeJS.Timeout;

		return function () {
			setClicked( true );
			if ( currentTimeout ) {
				clearTimeout( currentTimeout );
			}
			currentTimeout = setTimeout(() => {
				setClicked( false );
			}, 150 );
		};
	})();

	const glowHoverIntesifier = hovered ? "increase-glow" : "";
	const passeedDownClasses = child.props.className || "";

	//attach a toggle and click handle if the Glow element toggle prop true
	const childWithBlur = React.cloneElement(
		child,
		toggle ?
			{
				className: `${ glowHoverIntesifier } ${ passeedDownClasses } abs-blur`,
			}
			:
			{
				className: `${ passeedDownClasses } abs-blur`,
			},
	);

	const childMain = React.cloneElement( child, {
		className: child.props.className,
	});

	const glowIconClickedDrop = clicked ? "clicked-glow" : "";

	return (
		<div
			onMouseDown={toggle ? toggleClick : undefined}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			className={`glow-container ${ origClassName || "" } ${ glowIconClickedDrop }`}
			style={glowStyle}
		>
			{childWithBlur}
			{childMain}
		</div>
	);

}

export default Glow;
