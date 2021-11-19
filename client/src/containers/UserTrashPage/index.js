import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Box, Typography, Button } from '@material-ui/core';
import UserTrash from '../../components/UserTrash';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { trashPayment, restoreTrash, deletedForever } from '../../actions/payments';
import * as actionModal from '../../actions/modalAction';
import Modal from '../../components/Modal';
import { trashTickets, deletedForeverTicket, restoreTrashTickets } from '../../actions/tickets';
const account = JSON.parse(localStorage.getItem('account'));
class UserTrashPage extends Component {
    componentDidMount() {
        const { trashPayment, trashTickets } = this.props;
        trashPayment(account.id);
        trashTickets(account.id);
    }
    handDeleteSubmit = (data, type) => {
        const { actionModal, classes } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete Ticket');
        ChangeModel((<Box className={classes.model}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to  {type === 1 || type === 3 ? 'Delete forever' : 'Restore'}
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button className={classes.btn} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={() => this.handleConfirm(data, type)} variant="contained" color="secondary">
                    {type === 1 || type === 3 ? 'Delete' : 'Restore'}
                </Button>
            </Box>
        </Box>), "240px");
    }
    handleConfirm = (data, type) => {
        const { actionModal, restoreTrash, deletedForever, deletedForeverTicket, restoreTrashTickets } = this.props;
        const { hideModel } = actionModal;
        const array = [];
        data.forEach(value => {
            array.push(value);
        });
        switch (type) {
            case 1:
                deletedForever(array);
                break;
            case 2:
                restoreTrash(array);
                break;
            case 3:
                deletedForeverTicket(array);
                break;
            case 4:
                restoreTrashTickets(array);
                break;
            default: return;
        }

        hideModel();
    }
    render() {
        const { classes, listPayments, listTickets } = this.props;
        if (listPayments && listTickets) {
            return (
                <div className={classes.app}>
                    <UserTrash
                        handDeleteSubmit={this.handDeleteSubmit}
                        listPayments={listPayments}
                        listTickets={listTickets}
                    />
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
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        trashPayment: bindActionCreators(trashPayment, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        trashTickets: bindActionCreators(trashTickets, dispatch),
        restoreTrash: bindActionCreators(restoreTrash, dispatch),
        deletedForever: bindActionCreators(deletedForever, dispatch),
        deletedForeverTicket: bindActionCreators(deletedForeverTicket, dispatch),
        restoreTrashTickets: bindActionCreators(restoreTrashTickets, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(UserTrashPage);
