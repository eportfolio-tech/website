import React from "react";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";

import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// Little helpers ...
const url = (name, wrap = false) =>
	`${
		wrap ? "url(" : ""
	}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
		wrap ? ")" : ""
	}`;

export default ({ toggle }) => {
	let parallax;
	return (
		<div>
			<Parallax
				style={{ background: "#253237" }}
				ref={(ref) => (parallax = ref)}
				pages={3}
			>
				<ParallaxLayer
					offset={1}
					speed={1}
					style={{ backgroundColor: "#805E73" }}
				/>
				<ParallaxLayer
					offset={2}
					speed={1}
					style={{ backgroundColor: "#87BCDE" }}
				/>

				<ParallaxLayer
					offset={0}
					speed={0}
					factor={3}
					style={{
						backgroundImage: url("stars", true),
						backgroundSize: "cover",
					}}
				/>

				<ParallaxLayer
					offset={1.3}
					speed={-0.3}
					style={{ pointerEvents: "none" }}
				>
					<img
						alt="satellite4"
						src={url("satellite4")}
						style={{ width: "15%", marginLeft: "70%" }}
					/>
				</ParallaxLayer>

				<ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "20%",
							marginLeft: "55%",
						}}
					/>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "10%",
							marginLeft: "15%",
						}}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={1.75}
					speed={0.5}
					style={{ opacity: 0.1 }}
				>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "20%",
							marginLeft: "70%",
						}}
					/>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "20%",
							marginLeft: "40%",
						}}
					/>
				</ParallaxLayer>

				<ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "10%",
							marginLeft: "10%",
						}}
					/>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "20%",
							marginLeft: "75%",
						}}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={1.6}
					speed={-0.1}
					style={{ opacity: 0.4 }}
				>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "20%",
							marginLeft: "60%",
						}}
					/>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "25%",
							marginLeft: "30%",
						}}
					/>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "10%",
							marginLeft: "80%",
						}}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2.6}
					speed={0.4}
					style={{ opacity: 0.6 }}
				>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "20%",
							marginLeft: "5%",
						}}
					/>
					<img
						alt="cloud"
						src={url("cloud")}
						style={{
							display: "block",
							width: "15%",
							marginLeft: "75%",
						}}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2.5}
					speed={-0.4}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						pointerEvents: "none",
					}}
				>
					<img
						alt="earth"
						src={url("earth")}
						style={{ width: "60%" }}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2}
					speed={-0.3}
					style={{
						backgroundSize: "80%",
						backgroundPosition: "center",
						backgroundImage: url("clients", true),
					}}
				/>

				<ParallaxLayer
					offset={0}
					speed={0.1}
					onClick={() => parallax.scrollTo(1)}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<img
						alt="server"
						src={url("server")}
						style={{ width: "20%" }}
					/>
				</ParallaxLayer>
				<ParallaxLayer
					offset={0}
					speed={0.1}
					onClick={() => parallax.scrollTo(1)}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IconButton
						style={{
							color: "white",
							background:
								"linear-gradient(-60deg, #16a085 0%, #0d77db 100%)",
						}}
						onClick={() => {
							toggle(false);
						}}
					>
						<SearchIcon
							style={{
								height: "100px",
								width: "100px",
							}}
						/>
					</IconButton>
				</ParallaxLayer>

				<ParallaxLayer
					offset={1}
					speed={0.1}
					onClick={() => parallax.scrollTo(2)}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<img
						alt="bash"
						src={url("bash")}
						style={{ width: "40%" }}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2}
					speed={-0}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					onClick={() => parallax.scrollTo(0)}
				>
					<img
						alt="clients-main"
						src={url("clients-main")}
						style={{ width: "40%" }}
					/>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2}
					speed={-0}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IconButton
						style={{
							color: "white",
							background:
								"linear-gradient(-60deg, #16a085 0%, #0d77db 100%)",
						}}
						onClick={toggle}
					>
						<SearchIcon
							style={{
								height: "100px",
								width: "100px",
							}}
						/>
					</IconButton>
				</ParallaxLayer>
			</Parallax>
		</div>
	);
};
