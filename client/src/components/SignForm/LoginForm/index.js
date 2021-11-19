import {
    Box,
    Button,
    Grid,
    withStyles,
    Typography,
    Link,
} from '@material-ui/core';
import React, { Component } from 'react';
import styles from '../RegisterForm/styles';
import renderTextField from '../../FormHelper/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
class LoginForm extends Component {
    required = (value) => {
        let error = 'Please Enter Email or Password';
        if (
            value !== null &&
            typeof value !== 'undefined' &&
            value.trim() !== ''
        ) {
            error = null;
        }
        return error;
    };
    minLength = (value) => {
        let error = null;
        if (value.length < 5) {
            error = 'Min length must be 5 characters';
        }
        return error;
    };
    render() {
        const { classes, handleSubmit, invalid, submitting, onHandleSubmit } =
            this.props;
        return (
            <div className={classes.app}>
                <div className={classes.img}>
                    <Typography
                        className={classes.heading}
                        style={{ color: 'white' }}
                    >
                        Hello, friend!
                    </Typography>
                    <Typography
                        className={classes.text}
                        style={{ color: 'white' }}
                    >
                        enter your personal details and start journey with us
                    </Typography>
                    <Box mr={2}>
                        <Button
                            variant="contained"
                            className={classes.btnItem}
                            style={{ opacity: 0.8 }}
                            type="submit"
                            mr={2}
                        >
                            <NavLink to="/register" className={classes.nav}>
                                Register
                            </NavLink>
                        </Button>
                    </Box>
                </div>
                <div className={classes.left}>
                    <Typography className={classes.heading}>
                        Sign in to
                        <br />
                        The Road Trip
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
                        Or use your email acc
                    </Typography>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Grid container spacing={4} className={classes.form}>
                            <Grid item md={12} xs={12}>
                                <Typography>Your Email</Typography>
                                <Field
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    margin="dense"
                                    name="email"
                                    type="email"
                                    component={renderTextField}
                                    validate={this.required}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <div className={classes.password}>
                                    <Typography>Password</Typography>
                                    <Link href="#" className={classes.link}>
                                        Forgot your password ?
                                    </Link>
                                </div>

                                <Field
                                    id="password"
                                    label="5 + character"
                                    className={classes.textField}
                                    multiple
                                    rowsMax="4"
                                    margin="dense"
                                    name="password"
                                    type="password"
                                    component={renderTextField}
                                    validate={[this.required, this.minLength]}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Grid
                                    container
                                    className={classes.containerBtn}
                                >
                                    <Box mr={2}>
                                        <Button
                                            className={classes.btnItem}
                                            disabled={invalid || submitting}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }
}
LoginForm.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};
const mapStateToProps = (state) => {
    return {};
};

const withConnect = connect(mapStateToProps, null);
const createReduxForm = reduxForm({ form: 'sign' });
export default compose(
    withConnect,
    withStyles(styles),
    createReduxForm,
)(LoginForm);
