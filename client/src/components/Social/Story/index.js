import { withStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import styles from '../AddStory/styles';
import { NavLink } from 'react-router-dom';
class Story extends Component {
    handleClick = (id) => {
        const { handleWatchStories } = this.props;
        handleWatchStories(id);
    }
    render() {
        const { classes, name, image, avatar, id, active } = this.props;
        return (
            <div
                onClick={() => { this.handleClick(id) }}
                className={classes.app}
                style={{ backgroundImage: `url(${image})`, border: active ? '2px solid #3f51b5' : '' }}
            >
                <div className={classes.author}>
                    <img src={avatar} className={classes.avt} alt="Avt" />

                </div>
                <NavLink to={'/#'} className={classes.container}>
                    <Typography className={classes.text}>{name}</Typography>
                </NavLink>
            </div>
        );
    }
}

export default withStyles(styles)(Story);
