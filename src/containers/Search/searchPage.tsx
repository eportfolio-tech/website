import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { Chips } from "../Home/chips";
import { Search as SearchIcon } from "@material-ui/icons";
import Results from "./ressults";
const useStyles = makeStyles(() =>
	createStyles({
		root: {
			position: "absolute",
			top: "15%",
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
	{ type: "person", content: "Alex Smith" },
	{ type: "person", content: "Bob Jones" },
	{ type: "tag", content: "Software Engineer" },
	{ type: "tag", content: "Marketing Analyst" },
];

export default () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<Grid container>
					<Grid item xs={1}>
						<Grid container justify="center">
							<SearchIcon
								style={{ width: "60%", height: "60%" }}
							/>
						</Grid>
					</Grid>
					<Grid item xs={11}>
						<Chips chips={intChips} />
					</Grid>
				</Grid>
			</Container>
			<Results />
		</div>
	);
};
