import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../Typography/Typography';
import TextField from '../TextField';
import Button from '../Button/Button';
import {alertActions} from '../../store/actions';
import {useDispatch} from 'react-redux';

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
            backgroundColor: '#bcffeb',
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
    const dispatch = useDispatch();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setOpen(true);
        dispatch(alertActions.success('Thank you. We will contact you soon.'));
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
                                label="Email Address"
                                setState={setOpen}
                                required={true}
                            />
                            <TextField
                                noBorder
                                className={classes.textField}
                                placeholder="Your enquiry"
                                label="Your enquiry"
                                setState={setOpen}
                                required={true}
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
                            src="https://comp30002.blob.core.windows.net/image/unimelb.jpg"
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
