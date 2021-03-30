import React, { useState } from "react";
import "../styles/Glow.css";

interface MyProps {
	toggle?: boolean;
	className?: string;
}

function Glow({
	className: origClassName,
	children,
	toggle
}: React.PropsWithChildren<MyProps>) {
	//click and hover state of glow icons
	const [hovered, setHovered] = useState(false);
	const [clicked, setClicked] = useState(false);

	if (React.Children.count(children) !== 1) {
		throw new Error("💥 Glow effect can only have one child element.");
	}

	let childAsReactElement = children as React.ReactElement<any, string>;

	const toggleHover = () => {
		setHovered(!hovered);
	};

	const toggleClick = (function () {
		let currentTimeout: NodeJS.Timeout;

		return function () {
			setClicked(true);
			if (currentTimeout) {
				clearTimeout(currentTimeout);
			}
			currentTimeout = setTimeout(() => {
				setClicked(false);
			}, 150);
		};
	})();

	const glowHoverIntesifier = hovered ? "increase-glow" : "";

	//attach a toggle and click handle if the Glow element toggle prop true
	const childWithBlur = React.cloneElement(
		childAsReactElement,
		toggle
			? {
					className: `${glowHoverIntesifier} ${
						childAsReactElement.props.className || ""
					} abs-blur`
			  }
			: {
					className: `${childAsReactElement.props.className || ""} abs-blur`
			  }
	);

	const childMain = React.cloneElement(childAsReactElement, {
		className: childAsReactElement.props.className
	});

	let glowIconClickedDrop = clicked ? "clicked-glow" : "";

	return (
		<div
			onMouseDown={toggle ? toggleClick : undefined}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			className={`glow-container ${origClassName || ""} ${glowIconClickedDrop}`}
		>
			{childWithBlur}
			{childMain}
		</div>
	);
	
}

export default Glow;
