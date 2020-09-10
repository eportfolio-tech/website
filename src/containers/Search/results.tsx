import React from 'react';
import { Grid, Typography, Container, Grow } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from './resultCard';
import LoadingLogo from '../../assets/loadingLogo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heroContent: {
            backgroundColor: theme.palette.background.default,
        },

        cardGrid: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(8),
        },

        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6),
        },
    })
);

interface IResults {
    setFlipped: any;
    loading: boolean;
    cards?: number[];
}

export default ({ setFlipped, loading, cards }: IResults) => {
    const classes = useStyles();

    const getText = () => {
        if (loading) return 'Loading...';
        if (cards === undefined)
            return 'click search icon to start search';
        else return `There are ${cards.length} result(s).`;
    };

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth='sm'>
                    <Typography
                        variant='h5'
                        color='textSecondary'
                        paragraph
                        align='center'
                    >
                        {getText()}
                    </Typography>
                    {loading ? (
                        <Grid container>
                            <LoadingLogo style={{ width: '80%' }} />
                        </Grid>
                    ) : null}
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth='md'>
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards !== undefined
                        ? cards.map((card) => (
                              <Grow
                                  in={cards !== undefined}
                                  timeout={card * 200}
                              >
                                  <Grid item key={card} xs={12} sm={6} md={4}>
                                      <Card setFlipped={setFlipped}></Card>
                                  </Grid>
                              </Grow>
                          ))
                        : null}
                </Grid>
            </Container>
        </div>
    );
};
