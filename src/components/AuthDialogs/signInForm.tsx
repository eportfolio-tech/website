import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Paper, createStyles, Typography } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import TextField from "../AuthDialogs/textField";
import { userActions } from "../../store/actions/userActions";
import { alertActions } from "../../store/actions/alertActions";
import { useDispatch } from "react-redux";
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
			color: "white",
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
interface ISignInForm {
	setOpen: any;
}

/***
 * Login Form in login dialog.
 */
export default ({ setOpen }: ISignInForm) => {
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//const [] = useState("student");
	//const [] = useState("");
	const dispatch = useDispatch();
	//fetch login API.
	const login = async () => {
		await setTimeout(() => {}, 1000);
		const sampleCookie = { user: "test", token: "123" };
		dispatch(userActions.login("Sample user"));
		dispatch(alertActions.success("Successfully Logged in!"));
		localStorage.setItem("user", JSON.stringify(sampleCookie));
		history.push("/dashboard");
		console.log(email + password);
	};

	return (
		<Paper elevation={0} className={classes.paper}>
			<Typography variant="h4" align="center">
				Welcome Back.
			</Typography>
			<form className={classes.form} onSubmit={login}>
				<TextField label="Email" setState={setEmail} required={true} />
				<TextField
					label="Password"
					setState={setPassword}
					required={true}
					type={"password"}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					size="large"
				>
					Login In
				</Button>
			</form>
			<br />
			<Button
				size="small"
				color="primary"
				className={classes.signUpButton}
				fullWidth
				onClick={() => {
					setOpen(false);
					history.push("/sign-up");
				}}
			>
				Don't have an account? Sign Up
			</Button>
			<br />
		</Paper>
	);
};
