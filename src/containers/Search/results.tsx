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
            paddingTop: theme.spacing(8),
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
        if (cards === undefined)
            return 'Click The Search Icon to get your result(s).';
        else return `There are ${cards.length} results`;
    };

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth='sm'>
                    {!loading ? (
                        <Typography
                            variant='h5'
                            color='textSecondary'
                            paragraph
                        >
                            {getText()}
                        </Typography>
                    ) : (
                        <Grid container>
                            <LoadingLogo style={{ width: '80%' }} />
                        </Grid>
                    )}
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
