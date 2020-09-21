import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';

import Typography from '../Typography/Typography';
import ProductHeroLayout from './SearchLayout';

import SearchBar from '../Search/SearchBar';

const backgroundImage =
    'https://comp30002.blob.core.windows.net/image/career.jpg';

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

const options = ['Name', 'Tag'];

function ProductHero() {
    const classes = useStyles();
    const [option, setOption] = useState<string | null>(options[0]);

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{display: 'none'}}
                src={backgroundImage}
                alt="increase priority"
            />
            <Typography
                marked="center"
                align="center"
                variant="h2"
                color="inherit"
            >
                Search E-Portfolio
            </Typography>
            <br />
            <br />
            <SearchBar
                setOption={setOption}
                option={option}
                options={options}
            />
        </ProductHeroLayout>
    );
}

export default ProductHero;
