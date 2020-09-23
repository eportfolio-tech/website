import React, {useState} from 'react';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import {
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Theme,
    InputBase,
    Tooltip,
    Typography,
} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import TagIcon from '@material-ui/icons/LocalOffer';
import MenuIcon from '@material-ui/icons/Menu';
import {useLocation} from 'react-router-dom';

import {Chips} from './Chips';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },

        root: {
            background: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            padding: '0px 4px',
            maxHeight: '51px',
        },
    })
);
/*
const resultCards = [
    {
        id: 413,
        title: 'test',
        username: 'test',
        userId: 0,
        content: 'lynch',
        description: 'string',
        visibility: 'PUBLIC',
        deleted: false,
        createdAt: '2020-09-09T17:40:30.000+00:00',
        updatedOn: '2020-09-09T17:40:30.000+00:00',
    },
];*/

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

interface ISearchBar {
    option: string | null;
    setOption: any;
    options: string[];
    setCards?: any;
    setLoading?: any;
}

export default ({option, setOption}: ISearchBar) => {
    const classes = useStyles();
    const query = useQuery();

    const [, setChips] = useState([]);
    const [name, setName] = useState(query.get('query'));

    /*async () => {
        try {
            setLoading(true);
            setCards(undefined);

            const results = await userService.search(name, 0, 100);

            await sleep(500);
            console.log(results);
            setCards(results.content);
            setLoading(false);
        } catch (error) {
            dispatch(
                alertActions.error(Object.values(error.response.data.data))
            );

            setLoading(false);
        }
    };*/

    return (
        <Container maxWidth="md">
            <form action={'/search'}>
                <Paper className={classes.root}>
                    {option === 'Tags' ? (
                        <TagIcon fontSize="large" />
                    ) : (
                        <TextFieldsIcon fontSize="large" />
                    )}

                    {option === 'Tags' ? (
                        <Chips setChips={setChips} />
                    ) : (
                        <InputBase
                            fullWidth
                            inputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className={classes.input}
                            placeholder="Search E-Portfolio"
                            value={name}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(event.target.value);
                            }}
                            style={{width: '100%'}}
                            name="query"
                        />
                    )}

                    <IconButton
                        color="secondary"
                        className={classes.iconButton}
                        type="submit"
                    >
                        <SearchIcon fontSize="large" />
                    </IconButton>
                    <Divider
                        className={classes.divider}
                        orientation="vertical"
                    />

                    <Tooltip
                        title={
                            <Typography variant="body1">
                                {'switch to ' +
                                    (option === 'Tags' ? 'Text' : 'Tags')}
                            </Typography>
                        }
                    >
                        <IconButton
                            className={classes.iconButton}
                            aria-label="directions"
                            onClick={() => {
                                if (option === 'Tags') {
                                    setOption('Names');
                                } else {
                                    setOption('Tags');
                                }
                            }}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Paper>
            </form>
        </Container>
    );
};
