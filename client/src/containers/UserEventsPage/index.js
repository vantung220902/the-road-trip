import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Box, Typography, Button } from '@material-ui/core';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIDAccPayment, deletedPayment, search } from '../../actions/payments';
import FormCreateTicket from '../../components/FormTicket/FormCreate';
import * as actionModal from '../../actions/modalAction';
import Modal from '../../components/Modal';
import { creteTicket, watchTicketSell, updateTicket, deletedTickets, filterTicketsByAuthor } from '../../actions/tickets';
import { getFriends } from '../../actions/friends';
import Friend from '../../components/Social/Friend';
import BuyTicket from '../../components/UserEvents/BuyTicket';
import BootstrapButton from '../../components/BtnOutline';
import SellTicket from '../../components/UserEvents/SellTicket';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from 'react-router-dom';
import { createInvitation } from '../../actions/invitationActions';
import { socket } from '../../comom/socket';
const account = JSON.parse(localStorage.getItem('account'));
class UserEventsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            checked: false,
        };
    }
    componentDidMount() {
        const { findIDAccPayment, watchTicketSell, getFriends } = this.props;
        findIDAccPayment(account.id);
        watchTicketSell(account.id);
        getFriends(account.id)
    }
    componentWillMount() {
        this.checkedBoxFriend = new Set();
    }
    handleOpen = () => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('ADD Event');
        ChangeModel(<FormCreateTicket onHandleSubmit={this.onHandleSubmit} />, "auto");
    };
    onHandleSubmit = (data, data2) => {
        const { creteTicket, actionModal } = this.props;
        const { hideModel } = actionModal;
        const formData = new FormData();
        formData.append('file', data);
        formData.append('upload_preset', 'y58ntib0');
        creteTicket(formData, {
            ...data2,
            idAuthor: account.id,
        });
        hideModel();
    };
    handleSellTickets = (page) => {
        const limit = page * 6;
        const start = limit - 6;
        const { watchTicketSell } = this.props;
        watchTicketSell(account.id, { start, limit });
    }
    handleBuyTickets = (page) => {
        const limit = page * 6;
        const start = limit - 6;
        const { findIDAccPayment } = this.props;
        findIDAccPayment(account.id, { start, limit });
    }
    onHandleUpdateSubmit = (id, data, data2) => {
        const { updateTicket, actionModal } = this.props;
        const { hideModel } = actionModal;
        if (data.type !== undefined) {
            const formData = new FormData();
            formData.append('file', data);
            formData.append('upload_preset', 'y58ntib0');
            updateTicket(id, formData, {
                ...data2,
                idAuthor: account.id,
            }, true);
        } else {
            updateTicket(id, data, {
                ...data2,
                idAuthor: account.id,
            }, false);
        }
        hideModel();
    };
    handleOpenUpdate = (id) => {
        const { actionModal, listTickets } = this.props;
        const index = listTickets.findIndex(item => item.id === id);
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('Update Ticket');
        ChangeModel(<FormCreateTicket ticket={listTickets[index]} onHandleUpdateSubmit={this.onHandleUpdateSubmit} />, "auto");
    };
    handDeleteSubmit = (data, type) => {
        const { actionModal, classes } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete Ticket');
        ChangeModel((<Box className={classes.model}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to delete
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button className={classes.mr} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={() => this.handleConfirm(data, type)} variant="contained" color="secondary">
                    Delete
                </Button>
            </Box>
        </Box>), "240px");
    }
    handleConfirm = (data, type) => {
        const { actionModal, deletedPayment, deletedTickets } = this.props;
        const { hideModel } = actionModal;
        const array = [];
        data.forEach(value => {
            array.push(value);
        });
        switch (type) {
            case 0:
                deletedPayment(array);
                break;
            case 1:
                deletedTickets(array);
                break;
            default: return;
        }
        hideModel();
    }
    handleChangeSell = (value) => {
        const { filterTicketsByAuthor } = this.props;
        filterTicketsByAuthor(account.id, value);
    }
    handleChangeBuy = (value) => {
        const { search } = this.props;
        search(account.id, value);
    }
    handleListFriends = (data) => {
        const { actionModal, listFriends, classes } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        const { checked } = this.state;
        showModel();
        ChangeModelTitle('List Friends');
        ChangeModel(listFriends.length > 0 ? (
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center' }} mr={2}>
                    <input type="checkbox" name="checkAllFriends" onChange={this.handleAll} />
                    <Typography>
                        ALL
                    </Typography>
                </Box>
                {listFriends.map((friend) => {
                    return (
                        <Box className={classes.flex}>
                            <input type="checkbox" name="checkByIDsFriend[]"
                                value={parseInt(friend.person1ID, 10) === account.id ? friend.person2ID : friend.person1ID}
                                onChange={this.handleCheckBox} />
                            <Friend avt={friend.avt} fullName={friend.fullName}
                                person1ID={friend.person1ID} person2ID={friend.person2ID}
                                check={true}
                                key={friend.id} />
                        </Box>
                    )
                })
                }
                <Button variant="contained" onClick={() => { this.onSubmitInvitation(data) }} color="primary"
                    disabled={checked !== 0 ? false : true}>
                    Confirm
                </Button>
            </React.Fragment>
        ) : (<Typography color="secondary">
            This user don't have any friends.
        </Typography>), "auto");
    }
    handleClick = (value) => {
        this.setState({ value: value });
    };
    handleAll = () => {
        const checkAll = document.querySelector('input[name="checkAllFriends"]').checked;
        const checkBox = document.querySelectorAll('input[name="checkByIDsFriend[]"]');
        checkBox.forEach(e => {
            e.checked = checkAll;
            if (this.checkedBoxFriend.has(e.value)) {
                this.checkedBoxFriend.delete(e.value);
            } else {
                this.checkedBoxFriend.add(e.value);
            }
        })
        this.setState({ checked: checkAll });
    }

    handleCheckBox = (e) => {
        const { listTickets } = this.props;
        const checkAll = document.querySelector('input[name="checkAllFriends"]');
        const lengthCheck = document.querySelectorAll('input[name="checkByIDsFriend[]"]:checked').length;
        if (listTickets.length === lengthCheck) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
        if (lengthCheck > 0) {
            this.setState({ checked: true });
        } else {
            this.setState({ checked: false });
        }
        if (this.checkedBoxFriend.has(e.target.value)) {
            this.checkedBoxFriend.delete(e.target.value);
        } else {
            this.checkedBoxFriend.add(e.target.value);
        }
    }
    onSubmitInvitation = (data) => {
        const { createInvitation, actionModal } = this.props;
        const { hideModel } = actionModal;
        createInvitation(data, this.checkedBoxFriend);
        hideModel();
        socket.emit('send_invitation', { checked: true });
        this.checkedBoxFriend = new Set();
    }
    render() {
        const { classes, listPayments, listTickets } = this.props;
        const { value } = this.state;
        if (listPayments && listTickets) {
            return (
                <div className={classes.app}>
                    <Typography variant="h6" className={classes.heading}>
                        My Events
                    </Typography>
                    <div className={classes.header}>
                        <Box />
                        <Box>
                            <Button
                                variant="contained"
                                className={classes.btn}
                                onClick={this.handleOpen}
                            >
                                Create Event!
                            </Button>
                        </Box>
                    </div>
                    <div>
                        <Box className={classes.container}>
                            <Box>
                                <BootstrapButton
                                    onClick={() => {
                                        this.handleClick(1);
                                    }}
                                    style={
                                        value === 1
                                            ? { backgroundColor: '#f50057' }
                                            : { backgroundColor: '#2563eb' }
                                    }
                                    className={classes.btn}
                                >
                                    Purchased tickets
                                </BootstrapButton>
                                <BootstrapButton
                                    onClick={() => {
                                        this.handleClick(0);
                                    }}
                                    style={
                                        value === 0
                                            ? { backgroundColor: '#f50057' }
                                            : { backgroundColor: '#2563eb' }
                                    }
                                    className={classes.btn}
                                >
                                    Sell Ticket
                                </BootstrapButton>
                            </Box>
                            <NavLink to={'user_trash'} className={classes.navLink}>

                                <Button
                                    variant="contained"
                                    className={classes.btn}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Typography>
                                        My Trash
                                    </Typography>
                                    <DeleteIcon />

                                </Button>
                            </NavLink>
                        </Box>
                        {value === 1 ? (
                            <BuyTicket listPayments={listPayments} handDeleteSubmit={this.handDeleteSubmit}
                                handleChangeBuy={this.handleChangeBuy}
                                handleBuyTickets={this.handleBuyTickets}
                            />
                        ) : listTickets ? (
                            <SellTicket listTickets={listTickets}
                                handleOpenUpdate={this.handleOpenUpdate}
                                handDeleteSubmit={this.handDeleteSubmit}
                                handleSellTickets={this.handleSellTickets}
                                handleChangeSell={this.handleChangeSell}
                                handleListFriends={this.handleListFriends}
                            />
                        ) : (
                            null
                        )}
                    </div>
                    <Modal />
                </div>
            );
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return {
        listPayments: state.payments.listPayments,
        listTickets: state.tickets.listTickets,
        listFriends: state.friends.listFriends,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findIDAccPayment: bindActionCreators(findIDAccPayment, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        creteTicket: bindActionCreators(creteTicket, dispatch),
        watchTicketSell: bindActionCreators(watchTicketSell, dispatch),
        updateTicket: bindActionCreators(updateTicket, dispatch),
        deletedPayment: bindActionCreators(deletedPayment, dispatch),
        deletedTickets: bindActionCreators(deletedTickets, dispatch),
        filterTicketsByAuthor: bindActionCreators(filterTicketsByAuthor, dispatch),
        search: bindActionCreators(search, dispatch),
        getFriends: bindActionCreators(getFriends, dispatch),
        createInvitation: bindActionCreators(createInvitation, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(UserEventsPage);
