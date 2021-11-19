import React, { Component } from 'react'
import renderTextField from '../../FormHelper/TextField';
import { Box, Button, Grid, Typography, withStyles } from '@material-ui/core';
import { Field } from 'redux-form';
import styles from './styles';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        };
    }
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
    isEmail = (value) => {
        let error = null;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    };
    isPassword = (value) => {
        this.setState({ password: value });
    };
    rePassword = (value) => {
        let error = null;
        const { password } = this.state;
        if (value !== password) {
            error = 'Must be the same as the password';
        }
        return error;
    };
    render() {
        const { classes, handleSubmit, invalid, submitting, onHandleSubmit } =
            this.props;
        return (
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <Grid container spacing={4} className={classes.form}>
                    <Grid item md={12} xs={12}>
                        <Typography>Full Name</Typography>
                        <Field
                            id="name"
                            label="Full name"
                            className={classes.textField}
                            margin="dense"
                            name="name"
                            component={renderTextField}
                            validate={this.required}
                        />
                    </Grid>
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
                            validate={[this.required, this.isEmail]}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Typography>Password</Typography>
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
                            validate={[
                                this.required,
                                this.minLength,
                                this.isPassword,
                            ]}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Typography>Re-Password</Typography>
                        <Field
                            id="re-password"
                            label="Your password"
                            className={classes.textField}
                            multiple
                            rowsMax="4"
                            margin="dense"
                            name="re-password"
                            type="password"
                            component={renderTextField}
                            validate={[
                                this.required,
                                this.minLength,
                                this.rePassword,
                            ]}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid
                            container
                            className={classes.containerBtn}
                        >
                            <Box className={classes.btnItem} mr={2}>
                                <Button
                                    disabled={invalid || submitting}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={classes.btnItem}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        )
    }
}
const createReduxForm = reduxForm({ form: 'sign' });
export default compose(
    withStyles(styles),
    createReduxForm)(FormRegister);