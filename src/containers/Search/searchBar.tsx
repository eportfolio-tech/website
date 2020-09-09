import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    TextField,
    MenuItem,
    Button,
    InputAdornment,
} from '@material-ui/core';
import { Chips } from './chips';
import { Search as SearchIcon } from '@material-ui/icons';
const useStyles = makeStyles((theme) =>
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

const resultCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface ISearchBar {
    option: string | null;
    setOption: any;
    options: string[];
    setCards: any;
    setLoading: any;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default ({
    option,
    setOption,
    options,
    setCards,
    setLoading,
}: ISearchBar) => {
    const classes = useStyles();

    const [chips, setChips] = useState<string[]>([]);
    const [name, setName] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setCards(undefined);
        await sleep(2000);
        setCards(resultCards);
        setLoading(false);
    };

    return (
        <Container maxWidth='md'>
            <Grid container spacing={1} justify='center'>
                <Grid item xs={8}>
                    {option === 'Tags' ? (
                        <Chips setChips={setChips} />
                    ) : (
                        <TextField
                            variant='outlined'
                            size='medium'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary'
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
                        id='select-search-by'
                        select
                        label='Search By'
                        value={option}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setOption(event.target.value);
                        }}
                        fullWidth
                        variant='outlined'
                        color='secondary'
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
                        color='secondary'
                        className={classes.searchButton}
                        fullWidth
                        variant='contained'
                        onClick={() => {
                            if (option === 'Tags') {
                                console.log(chips);
                            } else {
                                console.log(name);
                            }
                            handleSearch();
                        }}
                    >
                        <SearchIcon fontSize='large' />
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
