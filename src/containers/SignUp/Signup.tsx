import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AccountForm from "../../components/Forms/AccountForm/AccountForm";
import OptionalForm from "../../components/Forms/OptionalForm/OptionalForm";
import ReviewForm from "../../components/Forms/ReviewForm/ReviewForm";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://dev.eportfolio.tech/">
				COMP30022
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: "relative",
		},
		layout: {
			width: "auto",
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
			[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
				width: 600,
				marginLeft: "auto",
				marginRight: "auto",
			},
		},
		paper: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3),
			padding: theme.spacing(2),
			[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
				marginTop: theme.spacing(6),
				marginBottom: theme.spacing(6),
				padding: theme.spacing(3),
			},
		},
		stepper: {
			padding: theme.spacing(3, 0, 5),
		},
		buttons: {
			display: "flex",
			justifyContent: "flex-end",
		},
		button: {
			marginTop: theme.spacing(3),
			marginLeft: theme.spacing(1),
		},
	})
);

const steps = ["Enter details", "Optional details", "Verification"];



export default function Checkout() {

	function getStepContent(step: number) {
		switch (step) {
			case 0:
				return <AccountForm info={userInfo} handle={handleInput}/>;
			case 1:
				return <OptionalForm info={userInfo} handle={handleInput}/>;
			case 2:
				return <ReviewForm />;
			default:
				throw new Error("Unknown step");
		}
	}

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);

	const [userInfo, setUserInfo] = React.useState(
		{
			userInfo: {
				firstName: '',
				lastName: '',
				email: '',
				password: ''
			}
		}
	)

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleInput = () => {
		setUserInfo({
			userInfo: {
				firstName: '',
				lastName: '',
				email: '',
				password: ''
			}
		})
	}

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Stepper activeStep={activeStep} className={classes.stepper}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				{activeStep === steps.length ? (
					<div>
						<Typography variant="h5" gutterBottom>
							Registration Succeed.
						</Typography>
						<Typography variant="subtitle1">
							You can manage your personal details under your dashboard.
						</Typography>
					</div>
				) : (
					<div>
						{getStepContent(activeStep)}
						<div className={classes.buttons}>
							{activeStep !== 0 && (
								<Button
									onClick={handleBack}
									className={classes.button}
								>
									Back
								</Button>
							)}
							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
							>
								{activeStep === steps.length - 1
									? "Done"
									: "Next"}
							</Button>
						</div>
					</div>
				)}
			</Paper>
			<Copyright />
		</main>
	);
}
