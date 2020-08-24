import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
	Avatar,
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Menu,
	MenuItem,
} from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { IRootState } from "../../index";
import { useHistory, useLocation } from "react-router-dom";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	logo: {
		maxHeight: "3rem",
	},
	link: {
		marginLeft: "auto",
	},

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		background: theme.palette.background.default,
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
}

/***
 * The App Bar at the top.
 */
export default withWidth()(({ width }: AppBarProps) => {
	const classes = useStyles();
	//const history = useHistory();
	//const location = useLocation();
	const loggedIn = useSelector<IRootState, boolean>(
		(state) => state.auth.loggedIn
	);
	const openDrawer = false;

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: openDrawer,
			})}
		>
			<Toolbar>
				<IconButton
					aria-label="open drawer"
					edge="start"
					className={clsx(classes.menuButton, {
						[classes.hide]: openDrawer,
					})}
				>
					<MenuIcon />
				</IconButton>
				<Button></Button>

				<div className={classes.link}>
					<Button className={classes.link}>
						<Avatar />
					</Button>
					<Menu open={false} keepMounted>
						{loggedIn ? (
							<MenuItem className={classes.menuItem}>
								Logout
							</MenuItem>
						) : (
							<div>
								<MenuItem className={classes.menuItem}>
									Login
								</MenuItem>
								<MenuItem className={classes.menuItem}>
									Sign Up
								</MenuItem>
							</div>
						)}
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
});
