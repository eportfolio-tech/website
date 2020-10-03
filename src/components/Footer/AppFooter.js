import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: theme.palette.background.default,
        alignItems: 'center',
        //minHeight: '100vh',
        minHeight: '100%',
    },
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        alignItems: 'center',
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
}));

export default function AppFooter() {
    const classes = useStyles();

    return (
        <Typography component="footer" className={classes.root}>
            <Container className={classes.container}>
                <Grid container justify="center">
                    {/*<Grid item xs={6} sm={4} md={3}>*/}
                    {/*    <Grid*/}
                    {/*        container*/}
                    {/*        direction="column"*/}
                    {/*        justify="flex-end"*/}
                    {/*        className={classes.iconsWrapper}*/}
                    {/*        spacing={2}*/}
                    {/*    >*/}
                    {/*        <Typography variant="h6" marked="left" gutterBottom>*/}
                    {/*            Third-Party Login*/}
                    {/*        </Typography>*/}
                    {/*        <Grid item className={classes.icons}>*/}
                    {/*            <a*/}
                    {/*                href="https://facebook.com/login"*/}
                    {/*                className={classes.icon}*/}
                    {/*            >*/}
                    {/*                <img*/}
                    {/*                    src="https://comp30002.blob.core.windows.net/image/appFooterFacebook.png"*/}
                    {/*                    alt="Facebook"*/}
                    {/*                />*/}
                    {/*            </a>*/}
                    {/*            <a*/}
                    {/*                href="https://twitter.com/login"*/}
                    {/*                className={classes.icon}*/}
                    {/*            >*/}
                    {/*                <img*/}
                    {/*                    src="https://comp30002.blob.core.windows.net/image/appFooterTwitter.png"*/}
                    {/*                    alt="Twitter"*/}
                    {/*                />*/}
                    {/*            </a>*/}
                    {/*            <p>Coming Soon</p>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}

                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Helpful Link
                        </Typography>
                        <ul className={classes.list}>
                            <li className={classes.listItem}>
                                <Link href="https://www.google.com">Terms</Link>
                            </li>
                            <li className={classes.listItem}>
                                <Link href="https://www.google.com">
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
                                <Link href="https://www.google.com">
                                    What is Forty-Two
                                </Link>
                            </li>
                            <li className={classes.listItem}>
                                <Link href="https://www.google.com">
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
