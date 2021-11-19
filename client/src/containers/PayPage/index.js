import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import Payments from '../../components/Payments';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { findIDTickets } from '../../actions/tickets';
import { payments, findIDAccPayment } from '../../actions/payments';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
class PayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    componentDidMount() {
        const { findIDTickets, match, findIDAccPayment } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        const { id } = match.params;
        findIDTickets(id);
        findIDAccPayment(account.id);
    }
    handleSubmitForm = (value) => {
        const { match, payments } = this.props;
        const { id } = match.params;
        const account = JSON.parse(localStorage.getItem('account'));
        const idAccount = account.id;
        const newDate = new Date();
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const newValue = {
            ...value,
            number: parseInt(value.number, 10),
            idTicket: parseInt(id, 10),
            idAccount: idAccount,
            dateBuy: `${year}-${month}-${day}`,
        };
        payments(newValue);
        this.setState({ value: 1 });
    };
    render() {
        const { classes, ticket, listPayments } = this.props;
        const { value } = this.state;
        const { dateStart, time } = ticket;
        let checkTicket = null;
        if (listPayments.length > 0) {
            checkTicket = listPayments.find((payment) => {
                return (
                    payment.dateStart === dateStart && payment.time === time
                );
            });
        }

        if (checkTicket) {
            toast.warn(
                `🙂 You had the event ${dateStart} at ${time} and you should consider that`,
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                },
            );
        }
        return value === 0 ? (
            <div className={classes.app}>
                <Payments
                    handleSubmitForm={this.handleSubmitForm}
                    ticket={ticket}
                />
            </div>
        ) : (
            <Redirect to={'/user_events'} />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ticket: state.tickets.ticket,
        listPayments: state.payments.listPayments,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findIDTickets: bindActionCreators(findIDTickets, dispatch),
        payments: bindActionCreators(payments, dispatch),
        findIDAccPayment: bindActionCreators(findIDAccPayment, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(PayPage);
