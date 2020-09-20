// Import React dependencies.
import React, {useEffect, useMemo, useState} from 'react';
// Import the Slate editor factory.
import {createEditor} from 'slate';

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react';

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

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => {
                setValue(value);
                const content = JSON.stringify(value);
                localStorage.setItem('content', content);
            }}
        >
            <Editable />
        </Slate>
    );
};
