import React from 'react';
// nodejs library that concatenates classes

import classNames from 'classnames';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components
import AppBar from '../AppBar/AppBarLogout';
import Footer from '../Footer/AppFooter';
import Parallax from './Parallax';
import Button from '../Button/Button';

import styles from './designs';
import {ButtonGroup, IconButton} from '@material-ui/core';

// @ts-ignore
const useStyles = makeStyles(styles);

export default function ProfilePage(props: {[x: string]: any}) {
    const classes = useStyles();
    const {...rest} = props;
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
                image="https://comp30002.blob.core.windows.net/image/viewB.jpg"
            />
            <div className={classes.profile}>
                <div>
                    <img
                        src="https://comp30002.blob.core.windows.net/image/profile.png"
                        alt="..."
                        className={imageClasses}
                    />
                </div>
                <div className={classes.name}>
                    <h1 className={classes.title}>David Smith</h1>
                    <h2>(Title)</h2>
                </div>
            </div>
            <div className={classes.description}>
                <p>
                    An artist of considerable range, Chet Faker — the name taken
                    by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure.{' '}
                </p>
            </div>
            <div className={classes.social}>
                <ButtonGroup
                    color="secondary"
                    aria-label="outlined primary button group"
                >
                    <Button>Like</Button>
                    <Button>Comment</Button>
                    <Button>Share</Button>
                </ButtonGroup>
            </div>
            <Footer />
        </div>
    );
}
