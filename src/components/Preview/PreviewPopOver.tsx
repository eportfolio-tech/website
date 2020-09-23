import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import MyHTML from "../../containers/Editor/MyHtml";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(1),
        },
        popover: {
            width: '100%'
        }
    }),
);

export default function PreviewPopOver(props: { render: () => void; html: any; }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.render();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                onClick={handleClick}
                startIcon={<VisibilityIcon />}
            >
                Preview
            </Button>
            <Popover
                id={id}
                open={open}
                className={classes.popover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MyHTML html={props.html} />
            </Popover>
        </div>
    );
};