import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import Button from '@material-ui/core/Button';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {pageService} from '../../utils/pageService';

import MyHTML from './MyHtml';
import AlertDialog from './AlertDialog';

export default () => {
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
        <div>
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onSaveHandlerRemote}
                    >
                        Save to remote
                    </Button>
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={renderHTML}
                    >
                        show preview
                    </Button>
                    <br />
                    <br />
                    {showHtml ? (
                        <div>
                            <div>
                                <h3>Your portfolio preview</h3>
                            </div>
                            <MyHTML html={html} />
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};
