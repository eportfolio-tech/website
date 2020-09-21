import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components
import AppBar from '../AppBar/AppBarLogout';
import Footer from '../Footer/AppFooter';
import Button from '../Button/Button';
import GridContainer from '../ProfilePage/GridContainer';
import GridItem from '../ProfilePage/GridItem';
import Parallax from '../ProfilePage/Parallax';

import styles from '../ProfilePage/designs';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return (
        <div>
            <AppBar />
            <Parallax
                small
                filter
                image="https://comp30002.blob.core.windows.net/image/career.jpg"
            />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img
                                            src="https://comp30002.blob.core.windows.net/image/profile.png"
                                            alt="..."
                                            className={imageClasses}
                                        />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>
                                            Christian Louboutin
                                        </h3>
                                        <h6>Designer</h6>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            className={classes.button}
                                        >
                                            A
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            className={classes.button}
                                        >
                                            B
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            className={classes.button}
                                        >
                                            C
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                An artist of considerable range, Chet Faker —
                                the name taken by Melbourne-raised,
                                Brooklyn-based Nick Murphy — writes, performs
                                and records all of his own music, giving it a
                                warm, intimate feel with a solid groove
                                structure.{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
