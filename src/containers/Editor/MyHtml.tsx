import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import 'braft-editor/dist/output.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.default,
        },
    })
);

export default (props: any) => {
    // console.log(props);
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={0}>
            <div dangerouslySetInnerHTML={{__html: props.html}}></div>
        </Card>
    );
};
