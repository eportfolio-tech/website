import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import {Card, Container, Divider, Grid, Avatar} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Typed from 'react-typed';

import MyHTML from '../../containers/Editor/MyHtml';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // backgroundColor: theme.palette.background.paper,
        },
        profile: {
            textAlign: 'center',
            '& img': {
                maxWidth: '160px',
                width: '100%',
            },
            marginTop: theme.spacing(10),
        },
        description: {
            color: '#999',
            marginTop: theme.spacing(1),
        },

        avatar: {
            width: theme.spacing(7.5),
            height: theme.spacing(7.5),
        },
        divider: {
            margin: theme.spacing(5),
        },
        closeComments: {
            marginTop: theme.spacing(1),
        },
        skeletonHeader: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    })
);

export default ({portfolio, content, height}: any) => {
    const classes = useStyles();

    return (
        <Card variant={'outlined'} style={{marginRight: '7%'}}>
            {portfolio && content ? (
                <Container style={{minHeight: height + 'VH'}}>
                    <Grid container className={classes.skeletonHeader}>
                        <Grid xs={3} md={1}>
                            <Avatar
                                alt="Remy Sharp"
                                src={portfolio.avatarUrl}
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid xs={9} md={11}>
                            <Typography variant={'h5'}>
                                <Typed
                                    strings={[
                                        `I'm ${portfolio.firstName} ${portfolio.lastName}.^1500`,
                                        portfolio.title + '^2000',
                                        portfolio.username + '^500',
                                    ]}
                                    typeSpeed={80}
                                    loop
                                ></Typed>
                                {/* {`${portfolio.firstName} ${portfolio.lastName}`} */}
                            </Typography>
                            <Typography
                                variant={'body1'}
                                className={classes.description}
                            >
                                {/* <Typed
                                    strings={[portfolio.description]}
                                    typeSpeed={40}
                                ></Typed> */}
                                {portfolio.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    <div>
                        <Divider />
                        <CardContent>
                            <MyHTML html={content} />
                        </CardContent>
                    </div>
                </Container>
            ) : (
                <div>
                    <Container style={{minHeight: height + 'VH'}}>
                        <Grid
                            container
                            className={classes.skeletonHeader}
                            spacing={2}
                        >
                            <Grid xs={3} md={1}>
                                <Skeleton
                                    variant="circle"
                                    className={classes.avatar}
                                />
                            </Grid>
                            <Grid xs={9} md={11}>
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                            </Grid>
                        </Grid>
                        <Divider />
                        <br />
                        <Skeleton
                            variant="rect"
                            style={{height: height - 15 + 'VH'}}
                        />
                    </Container>
                </div>
            )}
        </Card>
    );
};
