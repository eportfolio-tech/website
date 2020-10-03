import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
        },
        exampleWrapper: {
            position: 'relative',
            marginTop: theme.spacing(3),
            height: 380,
        },
        radioGroup: {
            margin: theme.spacing(1, 0),
        },
        speedDial: {
            position: 'fixed',
            right: '5%',
        },
        speedDialIcon: {
            //backgroundColor: theme.palette.secondary.main,
        },
    })
);

export default function SpeedDials({
    handleSave,
    handlePreview,
    handlePrint,
    handleTemplate,
    handleUpload,
}: any) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const actions = [
        {icon: <SaveIcon />, name: 'Save', handle: handleSave},
        {icon: <PrintIcon />, name: 'Print', handle: handlePrint},
        {icon: <VisibilityIcon />, name: 'Preview', handle: handlePreview},
        {icon: <FormatPaintIcon />, name: 'Template', handle: handleTemplate},
        {icon: <PublishIcon />, name: 'UploadTemplate', handle: handleUpload},
    ];

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            icon={<ExpandMoreIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
            FabProps={{style: {background: '#13a87c'}}}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                        action.handle();
                        handleClose();
                    }}
                    style={{width: '30rem', height: '30rem'}}
                    FabProps={{style: {width: '3rem', height: '3rem'}}}
                />
            ))}
        </SpeedDial>
    );
}
