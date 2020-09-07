import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react';
import { userService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';
import { Button, Grid, useTheme } from '@material-ui/core';

export default () => {
    const dispatch = useDispatch();
    const [userTags, setUserTags] = useState([]);
    const theme = useTheme();
    const getTagHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.username;

            const tags = await userService.getUserTags(username);
            setUserTags(tags);
            dispatch(alertActions.success('get tags succeed'));
        } catch (error) {
            dispatch(alertActions.error('get tags failed'));
        }
    };

    return (
        <Grid container justify='space-around' spacing={2}>
            <Grid item xs={12}>
                <ChipInput
                    style={{ height: '100%' }}
                    fullWidth
                    defaultValue={userTags}
                />
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={getTagHandler}
                    fullWidth
                    style={{
                        height: '100%',
                        marginTop: theme.spacing(1),
                        textTransform: 'none',
                    }}
                >
                    Get your tags
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant='contained'
                    color='secondary'
                    fullWidth
                    style={{
                        height: '100%',
                        marginTop: theme.spacing(1),
                        textTransform: 'none',
                    }}
                >
                    Submit your tags
                </Button>
            </Grid>
        </Grid>
    );
};
