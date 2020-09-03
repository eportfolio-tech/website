import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { userService } from "../../services/userService";
import { TextField, Grid, MenuItem } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/userActions";
import { alertActions } from "../../store/actions/alertActions";

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

const titles = [
  {
    value: "Mr.",
    label: "Mr.",
  },
  {
    value: "Mrs.",
    label: "Mrs.",
  },
  {
    value: "Ms.",
    label: "Ms.",
  },
  {
    value: "Miss",
    label: "Miss",
  },
  {
    value: "Dr.",
    label: "Dr.",
  },
];

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
  const [signupFailed, setSignupFailed] = useState(false);
  const [userInfo, setUserInfo] = useState<any | null>({
    password: "",
    title: "",
  });

  const handleInput = (key: any, value: any) => {
    const newUserInfo = {
      ...userInfo,
      [key]: value,
    };
    setUserInfo(newUserInfo);
    setSignupFailed(true);
  };

  const checkPassword = () => {
    if (userInfo.password.length === 0) {
      // to not dispplay error when empty
      return true;
    }
    if (userInfo.password.length < 8) {
      return false;
    }
    if (/\s/.test(userInfo.password)) {
      return false;
    }
    return (
      /[a-z]/.test(userInfo.password) &&
      /[A-Z]/.test(userInfo.password) &&
      /\d/.test(userInfo.password)
    );
  };

  const onSignUpHandler = async () => {
    try {
      await userService.signup(userInfo);
      dispatch(userActions.login("sample"));
      dispatch(alertActions.success("sign up succeed"));
      props.close();
    } catch (error) {
      const err_msg = error.response.data.errors[0].split(",");
      err_msg.forEach((err: any) => {
        dispatch(alertActions.clear());
        dispatch(alertActions.error("sign up failed: " + err));
      });
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h6" gutterBottom>
            Enter Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-select-currency"
                value={userInfo.title}
                select
                label="Select Title"
                fullWidth
                onChange={(event) => handleInput("title", event.target.value)}
                variant="outlined"
              >
                {titles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="username"
                label="Username"
                fullWidth
                required
                defaultValue={userInfo.username}
                onChange={(event) =>
                  handleInput("username", event.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                defaultValue={userInfo.firstName}
                onChange={(event) =>
                  handleInput("firstName", event.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                defaultValue={userInfo.lastName}
                onChange={(event) =>
                  handleInput("lastName", event.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="Email Address"
                defaultValue={userInfo.email}
                onChange={(event) => handleInput("email", event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password (with minimum eight characters)"
                fullWidth
                autoComplete="Password"
                onChange={(event) =>
                  handleInput("password", event.target.value)
                }
                error={!checkPassword()}
                defaultValue={userInfo.password}
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="repassword"
                name="repassword"
                label="Please Re-Enter your Password"
                fullWidth
                autoComplete="Re-Enter Password"
                type="password"
                onChange={(event) =>
                  handleInput("repassword", event.target.value)
                }
                defaultValue={userInfo.repassword}
                error={
                  userInfo.password !== userInfo.repassword &&
                  userInfo.password.length !== 0
                }
              />
            </Grid>

            <Grid item xs={12}>
              <PhoneInput
                country={"au"}
                enableAreaCodes={false}
                onChange={(phone) => handleInput("phone", phone)}
                value={userInfo.phone}
                inputStyle={{
                  width: "100%",
                }}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                id="role"
                select
                fullWidth
                label="Which role can best describe you?"
                onChange={this.props.handle("role")}
                value={this.props.info.role}
                variant="outlined"
              >
                {this.roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSignUpHandler}
              disabled={
                !userInfo.username ||
                !userInfo.firstName ||
                !userInfo.lastName ||
                !userInfo.email ||
                !userInfo.password ||
                !userInfo.repassword ||
                userInfo.password !== userInfo.repassword ||
                !checkPassword()
              }
            >
              Register
            </Button>
          </div>
        </div>
      </Paper>
      <Copyright />
    </main>
  );
};
