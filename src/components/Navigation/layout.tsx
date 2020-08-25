import React, { useState, ReactChildren, ReactChild } from "react";
import clsx from "clsx";
import {
	makeStyles,
	useTheme,
	createStyles,
	Theme,
} from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import Drawer from "@material-ui/core/Drawer";
//import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { useSelector } from "react-redux";
import { IRootState } from "../../index";

import AppBarLogin from "./AppBar/appBarLogin";
import AppBarLogout from "./AppBar/appBarLogout";
//import { UserContext, AuthApi } from "../Methods";
import { useHistory } from "react-router-dom";
//import Cookies from "js-cookie";

import Loading from "./loading";
import MenuList from "./menuList";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		hide: {
			display: "none",
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("md")]: {
				width: theme.spacing(9) + 1,
			},
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			[theme.breakpoints.up("lg")]: {
				padding: theme.spacing(10),
			},
			[theme.breakpoints.down("sm")]: {
				padding: theme.spacing(2),
				marginTop: "18%",
			},
			[theme.breakpoints.between("sm", "md")]: {
				padding: theme.spacing(2),
				marginTop: "8%",
			},
			maxWidth: "100%",
		},
		bottom: {
			position: "fixed",
			bottom: 0,
			boxShadow: "20",
		},
	})
);

interface ILayoutProps {
	width: Breakpoint;
	type?: any;
	children?: ReactChild | ReactChildren;
}

/***
 * The layout of the application once login in.
 */
export default withWidth()(({ children, width }: ILayoutProps) => {
	const classes = useStyles();
	const theme = useTheme();
	const largeScreen = isWidthUp("lg", width);

	const loggedIn = useSelector<IRootState, boolean | undefined>(
		(state) => state.auth.loggedIn
	);

	//Navigation Drawer...
	const history = useHistory();

	const loadingRoute = false;
	const [open, setOpen] = useState(largeScreen);
	const handleRouting = (newRoute: String) => {
		history.push("/" + newRoute);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	//Log out...
	/*
		const { setAuth } = useContext(AuthApi);
		const logOut = () => {
			setAuth(false);
			setUser({});
			Cookies.remove("meetute");
		};*/

	const getDrawlerOnClose = () => {
		if (largeScreen) return;
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			{loggedIn ? (
				<AppBarLogin
					openDrawer={largeScreen ? open : false}
					handleDrawerOpen={handleDrawerOpen}
					handleDrawerClose={handleDrawerClose}
				/>
			) : (
				<AppBarLogout />
			)}

			{loggedIn ? (
				<Drawer
					variant={largeScreen ? "permanent" : "temporary"}
					className={
						largeScreen
							? clsx(classes.drawer, {
									[classes.drawerOpen]: open,
									[classes.drawerClose]: !open,
							  })
							: undefined
					}
					classes={
						largeScreen
							? {
									paper: clsx({
										[classes.drawerOpen]: open,
										[classes.drawerClose]: !open,
									}),
							  }
							: undefined
					}
					open={largeScreen ? false : open}
					onClose={getDrawlerOnClose}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					{loadingRoute ? null : (
						<div>
							<MenuList handleRouting={handleRouting} />
						</div>
					)}
				</Drawer>
			) : null}

			{loadingRoute ? (
				<Loading />
			) : (
				<main className={classes.content}>{children}</main>
			)}
		</div>
	);
});
