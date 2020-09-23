import React, {Component} from 'react'
import StyledFeedItem from "./FeedItem"
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    feed: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

})

class Feed extends Component {
    render() {
        const {classes} = this.props

        return (
            <div className={classes.feed}>
                <StyledFeedItem onClick={() => this.props.setTheme(0)}/>
                <StyledFeedItem onClick={() => this.props.setTheme(1)}/>
                <StyledFeedItem onClick={() => this.props.setTheme(2)}/>
        </div>
    )
    }
}

export default withStyles(styles)(Feed)