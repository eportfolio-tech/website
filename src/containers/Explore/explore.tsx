import React, { useState } from 'react';
import Results from '../Search/results';
import SearchBar from '../Search/searchBar';
import Layout from '../../components/Navigation/layout';
import { useSpring, animated as a } from 'react-spring';
import { useLocation, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core';

const options = ['Names', 'Tags'];

export default () => {
    const [option, setOption] = useState<string | null>(options[0]);
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();

    const [flipped, setFlipped] = useState(
        location.pathname === '/explore/more'
    );
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
        opacity,
        transform: transform.interpolate((t: any) => `${t} rotateX(180deg)`),
        background: theme.palette.background.default,
        height: '50VH',
        width: '100%',
    };

    return (
        <Layout>
            <div>
                {flipped ? (
                    <a.div
                        style={moreStyle}
                        onClick={() => {
                            setFlipped(false);
                            history.push('/explore');
                        }}
                    >
                        <h1>Hi</h1>
                    </a.div>
                ) : (
                    <a.div style={searchStyle}>
                        <SearchBar
                            options={options}
                            option={option}
                            setOption={setOption}
                        />
                        <br />
                        <br />
                        <Results setFlipped={setFlipped} />
                    </a.div>
                )}
            </div>
        </Layout>
    );
};
