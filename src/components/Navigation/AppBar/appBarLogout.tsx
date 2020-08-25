import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import SignIn from "../../AuthDialogs/signInDialog";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	logo: {
		maxHeight: "3rem",
	},
	toolbar: {
		flexWrap: "wrap",
	},
	toolbarTitle: {
		flexGrow: 1,
		fontWeight: 550,
		marginLeft: theme.spacing(10),
	},
	getStarted: {
		margin: theme.spacing(1, 20, 1, 1),
		minWidth: "10rem",
		background: "linear-gradient(-60deg, #16a085 0%, #0d77db 100%);",
		borderRadius: 10,
		textTransform: "none",
		fontWeight: 550,
		fontFamily: "Arial",
		color: "white",
	},
	signIn: {
		textTransform: "none",
		minWidth: "10rem",
		fontWeight: 550,
		borderRadius: 10,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		background: "transparent",
		boxShadow: "none",
		minHeight: 50,
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 10,
	},
	hide: {
		display: "none",
	},
	menuItem: {
		fontWeight: 900,
	},
	noDecoration: {
		textDecoration: "none !important",
		marginLeft: theme.spacing(3),
	},
}));

interface AppBarProps {
	width: Breakpoint;
	openDrawer?: Boolean;
	handleDrawerOpen?: any;
	handleDrawerClose?: any;
}

/***
 * The App Bar at the top.
 */
export default withWidth()(() => {
	const classes = useStyles();
	const history = useHistory();

	//const [avatarEL, setAvatarEL] = useState(null);
	const [openLogin, setOpenLogin] = useState(false);

	return (
		<div>
			<SignIn open={openLogin} setOpen={setOpenLogin} />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						noWrap
						color="textPrimary"
						className={classes.toolbarTitle}
					>
						COMP30022
					</Typography>

					<Button
						size={"large"}
						className={classes.signIn}
						onClick={() => {
							//history.push("/sign-in");
							setOpenLogin(true);
						}}
					>
						Sign In
					</Button>
					<Button
						size={"large"}
						className={classes.getStarted}
						color="default"
						onClick={() => {
							history.push("/sign-up");
						}}
					>
						Get Started
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
});
