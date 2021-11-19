import { Button, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
class CreatePost extends Component {
    render() {
        const { classes, handleOpenForm } = this.props;
        let acc = JSON.parse(localStorage.getItem('account'));
        return (
            <div className={classes.app} onClick={handleOpenForm}>
                <div className={classes.content}>
                    <img
                        className={classes.img}
                        src={
                            acc.avt
                        }
                        alt="Anh"
                    />
                    <Typography className={classes.text}>
                        What's new, {acc.fullName}
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                >
                    <InsertLinkIcon />
                    Post
                </Button>

            </div>
        );
    }
}

export default withStyles(styles)(CreatePost);
