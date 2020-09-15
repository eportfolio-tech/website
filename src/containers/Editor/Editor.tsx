import React, {useRef} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
// import {render} from 'react-dom';

import EmailEditor from 'react-email-editor';

import {Button} from '@material-ui/core';
// import {createClassExpression} from 'typescript';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(3),
        },
    })
);

const Editor = (props: any) => {
    const classes = useStyles();
    const emailEditorRef = useRef(null);
    const dispatch = useDispatch();

    const exportHtml = () => {
        (emailEditorRef.current as any).editor.exportHtml(
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
        const design = JSON.parse(localStorage.getItem('design') || '');
        (emailEditorRef.current as any).editor.loadDesign(design);
    };

    return (
        <div>
            <div>
                <EmailEditor
                    ref={emailEditorRef}
                    onLoad={onLoad}
                    minHeight={700}
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

export default Editor;
