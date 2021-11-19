import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
class Discussion extends Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.app}></div>;
    }
}

export default withStyles(styles)(Discussion);
