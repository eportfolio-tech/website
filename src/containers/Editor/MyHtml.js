import React from 'react';
import 'braft-editor/dist/output.css';

export default (props) => {
    // console.log(props);
    return (
        <div
            className="braft-output-content"
            dangerouslySetInnerHTML={{__html: props.html}}
        ></div>
    );
};
