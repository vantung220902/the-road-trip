import { withStyles, Box, Avatar, Typography, Button } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
class Request extends Component {
    render() {
        const { classes, avatar, name, handleAccept, handleDecline, id } = this.props;
        return (
            <div className={classes.app}>
                <Box className={classes.container}>
                    <Box className={classes.heading}>
                        <Avatar
                            className={classes.avatar}
                            variant="rounded"
                            src={avatar}
                        />
                        <Typography className={classes.text}>
                            <b>{name}</b> wants to add you to friends
                        </Typography>
                    </Box>
                    <Box className={classes.containerBtn}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="primary"
                            onClick={() => { handleAccept(id) }}
                        >
                            Accept
                        </Button>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="default"
                            onClick={() => { handleDecline(id) }}
                        >
                            Decline
                        </Button>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(Request);
