import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Results from './results';
import SearchBar from './searchBar';
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

const options = ['Tags', 'Names'];

export default () => {
    const classes = useStyles();
    const [option, setOption] = useState<string | null>(options[0]);

    return (
        <div className={classes.root}>
            <SearchBar
                options={options}
                option={option}
                setOption={setOption}
            />
            <Results />
        </div>
    );
};
