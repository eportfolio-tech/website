import React, {useEffect, useState} from 'react';

import {TextField, CircularProgress, Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';
import {Autocomplete} from '@material-ui/lab';
import TagType from './TagType';
import {useDispatch} from 'react-redux';
import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            width: '1.2em',
            height: '1.2em',
        },
        root: {
            background: theme.palette.background.default,
            borderRadius: 10,
            width: '95%',
        },
    })
);

interface ITagInput {
    setInput: any;
    style?: any;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default ({setInput, style}: ITagInput) => {
    const classes = useStyles();
    const query = useQuery();
    const queryTag = query.get('tag');
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<TagType[]>([]);
    const [selected, setSelected] = useState<string>(queryTag ? queryTag : '');

    const loading = open && options.length === 0;

    /*
    const getIcon = (type: string | null) => {
        switch (type) {
            case 'person':
                return <FaceIcon className={classes.icon} />;

            default:
                return (
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                        #
                    </Typography>
                );
        }
    };
    
    const getColor = (type: string) => {
        switch (type) {
            case 'person':
                return 'secondary';

            default:
                return 'primary';
        }
	};*/

    const fetchChips = async (active: boolean) => {
        try {
            if (active) {
                setSelected('');
                const tags = await userService.getAllTags();
                await sleep(500);
                setOptions(tags.tag);
            }
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        fetchChips(active);

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <Autocomplete
            fullWidth
            className={classes.root}
            id="size-small-filled-multi"
            size="small"
            open={open}
            style={style}
            onOpen={() => {
                setOpen(true);
                //setSelected('');
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={options}
            inputValue={selected}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            onChange={(event: any, value: TagType | null) => {
                if (!value) {
                    setInput('');
                    setSelected('');
                    return;
                }
                setInput(value.name);
                setSelected(value.name);
            }}
            onInputChange={(event, newInputValue) => {
                if (!newInputValue) return;
                setInput(newInputValue);
                setSelected(newInputValue);
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        margin="none"
                        variant="outlined"
                    />
                );
            }}
        />
    );
};
