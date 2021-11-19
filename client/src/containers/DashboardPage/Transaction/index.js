import React, { Component } from 'react'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PhoneAndroid,
} from "@material-ui/icons";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { findPaymentID, updatePayment } from './../../../actions/payments';
import { getALLIds } from './../../../actions/tickets';
import { getALLIdsUser } from './../../../actions/signInUp';
import FormTransaction from './Form';
class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: null,
        }
    }
    componentDidMount() {
        const { match, findPaymentID, getALLIds, getALLIdsUser } = this.props;
        const { id } = match.params;
        findPaymentID(id);
        getALLIdsUser();
        getALLIds();

    }
    componentDidUpdate(prevProps) {
        const { payment } = this.props;
        if (prevProps.payment !== payment) {
            this.setState({ payment: payment });
        }
    }
    onHandleUpdateSubmit = (data) => {
        const { updatePayment } = this.props;
        updatePayment(data);
    }

    render() {
        const { payment, listTickets, listUsers } = this.props;
        const data = this.state.payment ? this.state.payment : payment;
        if (!data) {
            return null;
        }
        return (
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Edit Payment</h1>
                </div>
                <div className="userContainer">
                    <div className="userShow">
                        <NavLink to={`/dashboard_event/user/${payment.idAccount}`}
                            className="link">
                            <div className="userShowTop">
                                <img
                                    src={`${payment.avt}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                    alt="anh"
                                    className="userShowImg"
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{payment.fullName}</span>
                                </div>
                            </div>
                        </NavLink>
                        <span className="userShowTitle">Information Payment</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">+{payment.phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{payment.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{payment.address}</span>
                        </div>
                        <div className="userShowInfo">
                            <CreditCardIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">{payment.cardNumber}</span>
                        </div>
                        <span className="userShowTitle">Tickets Details</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{payment.name}</span>
                        </div>
                        <div className="userShowInfo">
                            <NavLink to={`/dashboard_event/ticket/${payment.idTicket}`} className="link">
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img
                                            className="userUpdateImg"
                                            src={`${payment.image}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                            alt="anh"
                                        />
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">Payment Details</span>

                            <div className="userShowInfo">
                                <AttachMoneyIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">{payment.sum}</span>
                            </div>
                            <div className="userShowInfo">
                                <ConfirmationNumberIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">{payment.number}</span>
                            </div>

                            <div className="userShowInfo">
                                <CalendarToday className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {payment.dateBuy ? `${payment.time} 
                                    :${payment.dateBuy.length === 10 ? payment.dateBuy: payment.dateBuy.slice(0, 10)}` : null}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <LocalOfferIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">{payment.cost}</span>
                            </div>
                        </div>

                    </div>
                    <div className="userUpdate maxWUpload">
                        <span className="userUpdateTitle">Edit</span>
                        <FormTransaction handleMySubmit={this.onHandleUpdateSubmit}
                            payment={data} listTickets={listTickets} listUsers={listUsers} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        payment: state.payments.payment,
        listTickets: state.tickets.listTickets,
        listUsers: state.sign.listUsers,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findPaymentID: bindActionCreators(findPaymentID, dispatch),
        updatePayment: bindActionCreators(updatePayment, dispatch),
        getALLIds: bindActionCreators(getALLIds, dispatch),
        getALLIdsUser: bindActionCreators(getALLIdsUser, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Transaction);