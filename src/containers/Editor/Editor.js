import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {pageService} from '../../utils/pageService';
import Paper from "@material-ui/core/Paper";
import Icon from '@material-ui/core/Icon';
import MyHTML from './MyHtml';
import AlertDialog from './AlertDialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TextField from '@material-ui/core/TextField';
import PreviewPopOver from "../../components/Preview/PreviewPopOver";
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [portfolio, setPortfolio] = useState();
    const [editorState, setEditorState] = useState(
        BraftEditor.createEditorState(null)
    );

    const [html, setHtml] = useState(null);
    const [showHtml, setShowHtml] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user') || '');
        const username = userInfo.user.username;

        // Check if user has a portfolio
        pageService
            .getPortfolio(username)
            .then((data) => {
                // console.log('portfolio: ', data.portfolio);
                setPortfolio(data.portfolio);
                setEditorState(
                    BraftEditor.createEditorState(
                        data.portfolio.content !== null
                            ? data.portfolio.content.jsonPayload
                            : null
                    )
                );
            })
            .catch((error) => {
                console.log(error);
                setPortfolio(null);
            });
    }, []);

    const handleChange = (editorState) => {
        setEditorState(editorState);
    };

    const onSaveHandlerRemote = async () => {
        try {
            const rawJSON = editorState.toRAW(true);
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.user.username;
            await pageService.putContent(username, rawJSON);
            dispatch(alertActions.success('Save succeed'));
        } catch (error) {
            dispatch(alertActions.error('Put data failed'));
        }
    };

    const renderHTML = () => {
        const htmlString = editorState.toHTML();
        setHtml(htmlString);
        setShowHtml(true);
    };

    return (
        <Paper>
            <TextField
                id="standard-full-width"
                label="Title"
                style={{ margin: 5 }}
                placeholder="My Portfolio"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Grid container
                  direction={"row"}
                  spacing={1}
                  justify={"flex-end"}
                  alignItems={"flex-start"}>

                <Grid item >
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={onSaveHandlerRemote}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item>
                    <PreviewPopOver render={renderHTML} html={html} />
                </Grid>
            </Grid>
            {portfolio === null ? (
                <div>
                    <AlertDialog />
                </div>
            ) : (
                <div>
                    <BraftEditor
                        value={editorState}
                        onChange={handleChange}
                        language="en"
                    />
                </div>
            )}
        </Paper>
    );
};
