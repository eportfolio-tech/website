import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    feed: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    feedItem: {
        marginTop: '15px',
        width: '100%',
        padding: '5px',
        maxWidth: '800px'
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

})

class FeedItem extends Component {
    state = {elevation: 2}
    render() {
        const {classes} = this.props;
        return (
            <Paper
                className={classes.feedItem}
                elevation={this.state.elevation}
                onMouseOver={() => this.setState( {elevation: 6} )}
                onMouseOut={() => this.setState( {elevation:2} ) }
            >
                <h1>Im a feed item</h1>
                <p>Lots of fun here</p>
                <div className={classes.buttons}>
                    <Button raised color="primary" onClick={this.props.onClick}>Primary</Button>
                    <Button raised color="accent" onClick={this.props.onClick}>Secondary Button</Button>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(FeedItem)