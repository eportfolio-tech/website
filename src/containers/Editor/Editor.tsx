import React, {useEffect, useRef} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
// import {render} from 'react-dom';

import EmailEditor from 'react-email-editor';

import {Button} from '@material-ui/core';
// import {createClassExpression} from 'typescript';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {useState} from 'react';

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(3),
        },
    })
);

export default (props: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editor, setEditor] = useState(null);
    const [isEditorLoaded, setEditorLoaded] = useState(false);
    const [isComponentMounted, setComponentMounted] = useState(false);

    useEffect(() => {
        setComponentMounted(true);
        const saved = JSON.parse(localStorage.getItem('design') || '{}');
        if (saved.body !== undefined) {
            loadTemplate(saved);
        }
    }, [editor, isEditorLoaded, isComponentMounted]);

    const exportHtml = () => {
        // Notice the difference btween this version (1.0.0 and the latest 1.1.1)
        // Use emailEditorRef.current instead of emailEditorRef.current.editor
        (editor as any).exportHtml((data: {design: any; html: any}) => {
            const {design, html} = data;
            // console.log('exportHtml', html);
            // console.log('design', design);
            localStorage.setItem('html', html);
            localStorage.setItem('design', JSON.stringify(design));
            dispatch(alertActions.success('Save succeed'));
        });
    };

    const onLoad = () => {
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        console.log('isEditorLoaded: ', isEditorLoaded);
        console.log('isComponentMounted: ', isComponentMounted);
        const saved = JSON.parse(localStorage.getItem('design')||'{}');
        setEditorLoaded(true);
        if (saved.body !== undefined) {
            loadTemplate(saved);
        }
    };

    const loadTemplate = (saved: any) => {
        if (!isEditorLoaded || !isComponentMounted) return;
        (editor as any).loadDesign(saved);
    };

    return (
        <div>
            <div className="App">
                <EmailEditor
                    ref={(editor) => setEditor(editor as any)}
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
