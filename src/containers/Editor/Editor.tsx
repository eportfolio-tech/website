import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import {
    Button,
    CardMedia,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography,
    useTheme,
    Tooltip,
    withWidth,
    isWidthUp,
} from '@material-ui/core';

import {userService} from '../../utils/userService';
import {pageService} from '../../utils/pageService';
import {templateService} from '../../utils/templateService';
import Paper from '@material-ui/core/Paper';

import {alertActions} from '../../store/actions';
import {useDispatch} from 'react-redux';

import TemplateDialog from './Template/TemplateDialog';

import Preview from './Preview';

import Actions from './Actions';

import SaveIcon from '@material-ui/icons/Save';
import noImage from '../../assets/noImage.jpg';

export default withWidth()(({width}: any) => {
    const dispatch = useDispatch();

    const theme = useTheme();
    const largeScreen = isWidthUp('md', width);

    const [portfolio, setPortfolio] = useState<any>();
    const [editorState, setEditorState] = useState(
        BraftEditor.createEditorState(null)
    );
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [html, setHtml] = useState(null);

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [coverImage, setCoverImage] = useState('');
    const [publicFolio, setPublicFolio] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
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
                setCoverImage(data.portfolio.coverImage);
                setPublicFolio(data.portfolio.visibility === 'PUBLIC');
            })
            .catch((error) => {
                // dispatch(pageActions.loading());
                setPortfolio(null);
                if (error.response !== undefined) {
                    if (error.response.status === 404) {
                        setOpenTemplate(true);
                    } else {
                        dispatch(alertActions.error(error));
                    }
                }
            });
    }, []);

    const handleChange = (editorState: any) => {
        setEditorState(editorState);
    };

    const onSaveHandlerRemote = async () => {
        try {
            const rawJSON = editorState.toRAW(true);
            const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
            const username = userInfo.user.username;
            await pageService.putContent(username, rawJSON);
            await pageService.updatePortfolio(username, {
                title: title,
                description: description,
                visibility: publicFolio ? 'PUBLIC' : 'PRIVATE',
                coverImage: coverImage,
            });
            dispatch(alertActions.success('Save succeed'));
        } catch (error) {
            dispatch(alertActions.error(error, 'Put data failed'));
        }
    };

    const onUpload = async (file: any) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
            const username = userInfo.user.username;

            const response = await userService.uploadFile(username, file);
            dispatch(
                alertActions.success(
                    'Upload succeed, remember to save your progress'
                )
            );
            return response;
        } catch (error) {
            dispatch(alertActions.error(error, 'Upload failed'));
        }
    };

    const onUploadTemplate = async () => {
        try {
            const response = await templateService.createTemplate(
                editorState.toRAW(true),
                description,
                title
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const onSelectTemplateCallback = (selectedTemplate: any) => {
        setEditorState(BraftEditor.createEditorState(selectedTemplate));
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
                msg: 'unable to upload: ' + response,
            });
        };

        try {
            const response = await onUpload(param.file);
            successFn(response);
        } catch (error) {
            errorFn(error);
        }
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
                    rawJSON={editorState.toRAW(true)}
                    selectCallback={onSelectTemplateCallback}
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
                        handleUpload={onUploadTemplate}
                    />
                    <Preview
                        open={openPreview}
                        setOpen={setOpenPreview}
                        html={html}
                        title={title}
                        description={description}
                        coverImage={coverImage}
                    />

                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justify={largeScreen ? 'center' : 'flex-start'}
                    >
                        <Grid item xs={9}>
                            <TextField
                                id="standard-full-width"
                                // placeholder="My Portfolio"
                                variant="outlined"
                                value={title || ''}
                                onChange={(event: any) => {
                                    setTitle(event.target.value);
                                }}
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                                fullWidth
                                label="Title"
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <TextField
                                id="standard-full-width2"
                                // placeholder="Description"
                                variant="outlined"
                                value={description || ''}
                                onChange={(event: any) => {
                                    setDescription(event.target.value);
                                }}
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                                fullWidth
                                label="Description"
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <Grid container justify="center">
                                <label
                                    htmlFor="upload-photo"
                                    style={{margin: 'auto'}}
                                >
                                    <input
                                        style={{
                                            display: 'none',
                                            outline: 'none',
                                        }}
                                        id="upload-photo"
                                        name="upload-photo"
                                        type="file"
                                        accept=".png,.jpg"
                                        onChange={(event) => {
                                            console.log(event.target.files);
                                            if (event.target.files !== null) {
                                                onUpload(
                                                    event.target!.files[0]
                                                ).then((res) => {
                                                    setCoverImage(res.URI);
                                                });
                                            }
                                        }}
                                    />
                                    <Tooltip
                                        placement="top"
                                        title={
                                            <Typography variant="body1">
                                                Upload Cover Image
                                            </Typography>
                                        }
                                        arrow
                                        style={{width: '100%'}}
                                    >
                                        <Button
                                            component="span"
                                            aria-label="add"
                                            style={{width: '100%'}}
                                            fullWidth
                                        >
                                            <CardMedia
                                                image={
                                                    coverImage
                                                        ? coverImage
                                                        : noImage
                                                }
                                                title="portfolio"
                                                style={{
                                                    width: '62VW',
                                                    height: '30VH',
                                                    //paddingTop: '30.25%',
                                                }}
                                            >
                                                {/* <img
                                                    src={
                                                        coverImage
                                                            ? coverImage
                                                            : noImage
                                                    }
                                                    title="portfolio"
                                                    style={{
                                                        width: '100%',

                                                        // paddingTop: '30.25%',
                                                    }}
                                                /> */}
                                            </CardMedia>
                                        </Button>
                                    </Tooltip>
                                </label>
                            </Grid>
                        </Grid>

                        <Grid item xs={9}>
                            <Paper
                                style={{
                                    minHeight: '50VH',
                                    background:
                                        theme.palette.background.default,
                                }}
                                elevation={3}
                            >
                                <BraftEditor
                                    value={editorState}
                                    onChange={handleChange}
                                    language="en"
                                    media={{uploadFn: myUploadFn}}
                                    contentStyle={{height: 'auto'}}
                                    textBackgroundColor={true}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<SaveIcon />}
                                size="large"
                                onClick={onSaveHandlerRemote}
                                style={{display: 'inline-block'}}
                            >
                                Save
                            </Button>
                            <FormGroup
                                row
                                style={{
                                    display: 'inline-block',
                                    marginLeft: 20,
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={publicFolio}
                                            onChange={() => {
                                                setPublicFolio(!publicFolio);
                                            }}
                                        />
                                    }
                                    label="Make Public"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
});
