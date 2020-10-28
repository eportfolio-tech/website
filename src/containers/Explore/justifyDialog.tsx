import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Grid,
    IconButton,
    Fab,
    Typography,
} from '@material-ui/core';
import React from 'react';
import {Close} from '@material-ui/icons';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwitchesGroup from './FeedCustomisationSwitchGroup';
import TuneIcon from '@material-ui/icons/Tune';

export default ({config, setConfig}: any) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Fab
                color="secondary"
                onClick={handleClickOpen}
                style={{
                    position: 'relative',
                }}
            >
                <TuneIcon />
            </Fab>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                // fullWidth={true}
                maxWidth="xs"
            >
                <DialogTitle>
                    <Grid container justify="flex-end" alignItems="center">
                        <Grid item xs={10}>
                            <Typography variant={'h6'}>
                                Feed Customization
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                style={{marginTop: 2}}
                                onClick={handleClose}
                            >
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    To subscribe to this website, please enter your email address here. We will send updates*/}
                    {/*    occasionally.*/}
                    {/*</DialogContentText>*/}
                    {/*<PrettoSlider />*/}
                    <SwitchesGroup config={config} changeConfig={setConfig} />
                </DialogContent>

                {/*<Button onClick={handleClose} color="primary">*/}
                {/*    Cancel*/}
                {/*</Button>*/}
                {/*<Button onClick={handleClose} color="primary">*/}
                {/*    Subscribe*/}
                {/*</Button>*/}
            </Dialog>
        </div>
    );
};
