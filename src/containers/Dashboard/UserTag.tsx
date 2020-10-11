import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Checkbox,
    Grid,
    TextField,
    useTheme,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PublishIcon from '@material-ui/icons/Publish';
import RestoreIcon from '@material-ui/icons/Restore';

import {useDispatch} from 'react-redux';
import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.default,
            height: '100%',
        },
        resetButton: {
            marginTop: theme.spacing(3),
            marginRight: theme.spacing(2),
            textTransform: 'none',
        },
        cardTitle: {
            marginTop: theme.spacing(3),
        },
        cardTitleIcon: {
            marginTop: theme.spacing(3),
        },
    })
);

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [options, setOptions] = useState<TagType[]>([]);
    const [userTags, setUserTags] = useState<TagType[]>([]);
    const [deleteTags, setDeleteTags] = useState<TagType[]>([]); // array of tag object will be deleted

    useEffect(() => {
        const getAllTags = async () => {
            try {
                const tags = await userService.getAllTags();
                setOptions(tags.tag);
            } catch (error) {
                dispatch(alertActions.error(error, 'fetch tags failed'));
            }
        };
        getAllTags();
        getUserTags();
    }, [dispatch]);

    const getUserTags = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
            const username = userInfo.user.username;

            const tags = await userService.getUserTags(username);
            setUserTags(tags.tag);
            // dispatch(alertActions.success('get tags succeed.'));
        } catch (error) {
            // dispatch(
            //     alertActions.error(
            //         'get tags failed: ' +
            //             Object.values(error.response.data.data)
            //     )
            // );
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
            const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
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
        <Card className={classes.root}>
            {/* <CardHeader
                avatar={<TagIcon className={classes.cardTitleIcon} />}
                title={
                    <Typography className={classes.cardTitle} variant="h5">
                        Tags
                    </Typography>
                }
            />
            <Divider /> */}
            <CardContent>
                <Grid container spacing={1}>
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
                                    autoComplete="off"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        <Button
                            style={{textTransform: 'none'}}
                            onClick={getUserTags}
                            variant="contained"
                            color="secondary"
                            startIcon={<RestoreIcon />}
                        >
                            Refresh
                        </Button>
                        <Button
                            style={{
                                textTransform: 'none',
                                marginLeft: theme.spacing(2),
                            }}
                            onClick={onSubmitHandler}
                            variant="contained"
                            color="secondary"
                            startIcon={<PublishIcon />}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
