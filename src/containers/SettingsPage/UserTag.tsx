import React, {useState, useEffect} from 'react';
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
    Checkbox,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TagIcon from '@material-ui/icons/LocalOffer';
import PublishIcon from '@material-ui/icons/Publish';
import RestoreIcon from '@material-ui/icons/Restore';

import {useDispatch} from 'react-redux';
import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
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

    useEffect(() => {
        getAllTags();
        getUserTags();
    }, []);

    const getAllTags = async () => {
        try {
            const tags = await userService.getAllTags();
            setOptions(tags.tag);
        } catch (error) {
            dispatch(
                alertActions.error(
                    'fetch tags failed: ' +
                        Object.values(error.response.data.data)
                )
            );
        }
    };

    const getUserTags = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.user.username;

            const tags = await userService.getUserTags(username);
            setUserTags(tags.tag);
            // dispatch(alertActions.success('get tags succeed.'));
        } catch (error) {
            dispatch(
                alertActions.error(
                    'get tags failed: ' +
                        Object.values(error.response.data.data)
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
        if (userTags.some((e: {name: any}) => e.name === option.name)) {
            return true;
        }
        return false;
    };

    const onSubmitHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.user.username;

            await userService.deleteUserTags(username, deleteTags);
            await userService.updateUserTags(username, userTags);

            dispatch(alertActions.success('update tags succeed'));
        } catch (error) {
            // console.log(error.response);
            dispatch(alertActions.error('update tags failed'));
        }
    };

    return (
        <Card style={{height: '100%'}}>
            <CardHeader
                avatar={<TagIcon style={{color: '66bb6a'}} />}
                title={<Typography variant="h6">Modify Your Tag(s)</Typography>}
                action={
                    <ButtonGroup
                        orientation="vertical"
                        variant="contained"
                        color="secondary"
                        style={{
                            height: '100%',
                            marginTop: theme.spacing(2),
                            marginRight: theme.spacing(2),
                        }}
                    >
                        <Button
                            style={{textTransform: 'none'}}
                            onClick={getUserTags}
                        >
                            <RestoreIcon />
                            Refresh
                        </Button>
                        <Button
                            style={{textTransform: 'none'}}
                            onClick={onSubmitHandler}
                        >
                            <PublishIcon />
                            Submit
                        </Button>
                    </ButtonGroup>
                }
            />
            <CardContent>
                <Grid container justify="space-around" spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            disableCloseOnSelect
                            options={options}
                            getOptionLabel={(option: any) =>
                                option.name || option
                            }
                            value={userTags}
                            onChange={onChangeHandler}
                            freeSolo
                            getOptionSelected={checkSelect}
                            renderOption={(option, {selected}) => (
                                <React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{marginRight: 8}}
                                        checked={selected}
                                    />
                                    {option.name}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select from existing tags or create your own"
                                    placeholder="Add..."
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
