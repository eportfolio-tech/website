import React from 'react';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons';
import {useTheme} from '@material-ui/core';

//import { IconButton, Typography, Button } from '@material-ui/core';
//import SearchIcon from '@material-ui/icons/Search';

import logoImage from '../../assets/logo.svg';

// Little helpers ...
/*
const url = (name, wrap = false) =>
    `${
        wrap ? 'url(' : ''
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
        wrap ? ')' : ''
    }`;*/

export default ({toggle}) => {
    let parallax;
    const theme = useTheme();
    return (
        <div onClick={toggle}>
            <Parallax
                style={{
                    background: theme.palette.background.default,
                }}
                ref={(ref) => (parallax = ref)}
                pages={2}
            >
                <ParallaxLayer
                    offset={0}
                    speed={1}
                    style={{
                        background: theme.palette.background.default,
                    }}
                />
                <ParallaxLayer
                    offset={1}
                    speed={1}
                    style={{
                        background: theme.palette.background.default,
                    }}
                />

                <ParallaxLayer
                    offset={0.3}
                    speed={-0.3}
                    style={{pointerEvents: 'none'}}
                >
                    <img
                        alt="satellite4"
                        src={logoImage}
                        style={{width: '15%', marginLeft: '70%'}}
                    />
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={0.8} style={{opacity: 0.1}}>
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '20%',
                            marginLeft: '55%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '10%',
                            marginLeft: '15%',
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer offset={0.75} speed={0.5} style={{opacity: 0.1}}>
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '20%',
                            marginLeft: '70%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '20%',
                            marginLeft: '40%',
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={0.2} style={{opacity: 0.2}}>
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '10%',
                            marginLeft: '10%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '20%',
                            marginLeft: '75%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '30%',
                            marginLeft: '5%',
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer offset={0.6} speed={-0.1} style={{opacity: 0.4}}>
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '20%',
                            marginLeft: '60%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '25%',
                            marginLeft: '30%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '10%',
                            marginLeft: '80%',
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer offset={1.6} speed={0.4} style={{opacity: 0.6}}>
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '20%',
                            marginLeft: '5%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '15%',
                            marginLeft: '75%',
                        }}
                    />
                    <img
                        alt="cloud"
                        src={logoImage}
                        style={{
                            display: 'block',
                            width: '15%',
                            marginLeft: '5%',
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1.5}
                    speed={-0.4}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <img alt="earth" src={logoImage} style={{width: '60%'}} />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={-0.3}
                    style={{
                        backgroundSize: '80%',
                        backgroundPosition: 'center',
                        backgroundImage: logoImage,
                    }}
                />
                {/*
                    <ParallaxLayer
                        offset={0}
                        speed={0.1}
                        onClick={() => parallax.scrollTo(1)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            alt='server'
                            src={url('server')}
                            style={{ width: '20%' }}
                        />
                    </ParallaxLayer>*/}

                <ParallaxLayer
                    offset={0}
                    speed={0.1}
                    onClick={() => parallax.scrollTo(2)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img alt="bash" src={logoImage} style={{width: '30%'}} />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={-0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => parallax.scrollTo(0)}
                >
                    <img
                        alt="clients-main"
                        src={logoImage}
                        style={{width: '30%'}}
                    />
                </ParallaxLayer>
                {/*
                <ParallaxLayer
                    offset={1}
                    speed={-0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
					{
                    <Button
                        style={{
                            color: 'white',
                            background:
                                'linear-gradient(-60deg, #16a085 0%, #0d77db 100%)',
                            textTransform: 'none',
                            borderRadius: 10,
                        }}
                        onClick={toggle}
                    >
                        <SearchIcon
                            style={{
                                height: '40px',
                                width: '40px',
                            }}
                        />
                        <Typography variant='h6'>Click Me To Search</Typography>
                    </Button>
						</ParallaxLayer> */}
            </Parallax>
        </div>
    );
};
