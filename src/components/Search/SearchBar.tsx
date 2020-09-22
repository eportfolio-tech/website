import React, {useState} from 'react';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import {
    Container,
    Grid,
    MenuItem,
    Button,
    InputAdornment,
    useTheme,
} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';

import {useLocation, useHistory} from 'react-router-dom';

import {TextField} from '@material-ui/core';

import {Chips} from './Chips';

const useStyles = makeStyles(() =>
    createStyles({
        chip: {
            fontSize: 45,
            fontWeight: 'bold',
            borderRadius: 40,
            height: '100%',
        },
        icon: {
            width: '1em',
            height: '1em',
        },
        searchButton: {
            height: '100%',
            textTransform: 'none',
            fontWeight: 550,
            fontFamily: 'Arial',
            color: 'white',
            borderRadius: 10,
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

export default ({option, setOption, options}: ISearchBar) => {
    const classes = useStyles();
    const query = useQuery();
    const theme = useTheme();
    const history = useHistory();

    const [chips, setChips] = useState([]);
    const [name, setName] = useState(query.get('query'));

    const handleSearch = () => {
        history.push('/search?query=' + name);
    };
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
            <Grid container spacing={1} justify="center">
                <Grid item xs={8}>
                    {option === 'Tags' ? (
                        <Chips setChips={setChips} />
                    ) : (
                        <TextField
                            variant="outlined"
                            size="medium"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color="secondary"
                            style={{
                                background: theme.palette.background.default,
                                borderRadius: 10,
                            }}
                            value={name}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(event.target.value);
                            }}
                        />
                    )}
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id="select-search-by"
                        select
                        value={option}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setOption(event.target.value);
                        }}
                        style={{
                            background: theme.palette.background.default,
                            borderRadius: 10,
                        }}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        color="secondary"
                        className={classes.searchButton}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            if (option === 'Tags') {
                                console.log(chips);
                            } else {
                                console.log(name);
                            }
                            handleSearch();
                        }}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
