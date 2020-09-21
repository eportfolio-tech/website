// Import React dependencies.
import React, {useMemo, useState, useCallback} from 'react';

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react';
import {createEditor} from 'slate';

import {Button} from '@material-ui/core';

import {DefaultElement} from './Elements/DefaultElement';
import {CodeElement} from './Elements/CodeElement';
import {Leaf} from './Leaf/Leaf';

import {CustomEditor} from './CustomEditor';

export default () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    // Update the initial content to be pulled from Local Storage if it exists.
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem('content')) || [
            {
                type: 'paragraph',
                children: [{text: 'A line of text in a paragraph.'}],
            },
        ]
    );

    const onSaveHandler = () => {
        const content = JSON.stringify(value);
        localStorage.setItem('content', content);
    };

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <div>
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => {
                    setValue(value);
                }}
            >
                <div>
                    <button
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                        }}
                    >
                        Bold
                    </button>
                    <button
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                        }}
                    >
                        Code Block
                    </button>
                </div>
                <Editable
                    editor={editor}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return;
                        }

                        switch (event.key) {
                            case '`': {
                                event.preventDefault();
                                CustomEditor.toggleCodeBlock(editor);
                                break;
                            }

                            case 'b': {
                                event.preventDefault();
                                CustomEditor.toggleBoldMark(editor);
                                break;
                            }
                        }
                    }}
                />
            </Slate>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={onSaveHandler}
            >
                Save
            </Button>
        </div>
    );
};
