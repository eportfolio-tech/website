import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { userService } from "../../services/userService";
import { TextField, Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/userActions";
import { alertActions } from "../../store/actions/alertActions";

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
        alertActions.error("log in failed: " + error.response.data.errors)
      );
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h6" gutterBottom>
            Welcome Back
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Username"
                fullWidth
                required
                defaultValue={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                type="password"
                defaultValue={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSignUpHandler}
            >
              Log in
            </Button>
          </div>
        </div>
      </Paper>
    </main>
  );
};
