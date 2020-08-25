import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AccountForm from "../Forms/AccountForm/AccountForm";
import OptionalForm from "../Forms/OptionalForm/OptionalForm";
import Review from "../Review/Review";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
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

const steps = ["Enter details", "Optional details", "Verification (还没做)"];

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return <AccountForm />;
		case 1:
			return <OptionalForm />;
		case 2:
			return <Review />;
		default:
			throw new Error("Unknown step");
	}
}

interface ISignUpForm {
	setOpen: any;
}

export default ({ setOpen }: ISignUpForm) => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

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
							Thank you for your order.
						</Typography>
						<Typography variant="subtitle1">
							Your order number is #2001539. We have emailed your
							order confirmation, and will send you an update when
							your order has shipped.
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
									? "Place order"
									: "Next"}
							</Button>
						</div>
					</div>
				)}
			</Paper>
			<Copyright />
		</main>
	);
};
