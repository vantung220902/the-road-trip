import React, { Component } from 'react'
import {
    CalendarToday,
    Place, Description
} from "@material-ui/icons";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { findIDTickets, updateTicketAdmin } from '../../../actions/tickets';
import { getALLIdsUser } from '../../../actions/signInUp';
import FormTicket from '../../../components/FormTicket/FormCreate';
class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: null,
        }
    }
    componentDidMount() {
        const { match, findIDTickets, getALLIdsUser } = this.props;
        const { id } = match.params;
        findIDTickets(id);
        getALLIdsUser();

    }
    componentDidUpdate(prevProps) {
        const { ticket } = this.props;
        if (prevProps.ticket !== ticket) {
            this.setState({ ticket: ticket });
        }
    }
    onHandleUpdateSubmit = (id, data, data2) => {
        const { updateTicketAdmin, ticket } = this.props;
        if (data.type !== undefined) {
            const formData = new FormData();
            formData.append('file', data);
            formData.append('upload_preset', 'y58ntib0');
            updateTicketAdmin(id, formData, {
                ...data2,
                sum: ticket.sum
            }, true);
        } else {
            updateTicketAdmin(id, data, {
                ...data2,
                sum: ticket.sum
            }, false);
        }
    };

    render() {
        const { ticket, listUsers } = this.props;
        const data = this.state.ticket ? this.state.ticket : ticket;
        if (!data) {
            return null;
        }
        return (
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Edit Ticket</h1>
                </div>
                <div className="userContainer">
                    <div className="userShow">
                        <NavLink to={`/dashboard_event/user/${ticket.idAccount}`}
                            className="link">
                            <div className="userShowTop">
                                <img
                                    src={`${ticket.avt}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                    alt="anh"
                                    className="userShowImg"
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{ticket.fullName}</span>
                                </div>
                            </div>
                        </NavLink>
                        <span className="userShowTitle">Information Ticket</span>
                        <div className="userShowInfo">
                            <Place className="userShowIcon" />
                            <span className="userShowInfoTitle">+{ticket.place}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {ticket.dateStart ? `${ticket.dateStart} 
                                    to ${ticket.dateStart}` : null}
                            </span>
                        </div>

                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{ticket.name}</span>
                        </div>
                        <div className="userShowInfo">
                            <NavLink to={`/dashboard_event/ticket/${ticket.idTicket}`} className="link">
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img
                                            className="userUpdateImg"
                                            src={`${ticket.image}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                            alt="anh"
                                        />
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="userShowBottom">
                            <div className="userShowInfo">
                                <AttachMoneyIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">{ticket.sum}</span>
                            </div>
                            <div className="userShowInfo">
                                <ConfirmationNumberIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">{ticket.number}</span>
                            </div>
                            <div className="userShowInfo">
                                <LocalOfferIcon className="userShowIcon" />
                                <span className="userShowInfoTitle">{ticket.cost}</span>
                            </div>

                            <div className="userShowInfo">
                                <Description className="userShowIcon" />
                                <span className="userShowInfoTitle">{ticket.description}</span>
                            </div>
                        </div>

                    </div>
                    <div className="userUpdate maxWUpload">
                        <span className="userUpdateTitle">Edit</span>
                        <FormTicket onHandleUpdateSubmit={this.onHandleUpdateSubmit}
                            ticket={data} listUsers={listUsers} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ticket: state.tickets.ticket,
        listUsers: state.sign.listUsers,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findIDTickets: bindActionCreators(findIDTickets, dispatch),
        updateTicketAdmin: bindActionCreators(updateTicketAdmin, dispatch),
        getALLIdsUser: bindActionCreators(getALLIdsUser, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Ticket);