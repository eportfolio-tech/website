import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

interface PassedProps extends React.Props<any> {
  info: any
  handle: any
  check: any
}

class AccountForm extends React.Component<PassedProps> {
  render() {
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
              defaultValue={this.props.info.firstName}
              onChange={this.props.handle('firstName')}
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
              defaultValue={this.props.info.lastName}
              onChange={this.props.handle('lastName')}
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
              defaultValue={this.props.info.email}
              onChange={this.props.handle('email')}
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
              onChange={this.props.handle('password')}
              type="password"
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
              type="password"
              onChange={this.props.handle('repassword')}
              error={this.props.check()}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccountForm;