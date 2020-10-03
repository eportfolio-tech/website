import React, {useState} from 'react';
import {Grid, IconButton, Tooltip, Typography} from '@material-ui/core';
import CloseButton from '@material-ui/icons/Close';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import MusicWave from './musicWave';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
export default ({style, src}: any) => {
    const [playing, setPlaying] = useState(true);
    const [open, setOpen] = useState(false);

    const Player = (
        <AudioPlayer
            autoPlay
            style={{
                position: 'fixed',
                top: '30%',
                left: '50%',
                maxWidth: '50VW',
                minHeight: '25VH',

                /* bring your own prefixes */
                transform: 'translate(-50%, -50%)',
                borderRadius: 10,
            }}
            header={
                <Grid container justify="flex-end">
                    <IconButton
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseButton />
                    </IconButton>
                </Grid>
            }
            src={src}
            onPlay={() => {
                setPlaying(true);
            }}
            onPause={() => {
                setPlaying(false);
            }}
            onEnded={() => {
                setPlaying(false);
            }}

            // other props here
        />
    );

    return (
        <div>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100VW',
                    height: '100VH',
                    background: 'rgba(146, 153, 151, 0.3)',
                    visibility: open ? 'visible' : 'hidden',
                }}
            >
                {Player}
                {/* <IconButton
                    style={{
                        position: 'fixed',
                        top: '17.5%',
                        left: '71%',
                    }}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseButton />
                </IconButton> */}
            </div>
            {playing ? <MusicWave /> : <div style={{height: '20px'}}></div>}
            <Tooltip
                arrow
                title={
                    <Typography variant="body1">{'Audio Player'}</Typography>
                }
                placement="left"
                interactive
            >
                <IconButton
                    onClick={() => {
                        setOpen(!open);
                    }}
                    style={style}
                    color={playing ? 'secondary' : undefined}
                >
                    <MusicNoteIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};
