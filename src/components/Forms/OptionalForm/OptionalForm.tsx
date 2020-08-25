import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { MenuItem } from '@material-ui/core';


export default function OptionalForm() {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        You can complete this after registration
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            id="preferedname" 
            label="Prefered Name" 
            fullWidth 
            autoComplete="cc-name" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            autoComplete="title"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            id="region" 
            label="Region" 
            fullWidth 
            autoComplete="region" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="zip"
            label="ZIP"
            fullWidth
            autoComplete="zip"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mobile"
            label="Mobile Number"
            fullWidth
            autoComplete="mobile"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
              id="role"
              select
              fullWidth
              label="Which role can best describe you?">
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}