import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import Button from '@material-ui/core/Button';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {pageService} from '../../utils/pageService';

export default () => {
    const dispatch = useDispatch();

    const [portfolio, setPortfolio] = useState();
    const [editorState, setEditorState] = useState(
        BraftEditor.createEditorState(null)
    );

    useEffect(() => {
        const raw = localStorage.getItem('raw');
        setEditorState(BraftEditor.createEditorState(raw));

        const userInfo = JSON.parse(localStorage.getItem('user') || '');
        const username = userInfo.user.username;

        // Check if user has a portfolio
        pageService
            .getPortfolio(username)
            .then((data) => {
                (async () => {
                    const result = await pageService.getPortfolio(username);
                    setPortfolio(result.portfolio);
                })();
                console.log('portfolio: ', portfolio);
            })
            .catch((error) => {
                console.log(error.response.status);
            });
    }, []);

    const handleChange = (editorState: any) => {
        setEditorState(editorState);
    };

    const onSaveHandler = () => {
        const rawJSON = editorState.toRAW(true);
        localStorage.setItem('raw', JSON.stringify(rawJSON));
        dispatch(alertActions.success('Save succeed'));
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

    return (
        <div>
            <BraftEditor
                value={editorState}
                onChange={handleChange}
                language="en"
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={onSaveHandler}
            >
                Save to local
            </Button>
            <br />
            <br />
            <Button
                variant="contained"
                color="secondary"
                onClick={onSaveHandlerRemote}
            >
                Save to remote
            </Button>
        </div>
    );
};
