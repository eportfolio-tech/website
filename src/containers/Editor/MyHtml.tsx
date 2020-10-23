import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import 'braft-editor/dist/output.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        defaultBackground: {
            background: theme.palette.background.default,
        },
        paperBackground: {
            background: theme.palette.background.paper,
        },
    })
);

export default (props: any) => {
    // console.log(props);
    const classes = useStyles();

    return (
        <Card
            className={
                props.defaultBackground
                    ? classes.defaultBackground
                    : classes.paperBackground
            }
            elevation={0}
        >
            <div
                className="braft-output-content"
                dangerouslySetInnerHTML={{__html: props.html}}
            ></div>
        </Card>
    );
};
