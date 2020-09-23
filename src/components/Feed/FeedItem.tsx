import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from '@material-ui/icons/Face';
import Card from "@material-ui/core/Card";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

export default function FeedItem() {
    const classes = useStyles();

    return (
            <Card variant="outlined" >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Ali Connors
                                </Typography>
                                {"Ever man are put down his very. And marry may table him avoid. Hard sell it were into it upon. He forbade affixed parties of assured to me windows. Happiness him nor she disposing provision. Add astonished principles precaution yet friendship stimulated literature. State thing might stand one his plate. Offending or extremity therefore so difficult he on provision. Tended depart turned not are. \n" +
                                "\n" +
                                "Moments its musical age explain. But extremity sex now education concluded earnestly her continual. Oh furniture acuteness suspected continual ye something frankness. Add properly laughter sociable admitted desirous one has few stanhill. Opinion regular in perhaps another enjoyed no engaged he at. It conveying he continual ye suspected as necessary. Separate met packages shy for kindness. \n" +
                                "\n" +
                                "Style never met and those among great. At no or september sportsmen he perfectly happiness attending. Depending listening delivered off new she procuring satisfied sex existence. Person plenty answer to exeter it if. Law use assistance especially resolution cultivated did out sentiments unsatiable. Way necessary had intention happiness but september delighted his curiosity. Furniture furnished or on strangers neglected remainder engrossed. \n" +
                                "\n" +
                                "Put all speaking her delicate recurred possible. Set indulgence inquietude discretion insensible bed why announcing. Middleton fat two satisfied additions. So continued he or commanded household smallness delivered. Door poor on do walk in half. Roof his head the what. \n"
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Grid container
                      spacing={2}
                      justify="center"
                      alignItems="center">
                    <Grid item>
                        <Chip
                            icon={<FaceIcon />}
                            label="Share"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            icon={<FaceIcon />}
                            label="Like"
                        />
                    </Grid>
                </Grid>
            </Card>
    );
}