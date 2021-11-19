import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Grid } from '@material-ui/core';
import * as eventsTime from '../../../constants/eventsTime';
import cn from 'classnames';
class NavTimes extends Component {
    render() {
        const { classes, toggled } = this.props;
        return (
            <Grid item className={classes.listItem}>
                <select
                    className={cn(classes.select, {
                        [classes.selectDark]: toggled === true,
                        [classes.selectWhite]: toggled === false,
                    })}
                >
                    {eventsTime.TIME_DAY.map((e, index) => {
                        return (
                            <option key={index} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>
                <select
                    className={cn(classes.select, {
                        [classes.selectDark]: toggled === true,
                        [classes.selectWhite]: toggled === false,
                    })}
                >
                    {eventsTime.EVENTS_TYPE.map((e, index) => {
                        return (
                            <option key={index} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>
                <select
                    className={cn(classes.select, {
                        [classes.selectDark]: toggled === true,
                        [classes.selectWhite]: toggled === false,
                    })}
                >
                    {eventsTime.CATEGORIES.map((e, index) => {
                        return (
                            <option key={index} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>
            </Grid>
        );
    }
}

export default withStyles(styles)(NavTimes);
