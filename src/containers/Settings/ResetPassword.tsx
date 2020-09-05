import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { userService } from "../../services/userService";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/actions/alertActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export default function ResetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const checkPassword = () => {
    if (newPassword.length === 0) {
      // to not dispplay error when empty
      return true;
    }
    if (newPassword.length < 8) {
      return false;
    }
    if (/\s/.test(newPassword)) {
      return false;
    }
    return (
      /[a-z]/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      /\d/.test(newPassword)
    );
  };

  const onResetHandler = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user") || "");
      const username = userInfo.username;

      await userService.resetPassword(username, oldPassword, newPassword);
      dispatch(alertActions.success("reset password succeed"));
    } catch (error) {
      dispatch(
        alertActions.error(
          "reset password failed: " + error.response.data.errors
        )
      );
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        required
        id="outlined-basic"
        label="Old Password"
        variant="outlined"
        type="password"
        onChange={(event) => setOldPassword(event.target.value)}
      >
        Old Password
      </TextField>
      <TextField
        required
        id="outlined-basic"
        label="New Password"
        variant="outlined"
        type="password"
        onChange={(event) => setNewPassword(event.target.value)}
        error={!checkPassword()}
      >
        New Password
      </TextField>
      <TextField
        required
        id="outlined-basic"
        label="Repeat New Password"
        variant="outlined"
        type="password"
        onChange={(event) => setRepeatPassword(event.target.value)}
        error={newPassword !== repeatPassword && repeatPassword.length > 0}
      >
        Repeat New Password
      </TextField>
      <Button
        variant="contained"
        color="secondary"
        disabled={!oldPassword || !newPassword || !repeatPassword}
        onClick={onResetHandler}
      >
        Reset Password
      </Button>
    </div>
  );
}