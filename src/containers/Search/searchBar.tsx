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
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'absolute',
            top: '15%',
            width: '100%',
        },
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
        },
    })
);

interface ISearchBar {
    option: string | null;
    setOption: any;
    options: string[];
}

export default ({ option, setOption, options }: ISearchBar) => {
    const classes = useStyles();

    const [chips, setChips] = useState<string[]>([]);

    return (
        <Container maxWidth='md'>
            <Grid container>
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
                        variant='filled'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={8}>
                    {option === 'Tags' ? (
                        <Chips setChips={setChips} />
                    ) : (
                        <TextField variant='outlined' size='medium' fullWidth />
                    )}
                </Grid>
                <Grid item xs={2}>
                    <Button
                        color='primary'
                        className={classes.searchButton}
                        fullWidth
                        variant='contained'
                        onClick={() => {
                            console.log(chips);
                        }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
