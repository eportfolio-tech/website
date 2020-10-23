import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../Typography/Typography';
import 'pattern.css';
import {CssBaseline} from '@material-ui/core';

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            backgroundColor: '#bcffeb',
            overflow: 'hidden',
            color: theme.palette.background.default,
            // backgroundImage: `url(${test})`,
        },
        container: {
            marginTop: theme.spacing(10),
            marginBottom: theme.spacing(15),
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        item: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(0, 5),
            color: 'black',
            fontWeight: 100,
        },
        title: {
            marginBottom: theme.spacing(8),
            color: 'black',
            fontWeight: 550,
        },
        number: {
            color: theme.palette.secondary.main,
            fontWeight: 550,
        },
        image: {
            height: 55,
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        curvyLines: {
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
        },
        button: {
            marginTop: theme.spacing(8),
        },
    })
);

export default function HowItWorks() {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <div
                className={'pattern-diagonal-lines-sm'}
                style={{width: '100%'}}
            >
                <CssBaseline />
                <Container className={classes.container}>
                    <img
                        //src="/static/themes/onepirate/productCurvyLines.png"
                        className={classes.curvyLines}
                        alt="curvy lines"
                    />
                    <Typography
                        variant="h4"
                        marked="center"
                        className={classes.title}
                        component="h2"
                    >
                        How It Works
                    </Typography>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    className={classes.number}
                                >
                                    1.
                                </Typography>
                                <div className={classes.item}>
                                    <img
                                        src="https://comp30002.blob.core.windows.net/image/w.png"
                                        alt="suitcase"
                                        className={classes.image}
                                    />
                                    <Typography variant="h6" align="center">
                                        Create your own e-portfolio. Show
                                        yourself to the world.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    className={classes.number}
                                >
                                    2.
                                </Typography>
                                <div className={classes.item}>
                                    <img
                                        src="https://comp30002.blob.core.windows.net/image/view.png"
                                        alt="graph"
                                        className={classes.image}
                                    />
                                    <Typography variant="h6" align="center">
                                        View popular e-portfolios.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    className={classes.number}
                                >
                                    3.
                                </Typography>
                                <div className={classes.item}>
                                    <img
                                        src="https://comp30002.blob.core.windows.net/image/like.png"
                                        alt="clock"
                                        className={classes.image}
                                    />
                                    <Typography variant="h6" align="center">
                                        Like and comment your favourite
                                        e-portfolios. Click and share with your
                                        friends.
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </section>
    );
}
