import 'braft-editor/dist/index.css';
import React, { useState, useEffect } from 'react';
import BraftEditor from 'braft-editor';

import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';

export default () => {
    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState(
        BraftEditor.createEditorState(null)
    );

    useEffect(() => {
        const raw = localStorage.getItem('raw');
        setEditorState(BraftEditor.createEditorState(raw));
    }, []);

    const onSaveHandler = () => {
        const rawJSON = editorState.toRAW(true);
        localStorage.setItem('raw', JSON.stringify(rawJSON));
        dispatch(alertActions.success('Save succeed'));
    };

    const handleChange = (editorState: any) => {
        setEditorState(editorState);
    };

    return (
        <div>
            <BraftEditor
                value={editorState}
                onChange={handleChange}
                language='en'
            />
            <Button
                variant='contained'
                color='secondary'
                onClick={onSaveHandler}
            >
                Save
            </Button>
        </div>
    );
};
