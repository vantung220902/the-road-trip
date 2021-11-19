import { Box, Button, Grid, withStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import styles from '../../FormTicket/FormCreate/styles';
import renderTextField from '../../FormHelper/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DropImg from '../../DropZone';
class FormMe extends Component {
    componentDidMount() {
        const { account } = this.props;
        if (account) {
            this.props.initialize({
                fullName: account.fullName,
                address: account.address,
                sdt: account.sdt,
                date: account.date ? account.date.toString().slice(0, 10) : null,
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { account } = this.props;
        if (prevProps.account !== account) {
            this.props.initialize({
                fullName: account.fullName,
                address: account.address,
                sdt: account.sdt,
                date: account.date ? account.date.toString().slice(0, 10) : null,
            });
        }
    }
    minLength = (value) => {
        let error = null;
        if (value.length < 5) {
            error = 'Min length must be 5 characters';
        }
        return error;
    };
    required = (value) => {
        let error = 'Please Enter Ful Name';
        if (
            value !== null &&
            typeof value !== 'undefined'
        ) {
            error = null;
        }
        return error;
    };
    UNSAFE_componentWillMount() {
        this.valueFiles = null;
    }
    onHandleChang = (value) => {
        this.valueFiles = value;
    };
    onHandleSubmit = (data) => {
        const { handleMySubmit } = this.props;
        handleMySubmit(this.valueFiles, data);
    };

    render() {
        const { classes, invalid, submitting, handleSubmit } = this.props;
        return (
            <div className={classes.app}>

                <form
                    className={classes.form}
                    onSubmit={handleSubmit(this.onHandleSubmit)}
                >
                    <Grid container spacing={4} className={classes.form}>
                        <Grid item md={12} xs={12}>
                            <Typography>Full Name </Typography>
                            <Field
                                id="name"
                                label="Full Name"
                                className={classes.textField}
                                margin="dense"
                                name="fullName"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Typography>
                                Choose Your Avatar
                            </Typography>
                            <DropImg onHandleChang={this.onHandleChang} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography>Address </Typography>
                            <Field
                                id="address"
                                label="Your Address"
                                className={classes.textField}
                                margin="dense"
                                name="address"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography>Phone</Typography>
                            <Field
                                id="sdt"
                                label="Your Phone"
                                className={classes.textField}
                                margin="dense"
                                name="sdt"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography>Date</Typography>
                            <Field
                                id="date"
                                className={classes.textField}
                                margin="dense"
                                name="date"
                                type="date"
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
                                        Update
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
FormMe.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};
const mapStateToProps = (state) => {
    return {
    };
};

const withConnect = connect(mapStateToProps, null);
const createReduxForm = reduxForm({ form: 'FormMe' });
export default compose(
    withConnect,
    withStyles(styles),
    createReduxForm,
)(FormMe);
