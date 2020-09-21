import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../Button/Button';
import {Typography} from '@material-ui/core';

const styles = (theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.secondary.light,
        overflow: 'hidden',
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
    },
    title: {
        marginBottom: theme.spacing(14),
    },
    number: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium,
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
});

function ProductHowItWorks(props) {
    const {classes} = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    //src="/static/themes/onepirate/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Typography
                    variant="h3"
                    marked="center"
                    className={classes.title}
                    component="h2"
                >
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <img
                                    src="https://comp30002.blob.core.windows.net/image/view.png"
                                    alt="suitcase"
                                    className={classes.image}
                                />
                                <Typography variant="h5" align="center">
                                    View popular e-portfolios.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <img
                                    src="https://comp30002.blob.core.windows.net/image/w.png"
                                    alt="graph"
                                    className={classes.image}
                                />
                                <Typography variant="h5" align="center">
                                    Create your own e-portfolio. Show yourself
                                    to the world.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <img
                                    src="https://comp30002.blob.core.windows.net/image/like.png"
                                    alt="clock"
                                    className={classes.image}
                                />
                                <Typography variant="h5" align="center">
                                    Like and comment your favourite
                                    e-portfolios. Click and share with your
                                    friends.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}

ProductHowItWorks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
