import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import Typography from '../Typography/Typography';
import ProductHeroLayout from './SearchLayout';

import SearchBar from '../Search/SearchBar';

//import backgroundImage from '../../assets/searchBackground.jpeg';

const backgrounds = [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    'https://comp30002.blob.core.windows.net/image/career.jpg',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
];

const backgroundImage =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

// const backgroundImage =
//     'https://images.unsplash.com/photo-1468434453985-b1ca3b555f00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#7fc7d9', // Average color of the background image.
            backgroundPosition: 'center',
        },
        button: {
            minWidth: 200,
        },
        h5: {
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(4),
            [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(10),
            },
        },
        more: {
            marginTop: theme.spacing(2),
        },
    })
);

function ProductHero() {
    const classes = useStyles();

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            {/* <img
                style={{display: 'none'}}
                src={backgroundImage}
                alt="increase priority"
            /> */}
            <Typography
                marked="center"
                align="center"
                variant="h2"
                color="inherit"
                style={{fontWeight: 400}}
            >
                Search E-Portfolio
            </Typography>
            <br />
            <br />

            <SearchBar />
        </ProductHeroLayout>
    );
}

export default ProductHero;
