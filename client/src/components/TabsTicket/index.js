import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import styles from './styles';
import { withStyles } from '@material-ui/core';
class TabsTicket extends Component {
    render() {
        const { classes, icons, value, handleTabs, vector } = this.props;
        return (
            <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleTabs}
                    variant="fullWidth"
                    indicatorColor="primary"
                    orientation={vector}
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    {icons}
                </Tabs>
            </div>
        );
    }
}

export default withStyles(styles)(TabsTicket);
