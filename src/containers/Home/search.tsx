import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Chips } from "./chips";

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			position: "absolute",
			top: "20%",

			width: "100%",
		},
		chip: {
			fontSize: 45,
			fontWeight: "bold",
			borderRadius: 40,
			height: "100%",
		},
		icon: {
			width: "1em",
			height: "1em",
		},
	})
);

const intChips = [
	{ type: "tag", content: "COMP30022" },
	{ type: "tag", content: "COMP30020" },
	{ type: "person", content: "Alex" },
	{ type: "tag", content: "SWEN30006" },
	{ type: "person", content: "Bob" },
	{ type: "tag", content: "INFO30005" },
];

export default () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container maxWidth="sm">
				<Chips chips={intChips} />
			</Container>
		</div>
	);
};
