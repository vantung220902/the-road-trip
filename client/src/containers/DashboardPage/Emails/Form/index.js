import React, { Component } from 'react';
import styles from '../../../../components/Payments/styles';
import renderTextField from '../../../../components/FormHelper/TextField';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import {
    Grid,
    withStyles,
    Typography, Button, Box
} from '@material-ui/core';
class FormTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avt: "",
            email: "",

        }
    }
    required = (value) => {
        let error = 'Please Enter';
        if (
            value !== null &&
            typeof value !== 'undefined'
        ) {
            error = null;
        }
        return error;
    };
    handleChangUser = (e) => {
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const email = optionElement.getAttribute('data-email');
        const avt = optionElement.getAttribute('data-avt');
        this.setState({ email: email, avt: avt });
    }

   
    onHandleSubmit = (value) => {
        const { handleSendEmail, email } = this.props;

        handleSendEmail(value, email);
    }

    render() {
        const { classes, invalid, submitting, handleSubmit } = this.props;
        return (
            <div className={classes.app}>
                <form onSubmit={handleSubmit(this.onHandleSubmit)}>
                    <Grid container spacing={4} className={classes.form}>

                        <Grid item md={12}>
                            <Typography>Subject</Typography>
                            <Field
                                id="subject"
                                label="Subject"
                                className={classes.textField}
                                margin="dense"
                                name="subject"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Typography>Text</Typography>
                            <Field
                                id="text"
                                label="Your text"
                                className={classes.textField}
                                margin="dense"
                                name="text"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Grid container className={classes.containerBtn}>
                                <Box mr={2}>
                                    <Button
                                        disabled={invalid || submitting}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={classes.btn}
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}
FormTransaction.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};

const createReduxForm = reduxForm({ form: 'formEmail' });
export default compose(
    withStyles(styles),
    createReduxForm,
)(FormTransaction);
