import { withStyles, Typography, Box, Button } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import UserInfo from '../../components/UserInfo';
import { findUser } from '../../actions/signInUp';
import TicketItem from '../../components/TicketItem';
import { RenderTabsDetail } from '../../actions/ui';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { myPost } from '../../actions/post';
import Posting from '../../components/Social/Posting';
import { watchTicketSell } from '../../actions/tickets';
import * as actionModal from '../../actions/modalAction';
import Modal from '../../components/Modal';
import { checkFriends, requestFriends, removeFriends, getFriends } from '../../actions/friends';
import Friend from '../../components/Social/Friend';
import Message from '../../components/Social/ChatBox';
import { showChatBox } from '../../actions/ui';
import { watchMessage, } from '../../actions/message';
class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFriend: -1,
        }
    }
    componentDidMount() {
        const { myPost, watchTicketSell, match, findUser, checkFriends, getFriends } = this.props;
        const { id } = match.params;
        findUser(id);
        checkFriends(id);
        myPost(id);
        getFriends(id);
        watchTicketSell(id);
    }
    handleTabs = (e, value) => {
        const { renderTabsDetail } = this.props;
        renderTabsDetail(value);
    };
    componentDidUpdate(prevProps) {
        if (prevProps.isFriend !== this.props.isFriend) {
            this.setState({ isFriend: this.props.isFriend });
        }
    }
    handleMessage = () => {
        const { showChatBox, watchMessage, match } = this.props;
        const { id } = match.params;
        showChatBox(id);
        watchMessage(id);
    }
    renderTabs = () => {
        const { tabDetails, listPost, tickets, listFriends } = this.props;
        // xhtml = ({ 0: <About description={description} />, 1: <Discussion />, 2: <Picture /> }[tabDetails] ?? null);
        let xhtml =
            tabDetails === 1 ? (
                listFriends.length > 0 ? listFriends.map((friend) => {
                    return <Friend avt={friend.avt} fullName={friend.fullName}
                        person1ID={friend.person1ID} person2ID={friend.person2ID}
                        check={true}
                        key={friend.id} />
                }) : (<Typography color="secondary">
                    This user don't have any friends.
                </Typography>)
            ) : tabDetails === 2 ? (
                tickets.length > 0 ? tickets.map((ticket) => {
                    return (
                        <TicketItem
                            view={12}
                            key={ticket.id}
                            ticket={ticket}
                        />
                    );
                }) : (<Typography color="secondary">
                    This user don't have any events
                </Typography>)
            ) : (listPost.map(post => {
                return <Posting key={post.id} post={post}
                />
            }));
        return xhtml;
    };
    handleRequest = () => {
        const { requestFriends, person } = this.props;
        requestFriends(person.id);
    }
    handleDelete = () => {
        const { actionModal, classes, person } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete Ticket');
        ChangeModel((<Box className={classes.model}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to delete friend with {person.fullName}
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button className={classes.btn} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={this.handleConfirmDelete} variant="contained" color="secondary">
                    Delete
                </Button>
            </Box>
        </Box>), "240px");

    }
    handleConfirmDelete = () => {
        const { removeFriends, match, actionModal } = this.props;
        const { id } = match.params;
        removeFriends(id);
        const { hideModel } = actionModal;
        hideModel();
    }
    render() {
        const { classes, person, listPost, tickets, tabDetails, isFriend } = this.props;
        const number = tickets.length;
        const numberPost = listPost.length;
        return (
            <div className={classes.app} >
                <UserInfo numberPost={numberPost} number={number}
                    person={person} tabDetails={tabDetails}
                    checked={isFriend}
                    handleRequest={this.handleRequest}
                    handleDelete={this.handleDelete}
                    handleTabs={this.handleTabs}
                    handleMessage={this.handleMessage}
                >
                    {this.renderTabs()}
                </UserInfo>
                <Message />
                <Modal />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tabDetails: state.ui.tabDetails,
        listPost: state.post.listPost,
        person: state.sign.person,
        tickets: state.tickets.listTickets,
        isFriend: state.friends.isFriend,
        listFriends: state.friends.listFriends,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        renderTabsDetail: bindActionCreators(RenderTabsDetail, dispatch),
        myPost: bindActionCreators(myPost, dispatch),
        watchTicketSell: bindActionCreators(watchTicketSell, dispatch),
        findUser: bindActionCreators(findUser, dispatch),
        checkFriends: bindActionCreators(checkFriends, dispatch),
        requestFriends: bindActionCreators(requestFriends, dispatch),
        removeFriends: bindActionCreators(removeFriends, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        getFriends: bindActionCreators(getFriends, dispatch),
        showChatBox: bindActionCreators(showChatBox, dispatch),
        watchMessage: bindActionCreators(watchMessage, dispatch),

    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(AccountPage);
