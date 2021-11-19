import { Box, Button, withStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import { NavLink } from 'react-router-dom';
import FormRegister from './form';
class RegisterForm extends Component {

    render() {
        const { classes, onHandleSubmit } = this.props;
        return (
            <div className={classes.app}>
                <div className={classes.img}>
                    <Typography
                        className={classes.heading}
                        style={{ color: 'white' }}
                    >
                        Well come back!
                    </Typography>
                    <Typography
                        className={classes.text}
                        style={{ color: 'white' }}
                    >
                        To keep connect with us please login with your personal
                        info
                    </Typography>
                    <Box mr={2}>
                        <Button
                            variant="contained"
                            className={classes.btnItem}
                            style={{ opacity: 0.8 }}
                            type="submit"
                            mr={2}
                        >
                            <NavLink to="/login" className={classes.nav}>
                                Login
                            </NavLink>
                        </Button>
                    </Box>
                </div>
                <div className={classes.left}>
                    <Typography className={classes.heading}>
                        Create Account
                    </Typography>

                    <div className={classes.iconLogin}>
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/icon/facebook.svg`}
                            alt="icon"
                            className={classes.icon}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/icon/google-plus.svg`}
                            alt="icon"
                            className={classes.icon}
                        />
                    </div>
                    <Typography className={classes.text}>
                        Or use your email for register
                    </Typography>
                    <FormRegister onHandleSubmit={onHandleSubmit} />
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(RegisterForm);
