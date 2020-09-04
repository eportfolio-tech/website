import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { userService } from "../../services/userService";
import TextField from "./textField";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/userActions";
import { alertActions } from "../../store/actions/alertActions";

// Extension Styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "90%",
			height: "90%",
		},

		form: {
			marginTop: theme.spacing(3),
		},
		submit: {
			margin: theme.spacing(2, 0, 0),
			background: "linear-gradient(-60deg, #16a085 0%, #0d77db 100%);",
			borderRadius: 10,
			textTransform: "none",
			fontWeight: 550,
			fontFamily: "Arial",
		},
		signUpButton: {
			textTransform: "none",
			color: "#31a065",
			fontWeight: 550,
			borderRadius: 10,
			fontFamily: "Arial",
		},

		warn: {
			marginTop: theme.spacing(0.8),
		},
		close: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	})
);

export default (props: { close: () => void }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	// const [signinFailed, setSigninFailed] = useState(false);
	const [userName, setUserName] = useState("");
	// const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const onSignUpHandler = async () => {
		try {
			const user = await userService.login(userName, userPassword);
			dispatch(userActions.login(user));
			dispatch(alertActions.success("log in succeed"));
			props.close();
		} catch (error) {
			dispatch(
				alertActions.error(
					"log in failed: " + error.response.data.errors
				)
			);
		}
	};

	return (
		<Paper elevation={0} className={classes.paper}>
			<Typography variant="h4" align="center">
				Welcome Back.
			</Typography>
			<form className={classes.form}>
				<TextField
					label="user name"
					setState={setUserName}
					required={true}
				/>
				<TextField
					label="Password"
					setState={setUserPassword}
					required={true}
					type={"password"}
				/>

				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					size="large"
					onClick={onSignUpHandler}
				>
					Login In
				</Button>
			</form>
			<br />
			<br />
		</Paper>
	);
};
