import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Fab,
} from '@material-ui/core';
import React from 'react';

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
                <DialogTitle id="form-dialog-title">
                    Feed Customisation
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    To subscribe to this website, please enter your email address here. We will send updates*/}
                    {/*    occasionally.*/}
                    {/*</DialogContentText>*/}
                    {/*<PrettoSlider />*/}
                    <SwitchesGroup config={config} changeConfig={setConfig} />
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
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
