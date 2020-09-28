import {Button, Container, Dialog, DialogContent, Grid} from '@material-ui/core';
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

    const marks = [
        {
            value: 1,
            label: '100%',
        },
        {
            value: 1.1,
            label: '110%',
        },
        {
            value: 1.2,
            label: '120%',
        },
    ];

    return (
        <Layout>
            <Container>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{height: '70VH'}}
                >
                    {/*<Grid item  xs={11}>*/}
                    <Deck zoom={config.zoom ? 1.1 : 1.0}/>
                    {/*</Grid>*/}

                </Grid>
                {/*<Grid xs={1}>*/}
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Grid item xs={1}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Customisation
                        </Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Feed Customisation</DialogTitle>
                            <DialogContent>
                                {/*<DialogContentText>*/}
                                {/*    To subscribe to this website, please enter your email address here. We will send updates*/}
                                {/*    occasionally.*/}
                                {/*</DialogContentText>*/}
                                {/*<PrettoSlider />*/}
                                <SwitchesGroup config={config} changeConfig={setConfig}/>
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
