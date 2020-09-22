import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import 'braft-editor/dist/output.css';

const useStyles = makeStyles({
    root: {
        width: 420,
        height: 594,
        textAlign: 'center',
    },
});

export default (props) => {
    // console.log(props);
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined " raised={true}>
            <CardContent>
                <div
                    className="braft-output-content"
                    dangerouslySetInnerHTML={{__html: props.html}}
                ></div>
            </CardContent>
        </Card>
    );
};
