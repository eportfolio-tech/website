import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import Button from '@material-ui/core/Button';
import {Container, Grid} from '@material-ui/core';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {userService} from '../../utils/userService';
import {pageService} from '../../utils/pageService';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import MyHTML from './MyHtml';
import AlertDialog from './AlertDialog';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TextField from '@material-ui/core/TextField';
import PreviewPopOver from '../../components/Preview/PreviewPopOver';
const useStyles = makeStyles((theme) => ({
    button: {width: 150},
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

    const onUpload = async (file) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.user.username;

            const response = await userService.uploadFile(username, file);
            dispatch(alertActions.success('Save succeed'));
            return response;
        } catch (error) {
            dispatch(alertActions.error('Save failed'));
        }
    };

    const renderHTML = () => {
        const htmlString = editorState.toHTML();
        setHtml(htmlString);
        setShowHtml(true);
    };

    const myUploadFn = async (param) => {
        const successFn = (response) => {
            // console.log(response);
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
                url: response.URI,
                meta: {
                    // id: 'xxx',
                    // title: 'xxx',
                    // alt: 'xxx',
                    loop: true, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                },
            });
        };

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.',
            });
        };

        try {
            const response = await onUpload(param.file);
            successFn(response);
        } catch (error) {
            errorFn(error);
        }

        // const progressFn = (event) => {
        //     // 上传进度发生变化时调用param.progress

        //     param.progress((event.loaded / event.total) * 100);
        // };
    };

    return (
        <Paper>
            <TextField
                id="standard-full-width"
                label="Title"
                style={{margin: 5}}
                placeholder="My Portfolio"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Grid
                container
                direction={'row'}
                spacing={1}
                justify={'flex-end'}
                alignItems={'flex-start'}
            >
                <Grid item>
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
                        media={{uploadFn: myUploadFn}}
                    />
                </div>
            )}
        </Paper>
    );
};
