import React, { useState } from "react";
import Intro from "./IntroAnimation.jsx";
import Layout from "../../components/Navigation/layout";

import { useSpring, animated as a } from "react-spring";

export default () => {
	const [flipped, setFlipped] = useState(false);
	const { transform, opacity }: any = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
		config: { mass: 5, tension: 500, friction: 80 },
	});

	return (
		<Layout noPadding>
			<div>
				<a.div>
					<Intro
						setShow={() => {
							setFlipped((state) => !state);
						}}
					/>
				</a.div>
				{flipped ? (
					<a.div
						onClick={() => {
							setFlipped((state) => !state);
						}}
						style={{
							position: "absolute",
							bottom: 0,
							opacity,
							transform: transform.interpolate(
								(t: any) => `${t} rotateX(180deg)`
							),
							background: "red",
							height: "100%",
							width: "100%",
						}}
					></a.div>
				) : null}
			</div>
		</Layout>
	);
};
