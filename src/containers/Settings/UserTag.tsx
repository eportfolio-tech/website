import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';
import {
    Button,
    Grid,
    useTheme,
    TextField,
    CardContent,
    Card,
    CardHeader,
    Typography,
    ButtonGroup,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TagIcon from '@material-ui/icons/LocalOffer';
import PublishIcon from '@material-ui/icons/Publish';
import RestoreIcon from '@material-ui/icons/Restore';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface TagType {
    id?: number;
    name: string;
    icon?: null | string;
    deleted?: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedOn?: string;
}

export default () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [options, setOptions] = useState<TagType[]>([]);
    const [userTags, setUserTags] = useState<TagType[]>([]);
    const [deleteTags, setDeleteTags] = useState<TagType[]>([]); // array of tag object will be deleted

    const getAllTags = async () => {
        try {
            const tags = await userService.getAllTags();
            setOptions(tags);
        } catch (error) {
            dispatch(
                alertActions.error(
                    'fetch tags failed: ' + error.response.data.errors
                )
            );
        }
    };

    useEffect(() => {
        getAllTags();
        getUserTags();
        // eslint-disable-next-line
    }, []);

    const getUserTags = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.username;

            const tags = await userService.getUserTags(username);
            setUserTags(tags);
            dispatch(alertActions.success('get tags succeed.'));
        } catch (error) {
            dispatch(
                alertActions.error(
                    'get tags failed: ' + error.response.data.errors
                )
            );
        }
    };

    const onChangeHandler = (
        event: any,
        value: any,
        reason: any,
        details: any
    ) => {
        // console.log('details: ', details);
        // console.log('reason: ', reason);
        // console.log('value: ', value);

        if (reason === 'create-option') {
            const updatedTags = [
                ...userTags,
                {
                    name: details.option,
                    deleted: false,
                },
            ];
            setUserTags(updatedTags);
        }

        if (reason === 'select-option') {
            let addTag = details.option;
            const updatedTags = [...userTags, addTag];
            setUserTags(updatedTags);
        }

        if (reason === 'remove-option') {
            let delTag = details.option;
            setDeleteTags([...deleteTags, delTag]);
            let userTagsArr = [...userTags];
            let afterDel = userTagsArr.filter((e) => {
                return e.name !== delTag.name;
            });
            setUserTags(afterDel);
        }
    };

    const checkSelect = (option: any) => {
        if (userTags.some((e) => e.name === option.name)) {
            return true;
        }
        return false;
    };

    const onSubmitHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.username;

            // console.log('delete: ', deleteTags);

            await userService.deleteUserTags(username, deleteTags);
            await userService.updateUserTags(username, userTags);

            dispatch(alertActions.success('update tags succeed'));
        } catch (error) {
            dispatch(alertActions.error('update tags failed'));
        }
    };

    return (
        <Card style={{ height: '100%' }}>
            <CardHeader
                avatar={<TagIcon style={{ color: '66bb6a' }} />}
                title={<Typography variant='h6'>Modify Your Tag(s)</Typography>}
                action={
                    <ButtonGroup
                        orientation='vertical'
                        variant='outlined'
                        color='secondary'
                        style={{
                            height: '100%',
                            marginTop: theme.spacing(2),
                            marginRight: theme.spacing(2),
                        }}
                    >
                        <Button
                            style={{ textTransform: 'none' }}
                            onClick={getUserTags}
                        >
                            <RestoreIcon />
                            Refresh
                        </Button>
                        <Button
                            style={{ textTransform: 'none' }}
                            onClick={onSubmitHandler}
                        >
                            <PublishIcon />
                            Submit
                        </Button>
                    </ButtonGroup>
                }
            />
            <CardContent>
                <Grid container justify='space-around' spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id='checkboxes-tags-demo'
                            disableCloseOnSelect
                            options={options}
                            getOptionLabel={(option: any) =>
                                option.name || option
                            }
                            value={userTags}
                            onChange={onChangeHandler}
                            freeSolo
                            getOptionSelected={checkSelect}
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
                                    label='Select from existing tags or create your own'
                                    placeholder='Add...'
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
