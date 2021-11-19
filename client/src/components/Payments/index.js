import {
    Box,
    Button,
    Grid,
    withStyles,
    Typography,
    Stepper,
    Step,
    StepLabel,
} from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import renderTextField from '../FormHelper/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
const account = JSON.parse(localStorage.getItem('account'));
const steps = ['Customer Information', 'Billing info'];
class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            skipped: new Set(),
            number: 1,
            sum: 0,
            time: null,
        };
    }
    componentDidMount() {
        if (account) {
            this.props.initialize({
                name: account.fullName,
                phone: account.sdt,
                address: account.address,
            });
        }
    }
    isStepOptional = (step) => {
        return step === 1;
    };
    isStepSkipped = (step) => {
        const { skipped } = this.state;
        return skipped.has(step);
    };
    handleNext = () => {
        let newSkipped = this.state.skipped;
        const { activeStep } = this.state;
        if (this.isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped: newSkipped,
        });
    };
    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({ activeStep: activeStep - 1 });
    };
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
    maxTickets = (value) => {
        let error = null;
        const { ticket } = this.props;
        const { sum } = ticket;
        if (value > sum) {
            error = `Maximum number of ticket is ${sum} characters`;
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
    renderFormFirst = () => {
        const { classes } = this.props;
        let xhtml = (
            <Grid container spacing={4} className={classes.form}>
                <Grid item md={12}>
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
                <Grid item md={12}>
                    <Typography>Phone Number</Typography>
                    <Field
                        id="phone"
                        label="Phone Number"
                        className={classes.textField}
                        margin="dense"
                        name="phone"
                        type="number"
                        component={renderTextField}
                        validate={[this.required, this.minLength]}
                    />
                </Grid>
                <Grid item md={12}>
                    <Typography>Note</Typography>
                    <Field
                        id="note"
                        label="Note"
                        className={classes.textField}
                        margin="dense"
                        name="note"
                        type="text"
                        component={renderTextField}
                    />
                </Grid>
            </Grid>
        );
        return xhtml;
    };
    renderFormSecond = () => {
        const { classes } = this.props;
        let xhtml = (
            <Grid container spacing={4} className={classes.form}>
                <Grid item md={12}>
                    <Typography>Address</Typography>
                    <Field
                        id="address"
                        label="Your address"
                        className={classes.textField}
                        margin="dense"
                        name="address"
                        component={renderTextField}
                        validate={this.required}
                    />
                </Grid>
                <Grid item md={12}>
                    <Typography>Card details</Typography>
                    <Field
                        id="cardNumber"
                        label="MM/YY/CC"
                        className={classes.textField}
                        margin="dense"
                        name="cardNumber"
                        type="text"
                        component={renderTextField}
                        validate={this.required}
                    />
                </Grid>
                <Grid item md={12}>
                    <Typography>Number</Typography>
                    <Field
                        id="number"
                        label="Tickets Number"
                        className={classes.textField}
                        margin="dense"
                        name="number"
                        type="number"
                        component={renderTextField}
                        validate={[this.required, this.maxTickets]}
                        onChange={this.handleChangeNumber}
                    />
                </Grid>
            </Grid>
        );
        return xhtml;
    };
    handleChangeNumber = (event) => {
        const target = event.target;
        const { cost } = this.props.ticket;
        const value = target.value ? parseInt(target.value, 10) : 1;
        const sum = value * cost + 7.5;
        this.setState({
            number: value,
            sum: sum,
        });
    };
    handleSubmitForm = (value) => {
        const { handleSubmitForm } = this.props;
        handleSubmitForm(value);
    };
    render() {
        const { classes, handleSubmit, invalid, submitting, ticket } =
            this.props;
        const { activeStep, number, sum } = this.state;
        if (ticket) {
            const total = sum === 0 ? number * ticket.cost + 7.5 : sum;
            return (
                <div className={classes.app}>
                    <div className={classes.left}>
                        <Typography className={classes.heading}>
                            Personal Information
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <Stepper
                                activeStep={activeStep}
                                className={classes.stepper}
                            >
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (this.isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>
                                                <span className={classes.label}>
                                                    {label}
                                                </span>
                                            </StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </Box>
                        <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                            {activeStep === 0
                                ? this.renderFormFirst()
                                : this.renderFormSecond()}
                            <Grid container>
                                <Box className={classes.containerBtn}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        sx={{ mr: 1 }}
                                        className={classes.btn}
                                    >
                                        Back
                                    </Button>
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={invalid || submitting}
                                            className={classes.btn}
                                        >
                                            Finish
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={this.handleNext}
                                            variant="contained"
                                            disabled={invalid || submitting}
                                            className={classes.btn}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </form>
                    </div>
                    <div className={classes.right}>
                        <img
                            src={ticket.image}
                            alt="Img"
                            className={classes.img}
                        />
                        <div className={classes.bill}>
                            <Typography className={classes.headingBill}>
                                {ticket.name}
                            </Typography>
                            <div className={classes.info}>
                                <Typography className={classes.textBill}>
                                    {number} General Adminssion
                                </Typography>
                                <Typography className={classes.textBill}>
                                    {number * ticket.cost}$
                                </Typography>
                            </div>
                            <div className={classes.info}>
                                <Typography className={classes.textBill}>
                                    Fees
                                </Typography>
                                <Typography className={classes.textBill}>
                                    7.5$
                                </Typography>
                            </div>
                            <hr />
                            <div className={classes.info}>
                                <Typography className={classes.headingBill}>
                                    Total
                                </Typography>
                                <Typography
                                    style={{ color: 'red' }}
                                    className={classes.textBill}
                                >
                                    {total}$
                                </Typography>
                            </div>
                            <div className={classes.info}>
                                <Typography className={classes.headingBill}>
                                    Rest
                                </Typography>
                                <Typography
                                    style={{ color: 'black' }}
                                    className={classes.textBill}
                                >
                                    {ticket.sum}
                                </Typography>
                            </div>
                            <Typography className={classes.headingBill}>
                                Location
                            </Typography>
                            <Typography className={classes.textBill}>
                                {ticket.place}
                            </Typography>
                            <div className={classes.info}>
                                <Typography className={classes.headingBill}>
                                    Hour
                                </Typography>
                            </div>
                            <div className={classes.info}>
                                <Typography className={classes.textBill}>
                                    Start: {ticket.dateStart ? ticket.dateStart.slice(0, 10):null }
                                </Typography>
                            </div>
                            <div className={classes.info}>
                                <Typography className={classes.textBill}>
                                    End :{ticket.dateEnd ? ticket.dateEnd.slice(0, 10) : null} at{' '}
                                    <b>{ticket.time}</b>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
Payments.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};
const mapStateToProps = (state) => {
    return {};
};

const withConnect = connect(mapStateToProps, null);
const createReduxForm = reduxForm({ form: 'payments' });
export default compose(
    withConnect,
    withStyles(styles),
    createReduxForm,
)(Payments);
