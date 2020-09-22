import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {pageService} from '../../utils/pageService';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const createProfolio = async () => {
        const userInfo = JSON.parse(localStorage.getItem('user') || '');
        const username = userInfo.user.username;
        try {
            await pageService.createPortfolio(username, {
                description: 'string',
                title: 'string',
                visibility: 'PUBLIC',
            });
            handleClose();
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
                    {'Select your template'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={createProfolio} color="primary">
                        Blank
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
