import React, { Component } from 'react';
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from '@material-ui/core';
import styles from './styles';
class MessageLeft extends Component {
    render() {
        const message = this.props.message ? this.props.message : "no message";
        const timestamp = this.props.timestamp ? this.props.timestamp : "";
        const photoURL = this.props.photoURL ? this.props.photoURL : "dummy.js";
        const displayName = this.props.displayName ? this.props.displayName : "Diana";
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.messageRow}>
                    <Avatar
                        alt={displayName}
                        className={classes.orange}
                        src={photoURL}
                    ></Avatar>
                    <div>
                        <div className={classes.displayName}>{displayName}</div>
                        <div className={classes.messageBlue}>
                            <div>
                                <p className={classes.messageContent}>{message}</p>
                            </div>
                            <div className={classes.messageTimeStampRight}>{timestamp}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MessageLeft);
