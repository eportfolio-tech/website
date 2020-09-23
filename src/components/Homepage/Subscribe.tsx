import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../Typography/Typography';
import TextField from '../TextField';
import Button from '../Button/Button';

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(10),
            marginBottom: theme.spacing(10),
            display: 'flex',
        },
        cardWrapper: {
            zIndex: 1,
        },
        card: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: theme.palette.warning.main,
            padding: theme.spacing(8, 3),
        },
        cardContent: {
            maxWidth: 400,
        },
        textField: {
            width: '100%',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
        },
        button: {
            width: '100%',
        },
        imagesWrapper: {
            position: 'relative',
        },
        imageDots: {
            position: 'absolute',
            top: -67,
            left: -67,
            right: 0,
            bottom: 0,
            width: '100%',
            //background: 'url(/static/onepirate/productCTAImageDots.png)',
        },
        image: {
            position: 'absolute',
            top: -28,
            left: -28,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: 600,
        },
    })
);

function ProductCTA() {
    const classes = useStyles();
    const [, setOpen] = React.useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setOpen(true);
    };

    return (
        <Container className={classes.root} component="section">
            <Grid container>
                <Grid item xs={12} md={6} className={classes.cardWrapper}>
                    <div className={classes.card}>
                        <form
                            onSubmit={handleSubmit}
                            className={classes.cardContent}
                        >
                            <Typography
                                variant="h2"
                                component="h2"
                                gutterBottom
                                marked="center"
                            >
                                Contact Us
                            </Typography>
                            <Typography variant="h5">
                                If you have any questions, please leave your
                                email address here.
                            </Typography>
                            <TextField
                                noBorder
                                className={classes.textField}
                                placeholder="Your email"
                            />
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.button}
                            >
                                Get in Touch
                            </Button>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.imagesWrapper}>
                    <Hidden smDown>
                        <div className={classes.imageDots} />
                        <img
                            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750&q=80"
                            alt="call to action"
                            className={classes.image}
                        />
                    </Hidden>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductCTA;