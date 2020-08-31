import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { MenuItem } from '@material-ui/core';

interface PassedProps extends React.Props<any> {
    info: any;
    handle: any;
    handlePhone: any;
}

class OptionalForm extends React.Component<PassedProps> {
    titles = [
        {
            value: 'Mr.',
            label: 'Mr.',
        },
        {
            value: 'Mrs.',
            label: 'Mrs.',
        },
        {
            value: 'Ms.',
            label: 'Ms.',
        },
        {
            value: 'Miss',
            label: 'Miss',
        },
        {
            value: 'Dr.',
            label: 'Dr.',
        },
    ];

    roles = [
        {
            value: 'Software Engineer',
            label: 'Software Engineer',
        },
        {
            value: 'Data Scientist',
            label: 'Data Scientist',
        },
    ];

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    You can complete this after registration
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="outlined-select-currency"
                            value={this.props.info.title}
                            select
                            label="Select Title"
                            fullWidth
                            onChange={this.props.handle('title')}
                            variant="outlined">
                            {this.titles.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="preferedname"
                            label="Prefered Name"
                            fullWidth
                            autoComplete="cc-name"
                            defaultValue={this.props.info.preferedName}
                            onChange={this.props.handle('preferedName')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PhoneInput
                            country={'au'}
                            enableAreaCodes={false}
                            onChange={(phone) => this.props.handlePhone(phone)}
                            value={this.props.info.phone}
                            inputStyle={{
                                width: '100%',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="zip"
                            label="ZIP"
                            fullWidth
                            autoComplete="zip"
                            defaultValue={this.props.info.zip}
                            onChange={this.props.handle('zip')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="role"
                            select
                            fullWidth
                            label="Which role can best describe you?"
                            onChange={this.props.handle('role')}
                            value={this.props.info.role}
                            variant="outlined">
                            {this.roles.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default OptionalForm;