import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import {
    Card,
    Container,
    Divider,
    Grid,
    Avatar,
    withWidth,
    isWidthUp,
    CardMedia,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
// @ts-ignore
import Typed from 'react-typed';

import MyHTML from '../../containers/Editor/MyHtml';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import noImage from '../../assets/noImage.jpg';
import BackupIcon from '@material-ui/icons/Backup';
// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //width: '100%',
            marginRight: '7%',
            //backgroundColor: theme.palette.background.paper,
        },
        rootSmallScreen: {
            marginRight: '7%',
            backgroundColor: theme.palette.background.default,
            borderStyle: 'none',
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

export default withWidth()(({portfolio, content, height, width}: any) => {
    const classes = useStyles();
    const largeScreen = isWidthUp('md', width);

    return (
        <Card
            variant={'outlined'}
            className={largeScreen ? classes.root : classes.rootSmallScreen}
            elevation={largeScreen ? undefined : 0}
        >
            {portfolio && content ? (
                <Container style={{minHeight: height + 'VH'}}>
                    <Grid container className={classes.skeletonHeader}>
                        <Grid xs={12} md={1}>
                            <Grid container justify="center">
                                <Avatar
                                    alt="Remy Sharp"
                                    src={portfolio.avatarUrl}
                                    className={classes.avatar}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={11}>
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
                        <br />
                        <CardMedia
                            className={classes.media}
                            image={
                                portfolio.coverImage
                                    ? portfolio.coverImage
                                    : noImage
                            }
                            title="portfolio"
                            style={{height: 0, paddingTop: '30.25%'}}
                        />

                        <CardContent>
                            <MyHTML
                                html={content}
                                //coverImage={portfolio.coverImage}
                                defaultBackground={!largeScreen}
                            />
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
});
