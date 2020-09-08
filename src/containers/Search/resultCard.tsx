import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import logoImage from '../../assets/logo.svg';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginRight: theme.spacing(2),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '141.428%', // A4 size
        },
        cardContent: {
            flexGrow: 1,
        },
    })
);

export default ({ setFlipped }: any) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={logoImage}
                title='Image title'
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='h2'>
                    David Smith
                </Typography>
                <Typography>
                    David is a experienced project manager. He has worked in
                    Alibaba Cloud team for eight years.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => {
                        setFlipped(true);
                        history.push(location.pathname + '/more');
                    }}
                >
                    View
                </Button>
                <Button size='small' color='primary'>
                    Like
                </Button>
                <Button size='small' color='primary'>
                    Follow
                </Button>
            </CardActions>
        </Card>
    );
};
