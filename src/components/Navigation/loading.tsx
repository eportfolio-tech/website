import React from "react";
import { LinearProgress } from "@material-ui/core";
import {
	withStyles,
	lighten,
	makeStyles,
	Theme,
} from "@material-ui/core/styles";

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 5,
		backgroundColor: lighten("#0a6aab", 0.5),
	},
	bar: {
		borderRadius: 100,
		backgroundColor: "#0a6aab",
	},
}))(LinearProgress);

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	margin: {
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(10),
		},
		[theme.breakpoints.up("sm")]: {
			margin: theme.spacing(8),
		},
	},
}));

/***
 * Loading bar while loading.
 */
export default () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<BorderLinearProgress className={classes.margin} />
		</div>
	);
};
