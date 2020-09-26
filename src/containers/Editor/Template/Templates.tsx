import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import {Grid, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

const options = ['Blank', 'Blank', 'Blank', 'Blank'];

export default function SimpleListMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography
                        style={{marginTop: 20}}
                        align="center"
                        variant="body1"
                    >
                        Chosen Template :
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <List component="nav" aria-label="Device settings">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="chosen Template"
                            onClick={handleClickListItem}
                        >
                            <ListItemIcon>
                                <FormatPaintIcon />
                            </ListItemIcon>
                            <ListItemText primary={options[selectedIndex]} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        <ListItem>
                            <ListItemIcon>
                                <FormatPaintIcon />
                            </ListItemIcon>
                            <ListItemText> {option}</ListItemText>
                        </ListItem>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
