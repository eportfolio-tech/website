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
    Grid,
    isWidthUp,
    withWidth,
} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import TagIcon from '@material-ui/icons/LocalOffer';
import MenuIcon from '@material-ui/icons/Menu';
import {useLocation} from 'react-router-dom';

import TagInput from './TagInput';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginTop: '11px',
        },
        divider: {
            height: 33,
            // marginTop: '11px',
        },

        root: {
            background: theme.palette.background.default,
            maxHeight: '59px',
        },

        buttonGroup: {
            display: 'flex',
        },
        button: {
            flex: 1,
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

export default withWidth()(({width}: any) => {
    const classes = useStyles();
    const query = useQuery();
    const largeScreen = isWidthUp('md', width);

    const [option, setOption] = useState(query.get('tag') ? 'Tag' : 'Text');

    const [input, setInput] = useState(
        query.get('query') ? query.get('query') : query.get('tag')
    );

    return (
        <Container maxWidth="md">
            <form action={'/search'}>
                <Paper className={classes.root}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{height: '100%'}}
                    >
                        {largeScreen ? (
                            <Grid item xs={1}>
                                <Grid container justify="center">
                                    {option === 'Tag' ? (
                                        <TagIcon fontSize="large" />
                                    ) : (
                                        <TextFieldsIcon fontSize="large" />
                                    )}
                                </Grid>
                            </Grid>
                        ) : null}
                        <Grid item xs={8} md={9}>
                            <Grid
                                container
                                style={{height: '100%'}}
                                alignItems="center"
                                justify="space-around"
                            >
                                <TagInput
                                    style={{
                                        visibility:
                                            option === 'Tag'
                                                ? 'visible'
                                                : 'collapse',
                                        maxWidth:
                                            option === 'Tag' ? '85%' : '0px',

                                        height:
                                            option === 'Tag' ? '100%' : '0px',
                                    }}
                                    setInput={setInput}
                                />

                                <InputBase
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Search E-Portfolio"
                                    value={input || ''}
                                    onChange={(
                                        event: React.ChangeEvent<
                                            HTMLInputElement
                                        >
                                    ) => {
                                        setInput(event.target.value);
                                    }}
                                    name={option === 'Tag' ? 'tag' : 'query'}
                                    style={{
                                        visibility:
                                            option === 'Tag'
                                                ? 'collapse'
                                                : 'visible',
                                        maxWidth:
                                            option === 'Tag' ? '0px' : '100%',
                                        // maxHeight:
                                        //     option === 'Tag' ? '0px' : '100%',

                                        marginLeft: largeScreen ? '0px' : '6px',
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Grid
                                container
                                justify="space-around"
                                style={{height: '100%'}}
                                alignItems={'center'}
                            >
                                <Grid item xs={5}>
                                    <Grid container justify="center">
                                        <IconButton
                                            color="secondary"
                                            type="submit"
                                        >
                                            <SearchIcon
                                                fontSize={
                                                    largeScreen
                                                        ? 'large'
                                                        : undefined
                                                }
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container justify="center">
                                        <Divider
                                            className={classes.divider}
                                            orientation="vertical"
                                            flexItem
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid container justify="center">
                                        <Tooltip
                                            arrow
                                            title={
                                                <Typography variant="body1">
                                                    {'switch to ' +
                                                        (option === 'Tag'
                                                            ? 'Text'
                                                            : 'Tag')}
                                                </Typography>
                                            }
                                        >
                                            <IconButton
                                                aria-label="directions"
                                                onClick={() => {
                                                    setInput('');
                                                    if (option === 'Tag') {
                                                        setOption('Text');
                                                    } else {
                                                        setOption('Tag');
                                                    }
                                                }}
                                            >
                                                <MenuIcon
                                                    fontSize={
                                                        largeScreen
                                                            ? 'large'
                                                            : undefined
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </Container>
    );
});
