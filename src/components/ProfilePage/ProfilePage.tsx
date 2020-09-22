import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import {makeStyles, createStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components
import AppBar from '../AppBar/AppBarLogout';
import Footer from '../Footer/AppFooter';
import Parallax from './Parallax';
import Button from '../Button/Button';
import {ButtonGroup} from '@material-ui/core';

// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        profile: {
            textAlign: 'center',
            '& img': {
                maxWidth: '160px',
                width: '100%',
                margin: '0 auto',
                transform: 'translate3d(0, -50%, 0)',
            },
        },
        description: {
            margin: '1.071rem auto 0',
            maxWidth: '600px',
            color: '#999',
            textAlign: 'center',
        },
        name: {
            marginTop: '-80px',
        },
        imgFluid: {
            maxWidth: '100%',
            height: 'auto',
        },
        imgRoundedCircle: {
            borderRadius: '50% !important',
        },
        imgRaised: {
            boxShadow:
                '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        },
        title: {
            color: '#3C4858',
            margin: '1.75rem 0 0.875rem',
            textDecoration: 'none',
            fontWeight: 700,
            fontFamily: `"Roboto Slab", "Times New Roman", serif`,
            display: 'inline-block',
            position: 'relative',
            marginTop: '30px',
            minHeight: '32px',
        },
        social: {
            align: 'centre',
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '500px',
        },
    })
);

export default function ProfilePage(props: {[x: string]: any}) {
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
