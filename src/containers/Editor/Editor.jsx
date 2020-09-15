import 'braft-editor/dist/index.css';
import React, {useState, useEffect} from 'react';
import BraftEditor from 'braft-editor';

import Button from '@material-ui/core/Button';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/AlertActions';

// declare global {
//     interface Window {
//         previewWindow: any;
//     }
// }

// window.previewWindow = window.previewWindow || {};

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

    const handleChange = (editorState) => {
        setEditorState(editorState);
    };

    const preview = () => {
        if (window.previewWindow) {
            window.previewWindow.close();
        }

        window.previewWindow = window.open();
        window.previewWindow.document.write(buildPreviewHtml());
        window.previewWindow.document.close();
    };

    const extendControls = [
        {
            key: 'custom-button',
            type: 'button',
            text: 'Preview',
            onClick: preview,
        },
    ];

    const buildPreviewHtml = () => {
        return `
          <!Doctype html>
          <html>
            <head>
              <title>Preview Content</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 30px 20px;
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-radius: 5px;
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
              <div class="container">${editorState.toHTML()}</div>
            </body>
          </html>
        `;
    };

    return (
        <div>
            <BraftEditor
                value={editorState}
                onChange={handleChange}
                language="en"
                contentStyle={{height: 400}}
                extendControls={extendControls}
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={onSaveHandler}
            >
                Save
            </Button>
        </div>
    );
};
