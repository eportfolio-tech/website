import React, {useEffect, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import {Button, Grid} from '@material-ui/core';

// import {pageService} from '../../../utils/pageService';
import {templateService} from '../../../utils/templateService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

export default function SimpleListMenu({selectCallback, select}: any) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [templates, setTemplates] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        templateService.getAllTemplates().then((data) => {
            setOptions(
                data.templates.map((template: {title: any}) => template.title)
            );
            setTemplates(data.templates);
        });
    }, []);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        select((templates[index] as any).id);

        selectCallback((templates[index] as any).boilerplate);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        style={{marginTop: 14, marginLeft: 20}}
                        onClick={() => {
                            select(-1);
                            selectCallback(null);
                        }}
                    >
                        Blank page
                    </Button>
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

                            {selectedIndex === -1 || selectedIndex === -2 ? (
                                <ListItemText primary={'Click here'} />
                            ) : (
                                <ListItemText
                                    primary={options[selectedIndex]}
                                />
                            )}
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
                        // disabled={index === 0}
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
