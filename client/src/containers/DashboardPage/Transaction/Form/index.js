import React, { Component } from 'react';
import styles from '../../../../components/Payments/styles';
import renderTextField from '../../../../components/FormHelper/TextField';
import renderSelectField from '../../../../components/FormHelper/Select';
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
            sold: -1,
            image: "",
            avt: "",
            email: "",
            price: 0,

        }
    }
    componentDidMount() {
        const { payment } = this.props;
        if (payment) {
            this.props.initialize({
                idAccount: payment.idAccount,
                name: payment.fullName,
                phone: payment.phone,
                address: payment.address,
                note: payment.note,
                cardNumber: payment.cardNumber,
                number: payment.number,
                idTicket: payment.idTicket,
                dateBuy: payment.dateBuy.slice(0, 10)

            });
        }
    }
    componentDidUpdate(prevProps) {
        const { payment } = this.props;
        if (prevProps.payment !== payment) {
            this.props.initialize({
                idAccount: payment.idAccount,
                name: payment.fullName,
                phone: payment.phone,
                address: payment.address,
                note: payment.note,
                cardNumber: payment.cardNumber,
                number: payment.number,
                idTicket: payment.idTicket,
                dateBuy: payment.dateBuy.slice(0, 10)
            });
        }
    }
    required = (value) => {
        let error = 'Please Enter ';
        if (
            value !== null &&
            typeof value !== 'undefined'
        ) {
            error = null;
        }
        return error;
    };
    maxTickets = (value) => {
        let error = null;
        const { payment } = this.props;
        const sold = this.state.sold !== -1 ? this.state.sold : payment.sold;
        if (value > sold) {
            error = `Maximum number of ticket is ${sold} characters`;
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
    handleChangTicket = (e) => {
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const sold = optionElement.getAttribute('data-sold');
        const image = optionElement.getAttribute('data-image');
        const price = optionElement.getAttribute('data-price');
        this.setState({ sold: parseInt(sold, 10), image: image, price: price });
    }
    onHandleSubmit = (data) => {
        const { handleMySubmit } = this.props;
        const { payment } = this.props;
        const { email, image, avt, price, sold } = this.state;
        const date = new Date();
        const value = {
            ...data,
            email: email === "" || email === null ? payment.email : email,
            image: image === "" || image === null ? payment.image : image,
            avt: avt === "" || avt === null ? payment.avt : avt,
            numberOld: payment.number,
            id: payment.id,
            time: `${date.getHours()}:${date.getMinutes()}`,
            sum: price === 0 || price === null ? payment.sum : price * data.number,
            cost: price === 0 || price === null ? payment.cost : price,
            sold: sold === -1 || sold === null ? payment.sold : sold + payment.number - data.number,
        };
        handleMySubmit(value);
    }
    render() {
        const { classes, invalid, submitting, listTickets, payment, handleSubmit, listUsers } = this.props;
        return (
            <div className={classes.app}>
                <form onSubmit={handleSubmit(this.onHandleSubmit)}>
                    <Grid container spacing={4} className={classes.form}>
                        <Grid item md={12}>
                            <Typography>Users</Typography>
                            <Field
                                id="user"
                                label="Users ID"
                                className={classes.textField}
                                margin="dense"
                                name="idAccount"
                                component={renderSelectField}
                                onChange={this.handleChangUser}
                                validate={this.required}
                            >
                                <option value={payment.idAccount}>
                                    {payment.idAccount}-{payment.fullName}(Default) </option>
                                {
                                    listUsers.map((user) => {
                                        return (<option key={user.id} data-email={user.email}
                                            data-avt={user.avt}
                                            value={user.id}>
                                            {user.id}-{user.fullName}</option>)
                                    })
                                }
                            </Field>
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
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Typography>Tickets </Typography>
                            <Field
                                id="ticket"
                                label="Ticket ID"
                                className={classes.textField}
                                margin="dense"
                                name="idTicket"
                                component={renderSelectField}
                                onChange={this.handleChangTicket}
                                validate={this.required}
                            >
                                <option value={payment.idTicket}>{payment.idTicket}-{payment.name}(Default) </option>
                                {
                                    listTickets.map((ticket) => {
                                        return (<option key={ticket.id} data-sold={ticket.sold}
                                            data-image={ticket.image} data-price={ticket.price}
                                            value={ticket.id}>
                                            {ticket.id}-{ticket.name}</option>)
                                    })
                                }
                            </Field>
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
                            <Typography>Date Buy</Typography>
                            <Field
                                id="dateBuy"
                                className={classes.textField}
                                margin="dense"
                                name="dateBuy"
                                type="date"
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
FormTransaction.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};

const createReduxForm = reduxForm({ form: 'transaction' });
export default compose(
    withStyles(styles),
    createReduxForm,
)(FormTransaction);
