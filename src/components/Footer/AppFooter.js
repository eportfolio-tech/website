import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
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
    language: {
        marginTop: theme.spacing(1),
        width: 150,
    },
}));

export default function AppFooter() {
    const classes = useStyles();

    return (
        <Typography component="footer" className={classes.root}>
            <Container className={classes.container}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            className={classes.iconsWrapper}
                            spacing={2}
                        >
                            <Typography variant="h6" marked="left" gutterBottom>
                                Third-Party Login
                            </Typography>
                            <Grid item className={classes.icons}>
                                <a
                                    href="https://material-ui.com/"
                                    className={classes.icon}
                                >
                                    <img
                                        src="https://comp30002.blob.core.windows.net/image/appFooterFacebook.png"
                                        alt="Facebook"
                                    />
                                </a>
                                <a
                                    href="https://twitter.com/MaterialUI"
                                    className={classes.icon}
                                >
                                    <img
                                        src="https://comp30002.blob.core.windows.net/image/appFooterTwitter.png"
                                        alt="Twitter"
                                    />
                                </a>
                                <p>Coming Soon</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Helpful Link
                        </Typography>
                        <ul className={classes.list}>
                            <li className={classes.listItem}>
                                <Link href="/premium-themes/onepirate/terms/">
                                    Terms
                                </Link>
                            </li>
                            <li className={classes.listItem}>
                                <Link href="/premium-themes/onepirate/privacy/">
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            About Us
                        </Typography>
                        <ul className={classes.list}>
                            <li className={classes.listItem}>
                                <Link href="/premium-themes/onepirate/terms/">
                                    What is Forty-Two
                                </Link>
                            </li>
                            <li className={classes.listItem}>
                                <Link href="/premium-themes/onepirate/privacy/">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}
