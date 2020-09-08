import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';
import { Button, Grid, useTheme, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface TagType {
    id: number;
    name: string;
    icon?: null | string;
    deleted: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedOn?: string;
}

export default () => {
    const dispatch = useDispatch();
    const [options, setOptions] = useState<TagType[]>([]);
    const [userTags, setUserTags] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        getAllTags();
        getUserTags();
    }, []);

    const getAllTags = async () => {
        try {
            const tags = await userService.getAllTags();
            setOptions(tags);
        } catch {
            dispatch(alertActions.error('fetch tags failed'));
        }
    };

    const getUserTags = async () => {
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
                <Autocomplete
                    multiple
                    id='checkboxes-tags-demo'
                    disableCloseOnSelect
                    options={options}
                    getOptionLabel={(option: any) => option.name || option}
                    value={userTags}
                    onChange={(event: any, value: any) => {
                        setUserTags(value);
                    }}
                    freeSolo
                    renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.name}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant='outlined'
                            label='Select existing tags or create your own'
                            placeholder='Add...'
                        />
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={getUserTags}
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
