import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Theme} from '@material-ui/core/styles';

import {Typography} from '@material-ui/core';
import ProductHeroLayout from './ProductHeroLayout';

import SearchBar from '../Search/SearchBar';

const backgroundImage =
    'https://comp30002.blob.core.windows.net/image/career.jpg';

const styles = (theme: Theme) => ({
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
});

const options = ['Name', 'Tag'];

function ProductHero(props: any) {
    const {classes} = props;
    const [option, setOption] = useState<string | null>(options[0]);

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{display: 'none'}}
                src={backgroundImage}
                alt="increase priority"
            />
            <Typography align="center" variant="h2" color="inherit">
                Search E-Portfolio
                <br />
                <br />
            </Typography>
            <SearchBar
                setOption={setOption}
                option={option}
                options={options}
            />
        </ProductHeroLayout>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
