import React from 'react';

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Hidden,
    Link,
    Typography,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import IContent from './IContent';
import logoImage from '../../assets/logo.svg';

//import {useSelector} from 'react-redux';
//import {IRootState} from '../../index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginRight: theme.spacing(2),
        },
        card: {
            display: 'flex',
        },
        cardDetails: {
            flex: 1,
        },
        cardMedia: {
            width: 160,
        },
    })
);

interface IResultCard {
    content: IContent;
}

export default ({content}: IResultCard) => {
    const classes = useStyles();
    //const history = useHistory();

    return (
        <Link
            style={{textDecoration: 'none'}}
            href={'/portfolio/' + content.username}
        >
            <CardActionArea>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {content.title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {content.username}
                            </Typography>

                            <Typography variant="subtitle1" paragraph>
                                {content.description}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{color: '#16a2e0'}}
                            >
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia
                            className={classes.cardMedia}
                            image={logoImage}
                            title={'?'}
                        />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Link>
    );
};
