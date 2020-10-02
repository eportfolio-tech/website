import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {alertActions, pageActions} from '../../../store/actions';
import {useDispatch} from 'react-redux';

import {pageService} from '../../../utils/pageService';
import {useHistory} from 'react-router-dom';

import Templates from './Templates';
import {templateService} from '../../../utils/templateService';

export default function AlertDialog({
    open,
    setOpen,
    portfolio,
    title,
    description,
    rawJSON,
    selectCallback,
}: any) {
    const history = useHistory();
    const [isCreating, setIsCreating] = useState(false);
    const [selectID, setSelectID] = useState(null);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const createProfolio = async () => {
        setIsCreating(true);
        const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
        const username = userInfo.user.username;
        try {
            dispatch(pageActions.loading());
            if (portfolio) {
                await pageService.putContent(username, rawJSON);
                await pageService.updatePortfolio(username, {
                    title: title,
                    description: description,
                });
            } else {
                await pageService.createPortfolio(username, {
                    description: username,
                    title: 'My E-Portfolio',
                    visibility: 'PUBLIC',
                });
            }
            await pageActions.sleep(1000);
            dispatch(alertActions.success('E-Portfolio Created'));
            setIsCreating(false);
            handleClose();
            dispatch(pageActions.loaded());
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const deleteTemplate = async () => {
        try {
            dispatch(pageActions.loading());
            await templateService.deleteTemplateById(selectID);

            await pageActions.sleep(1000);
            dispatch(alertActions.success('Template deleted'));
            handleClose();
            dispatch(pageActions.loaded());
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
                disableBackdropClick
            >
                <DialogTitle id="alert-dialog-title">
                    {portfolio
                        ? 'Overwrite your E-portfolio.'
                        : 'Welcome to your E-portfolio!'}
                </DialogTitle>

                <div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {portfolio
                                ? 'Overwrite your own E-portfolio by selecting a template.'
                                : 'Create your own E-portfolio by selecting a template.'}
                        </DialogContentText>

                        <Templates
                            selectCallback={selectCallback}
                            select={setSelectID}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={deleteTemplate}
                            disabled={isCreating}
                        >
                            Delete
                        </Button>
                        <br />
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={createProfolio}
                            disabled={isCreating}
                        >
                            {portfolio ? 'Overwrite' : 'Create'}
                        </Button>
                        <br />
                        <Button
                            disabled={isCreating}
                            onClick={() => {
                                handleClose();
                                if (portfolio == null) {
                                    history.push('/search');
                                }
                            }}
                            color="primary"
                        >
                            Cancel
                        </Button>

                        <br />
                        <br />
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
