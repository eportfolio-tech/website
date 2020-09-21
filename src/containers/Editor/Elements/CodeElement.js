import React from 'react';

export const CodeElement = (props) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};
