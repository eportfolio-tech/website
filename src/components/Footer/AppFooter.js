import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {
    Typography,
    withWidth,
    isWidthUp,
    Divider,
    IconButton,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import WorkIcon from '@material-ui/icons/Work';
import EmailIcon from '@material-ui/icons/AlternateEmail';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    iconsWrapper: {
        height: 120,
    },
    icons: {
        display: 'flex',
    },
    icon: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.warning.main,
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    link: {
        '&:hover': {
            color: '#13a87c',
        },
    },
}));

const Heart = () => {
    return (
        <svg
            class="MuiSvgIcon-root jss396"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{fontSize: 13}}
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
    );
};

export default withWidth()(({width}) => {
    const classes = useStyles();
    const largeScreen = isWidthUp('md', width);
    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                {largeScreen ? (
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{height: '100%'}}
                        >
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Link
                                        className={classes.link}
                                        href="/terms/"
                                    >
                                        <Typography
                                            variant="body3"
                                            align="center"
                                        >
                                            Terms and Policy
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Link
                                        className={classes.link}
                                        href="/privacy/"
                                    >
                                        <Typography
                                            variant="body3"
                                            align="center"
                                        >
                                            Privacy
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Link
                                        className={classes.link}
                                        href="/aboutus/"
                                    >
                                        <Typography
                                            variant="body3"
                                            align="center"
                                        >
                                            What is Forty-Two?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}

                <Grid item xs={12} md={6} lg={4}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{height: '100%'}}
                    >
                        <Grid item xs={3}>
                            <Grid container justify="center">
                                <IconButton
                                    href={
                                        'https://github.com/Haswf/COMP30022FrontEndDev'
                                    }
                                    style={{color: '#13a87c'}}
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid
                                container
                                style={{height: '2rem'}}
                                justify="center"
                            >
                                <Divider
                                    style={{height: '2rem'}}
                                    orientation="vertical"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container justify="center">
                                <IconButton
                                    style={{color: '#ff4800'}}
                                    href={'https://mail.google.com/'}
                                >
                                    <EmailIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                            >
                                <Divider
                                    style={{height: '2rem'}}
                                    orientation="vertical"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                style={{height: '100%'}}
                            >
                                {' '}
                                <IconButton
                                    href={
                                        'https://www.seek.com.au/Forty+Two-jobs'
                                    }
                                    style={{color: '#16a2e0'}}
                                >
                                    <WorkIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {!largeScreen ? (
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{height: '100%'}}
                        >
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Link
                                        className={classes.link}
                                        href="/terms/"
                                    >
                                        <Typography
                                            variant="body3"
                                            align="center"
                                        >
                                            Terms and Policy
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Link
                                        className={classes.link}
                                        href="/privacy/"
                                    >
                                        <Typography
                                            variant="body3"
                                            align="center"
                                        >
                                            Privacy
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Link
                                        className={classes.link}
                                        href="//aboutus//"
                                    >
                                        <Typography
                                            variant="body3"
                                            align="center"
                                        >
                                            What is Forty-Two?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}

                <Grid item xs={12} lg={4}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{height: '100%'}}
                    >
                        <Typography variant="body3">
                            © 2020, made with {<Heart />} by Forty-Two for a
                            better IT Project.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
});
