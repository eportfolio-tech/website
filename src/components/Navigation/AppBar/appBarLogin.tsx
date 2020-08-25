import React, { useContext, useState } from "react";
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
import { IRootState } from "../../../index";
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
	openDrawer?: Boolean;
	handleDrawerOpen?: any;
	handleDrawerClose?: any;
}

/***
 * The App Bar at the top.
 */
export default withWidth()(
	({ width, handleDrawerOpen, openDrawer }: AppBarProps) => {
		const classes = useStyles();
		//const history = useHistory();
		//const location = useLocation();

		const [avatarEL, setAvatarEL] = useState(null);

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
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, {
							[classes.hide]: openDrawer,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Button></Button>

					<div className={classes.link}>
						<Button
							className={classes.link}
							onClick={(event: any) => {
								setAvatarEL(event.currentTarget);
							}}
						>
							<Avatar />
						</Button>
						<Menu
							open={Boolean(avatarEL)}
							keepMounted
							anchorEl={avatarEL}
							onClose={() => {
								setAvatarEL(null);
							}}
						>
							<MenuItem
								className={classes.menuItem}
								onClick={() => {
									localStorage.removeItem("user");
									window.location.reload(false);
								}}
							>
								Logout
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
);
