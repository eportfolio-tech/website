import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function AccountForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="Password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="repassword"
            name="repassword"
            label="Re-Enter Password"
            fullWidth
            autoComplete="Re-Enter Password"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}