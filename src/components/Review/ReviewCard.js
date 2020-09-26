import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import moment from 'moment';

const useStyles = makeStyles(
    createStyles({
        typography: {
            textAlign: 'left',
        },
        button: {
            width: 150,
        },
        date: {
            textAlign: 'left',
            color: 'gray',
        },
        paper: {
            padding: '40px 20px',
            marginTop: 100,
        },

    }),
);

const ReviewCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={props.avatar}/>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <h4 style={{margin: 0, textAlign: 'left'}}>
                        {props.author}
                    </h4>
                    <Typography className={classes.typography}>
                        {props.content}
                    </Typography>
                    <Typography className={classes.date}>
                        {moment(props.date).fromNow()}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ReviewCard;