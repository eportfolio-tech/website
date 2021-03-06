import React from 'react';
import {Container, Grid, Grow, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import ResultCard from './ResultCard';
import LoadingLogo from '../Loading/LoadingLogo';
import IContent from './IContent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heroContent: {
            backgroundColor: theme.palette.background.default,
        },
        cardGrid: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(8),
        },
    })
);

interface IResults {
    loading: boolean;
    cards?: IContent[];
}

export default ({loading, cards}: IResults) => {
    const classes = useStyles();

    const getText = () => {
        if (loading) return '';
        if (cards === undefined)
            return 'click search icon or enter to get your result(s).';
        else return `There are ${cards.length} result(s).`;
    };

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        paragraph
                        align="center"
                    >
                        {getText()}
                    </Typography>
                    {loading ? (
                        <LoadingLogo
                            style={{width: '60%', marginLeft: '15%'}}
                        />
                    ) : null}
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4} justify="center">
                    {cards !== undefined
                        ? cards.map((card: IContent, index: number) => (
                              <Grow
                                  in={cards !== undefined}
                                  timeout={index * 200}
                              >
                                  <Grid item key={index} xs={12}>
                                      <ResultCard content={card}></ResultCard>
                                  </Grid>
                              </Grow>
                          ))
                        : null}
                </Grid>
            </Container>
        </div>
    );
};
