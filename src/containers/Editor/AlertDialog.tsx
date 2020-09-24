import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';

import {pageService} from '../../utils/pageService';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    loading: {
        textAlign: 'center',
    },
});

export default function AlertDialog() {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const createProfolio = async () => {
        setIsCreating(true);
        const userInfo = JSON.parse(localStorage.getItem('user') || '');
        const username = userInfo.user.username;
        try {
            await pageService.createPortfolio(username, {
                description: null,
                title: null,
                visibility: 'PUBLIC',
            });
            await delay(2000);
            handleClose();
            window.location.reload(false);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Welcome to your E-portfolio!'}
                </DialogTitle>
                {isCreating ? (
                    <div className={classes.loading}>
                        <br />
                        <br />
                        <CircularProgress />
                        <br />
                        <br />
                    </div>
                ) : (
                    <div>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Create your own E-portfolio by selecting a
                                template or starting from stretch
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={createProfolio} color="primary">
                                Blank Page
                            </Button>
                            <br />
                            <Button
                                onClick={() => {
                                    history.push('/explore');
                                }}
                                color="primary"
                            >
                                Just Browsing
                            </Button>
                        </DialogActions>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
