import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import {Grid, Typography, useTheme} from '@material-ui/core';

import {userService} from '../../utils/userService';
import {pageService} from '../../utils/pageService';
import Paper from '@material-ui/core/Paper';

import {alertActions} from '../../store/actions/alertActions';
import {useDispatch} from 'react-redux';

import TemplateDialog from './Template/TemplateDialog';

import TextField from '@material-ui/core/TextField';

import Preview from './Preview';

import Actions from './Actions';

export default () => {
    const dispatch = useDispatch();

    const theme = useTheme();

    const [portfolio, setPortfolio] = useState<any>();
    const [editorState, setEditorState] = useState(
        BraftEditor.createEditorState(null)
    );
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [html, setHtml] = useState(null);
    // const [showHtml, setShowHtml] = useState(false);

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

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
                            ? data.portfolio.content
                            : null
                    )
                );
                setTitle(data.portfolio.title);
                setDescription(data.portfolio.description);
            })
            .catch((error) => {
                console.log(error.response);
                setPortfolio(null);
                if (error.response.status === 404) {
                    setOpenTemplate(true);
                } else {
                    dispatch(
                        alertActions.error(
                            Object.values(error.response.data.data)
                        )
                    );
                }
            });
    }, []);

    const handleChange = (editorState: any) => {
        setEditorState(editorState);
    };

    const onSaveHandlerRemote = async () => {
        try {
            const rawJSON = editorState.toRAW(true);
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.user.username;
            await pageService.putContent(username, rawJSON);
            await pageService.updatePortfolio(username, {
                title: title,
                description: description,
            });
            dispatch(alertActions.success('Save succeed'));
        } catch (error) {
            dispatch(alertActions.error('Put data failed'));
        }
    };

    const onUpload = async (file: any) => {
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
        // setShowHtml(true);
    };

    const myUploadFn = async (param: any) => {
        const successFn = (response: any) => {
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

        const errorFn = (response: any) => {
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

    if (!editorState) {
        return null;
    }

    return (
        <div>
            <div>
                <TemplateDialog
                    open={openTemplate}
                    setOpen={setOpenTemplate}
                    portfolio={portfolio}
                    title={title}
                    description={description}
                    rawJSON={BraftEditor.createEditorState(null).toRAW(true)}
                />
            </div>
            {!portfolio ? null : (
                <div>
                    <Actions
                        handleSave={onSaveHandlerRemote}
                        handlePreview={() => {
                            renderHTML();
                            setOpenPreview(true);
                        }}
                        handlePrint={() => {}}
                        handleTemplate={() => {
                            setOpenTemplate(true);
                        }}
                    />
                    <Preview
                        open={openPreview}
                        setOpen={setOpenPreview}
                        html={html}
                        title={title}
                        description={description}
                    />

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography align="center" variant="h6">
                                Title :
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                id="standard-full-width"
                                placeholder="My Portfolio"
                                variant="outlined"
                                value={title || ''}
                                onChange={(event: any) => {
                                    setTitle(event.target.value);
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography align="center" variant="h6">
                                Description :
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                id="standard-full-width2"
                                placeholder="Description"
                                variant="outlined"
                                value={description || ''}
                                onChange={(event: any) => {
                                    setDescription(event.target.value);
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography align="center" variant="h6">
                                Content :
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper
                                style={{
                                    minHeight: '50VH',
                                    background:
                                        theme.palette.background.default,
                                }}
                            >
                                <BraftEditor
                                    value={editorState}
                                    onChange={handleChange}
                                    language="en"
                                    media={{uploadFn: myUploadFn}}
                                    contentStyle={{height: 'auto'}}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};
