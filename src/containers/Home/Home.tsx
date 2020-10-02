import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useSpring, animated as a} from 'react-spring';

import {useTheme} from '@material-ui/core/styles';

//import Intro from./IntroAnimation.txt/index.jssx';
import Layout from '../../components/Navigation';

export default () => {
    const theme = useTheme();
    const location = useLocation();

    const [flipped] = useState(location.pathname === '/search');
    const {transform, opacity}: any = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
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
                    ></a.div>
                ) : (
                    <a.div></a.div>
                )}
            </div>
        </Layout>
    );
};
