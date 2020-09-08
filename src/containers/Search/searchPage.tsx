import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Results from './results';
import SearchBar from './searchBar';
import { useSpring, animated as a } from 'react-spring';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        chip: {
            fontSize: 45,
            fontWeight: 'bold',
            borderRadius: 40,
            height: '100%',
        },
        icon: {
            width: '1em',
            height: '1em',
        },
        searchButton: {
            height: '100%',
            textTransform: 'none',
            fontWeight: 550,
            fontFamily: 'Arial',
            color: 'white',
        },
    })
);

const options = ['Names', 'Tags'];

export default () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [option, setOption] = useState<string | null>(options[0]);

    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState<undefined | number[]>();

    const [flipped, setFlipped] = useState(location.pathname === '/more');
    const { transform, opacity }: any = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const searchStyle: React.CSSProperties = {
        opacity: opacity.interpolate((o: any) => 1 - o),
        transform,
    };

    const moreStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        opacity,
        transform: transform.interpolate((t: any) => `${t} rotateX(180deg)`),

        minHeight: '100%',
        minWidth: '100%',
    };

    return (
        <div className={classes.root}>
            {flipped ? (
                <a.div
                    style={moreStyle}
                    onClick={() => {
                        setFlipped(false);
                        history.push('/search');
                    }}
                >
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Click Anywhere to go back</h1>
                </a.div>
            ) : (
                <a.div style={searchStyle}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <SearchBar
                        options={options}
                        option={option}
                        setOption={setOption}
                        setCards={setCards}
                        setLoading={setLoading}
                    />
                    <br />
                    <br />
                    <Results
                        setFlipped={setFlipped}
                        loading={loading}
                        cards={cards}
                    />
                </a.div>
            )}
        </div>
    );
};
