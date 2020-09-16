import React, {useRef} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
// import {render} from 'react-dom';

import EmailEditor from 'react-email-editor';

import {Button} from '@material-ui/core';
// import {createClassExpression} from 'typescript';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(3),
        },
    })
);

export default (props: any) => {
    const classes = useStyles();
    const emailEditorRef = useRef(null);
    const dispatch = useDispatch();

    const exportHtml = () => {
        // Notice the difference btween this version (1.0.0 and the latest 1.1.1)
        // Use emailEditorRef.current instead of emailEditorRef.current.editor
        (emailEditorRef.current as any).exportHtml(
            (data: {design: any; html: any}) => {
                const {design, html} = data;
                // console.log('exportHtml', html);
                // console.log('design', design);
                localStorage.setItem('html', html);
                localStorage.setItem('design', JSON.stringify(design));
                dispatch(alertActions.success('Save succeed'));
            }
        );
    };

    const onLoad = () => {
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        const saved = JSON.parse(localStorage.getItem('design') || '');
        (emailEditorRef.current as any).loadDesign(saved);
    };

    return (
        <div>
            <div className="App">
                <EmailEditor
                    ref={emailEditorRef}
                    minHeight={700}
                    onLoad={onLoad}
                />
            </div>

            <div className={classes.button}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={exportHtml}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};
