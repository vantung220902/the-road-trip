import { withStyles, Typography, Button } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import AddIcon from '@material-ui/icons/Add';
class AddStory extends Component {
    render() {
        const { classes, handleClick } = this.props;
        let acc = JSON.parse(localStorage.getItem('account'));
        return (
            <div onClick={handleClick}
                className={classes.app}
                style={{
                    backgroundImage:
                        `url(${acc.avt})`,
                }}
            >
                <Button variant="text" className={classes.container}>
                    <div className={classes.content}>
                        <div className={classes.icon}>
                            <AddIcon />
                        </div>
                    </div>
                    <Typography className={classes.text}>Add Story</Typography>
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(AddStory);
