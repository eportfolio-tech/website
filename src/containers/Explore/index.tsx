import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
} from '@material-ui/core';
import React from 'react';
import {useLocation} from 'react-router-dom';
import Layout from '../../components/Navigation';
import Deck from './cards';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwitchesGroup from './FeedCustomisationSwitchGroup';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default () => {
    const [open, setOpen] = React.useState(false);
    const [config, setConfig] = React.useState({
        zoom: false,
        layout: true,
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Layout>
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    style={{height: '70VH'}}
                >
                    <Deck zoom={config.zoom ? 1.1 : 1.0} />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Grid item xs={1}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            Customisation
                        </Button>
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
                                <SwitchesGroup
                                    config={config}
                                    changeConfig={setConfig}
                                />
                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                        autoFocus
                                    >
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
                    </Grid>
                </Grid>
                {/*</Grid>*/}
            </Container>
        </Layout>
    );
};
