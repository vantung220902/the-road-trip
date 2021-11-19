import { Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles';
class ItemAvt extends Component {
    render() {
        const { classes } = this.props;
        let acc = JSON.parse(localStorage.getItem('account'));
        return (
            <NavLink to={`/me`} className={classes.app}>
                <img
                    className={classes.img}
                    src={
                        `${acc.avt}`
                    }
                    alt="Avt"
                />
                <div className={classes.text}>
                    <Typography className={classes.heading}>
                        {acc.fullName}
                    </Typography>
                    <Typography>@{acc.fullName}</Typography>
                </div>
            </NavLink>
        );
    }
}

export default withStyles(styles)(ItemAvt);
