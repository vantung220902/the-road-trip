import React, { Component } from 'react';
import styles from './styles';
import {
    Box,
    Avatar,
    Typography,
    withStyles,
    Grid,
    IconButton,

} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
const account = JSON.parse(localStorage.getItem('account'));
class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,

        }
    }
    render() {
        const { classes, fullName, avt, person1ID, person2ID, handleMessage, check } = this.props;
        let id = -1;
        if (person1ID === account.id) {
            id = person2ID;
        } else {
            id = person1ID;
        }
        return (
            <Grid item xs={12} md={12} className={classes.app}>
                <Box className={classes.container}>
                    <Box className={classes.heading}>
                        <NavLink to={`person/${id}`}>
                            <Avatar
                                className={classes.avatar}
                                variant="rounded"
                                src={avt}
                            />
                        </NavLink>

                        <Typography className={classes.text}>
                            <b>{fullName}</b>
                        </Typography>
                    </Box>
                    {check ? null : <Box variant="text">
                        <IconButton variant="text" className={classes.btn} color="primary"
                            onClick={() => { handleMessage(id) }}>
                            <ChatIcon />
                        </IconButton>
                    </Box> }
                </Box>
            </Grid>
        );
    }
}

export default withStyles(styles)(Friend);
