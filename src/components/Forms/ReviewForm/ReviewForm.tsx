import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Review() {
    //   const classes = useStyles();
    const preventDefault = (event: React.SyntheticEvent) =>
        event.preventDefault();
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom align="center">
                Please check your email for varification.
            </Typography>
            <Typography gutterBottom align="center">
                <Link href="#" onClick={preventDefault} variant="body2">
                    {"Can't find the link? Click here to resend."}
                </Link>
            </Typography>
        </React.Fragment>
    );
}
