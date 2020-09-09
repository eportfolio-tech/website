import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';

export default class PageDemo extends React.Component {
    state = {
        editorState: BraftEditor.createEditorState(null),
    };

    render() {
        return (
            <BraftEditor
                value={this.state.editorState}
                onChange={this.handleChange}
                language='en'
            />
        );
    }

    handleChange = (editorState) => {
        this.setState({ editorState });
    };
}
