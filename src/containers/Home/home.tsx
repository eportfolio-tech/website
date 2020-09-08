import React, { useState } from 'react';
import Intro from './IntroAnimation.jsx';
import Layout from '../../components/Navigation/layout';
import { useTheme } from '@material-ui/core/styles';
import { useSpring, animated as a } from 'react-spring';
import SearchPage from '../Search/searchPage';
import { useHistory, useLocation } from 'react-router-dom';

export default () => {
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    const [flipped, setFlipped] = useState(location.pathname === '/search');
    const { transform, opacity }: any = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    return (
        <Layout noPadding>
            <div>
                {flipped ? (
                    <a.div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            opacity,
                            transform: transform.interpolate(
                                (t: any) => `${t} rotateX(180deg)`
                            ),
                            background: theme.palette.background.default,
                            minHeight: '100%',
                            minWidth: '100%',
                        }}
                    >
                        <SearchPage />
                    </a.div>
                ) : (
                    <a.div>
                        <Intro
                            toggle={() => {
                                setFlipped((state) => !state);
                                history.push('/search');
                            }}
                        />
                    </a.div>
                )}
            </div>
        </Layout>
    );
};
