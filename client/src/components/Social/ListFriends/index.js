import React, { Component } from 'react';
import styles from './styles';
import Friend from '../Friend';
import { Box, Typography, Grid, withStyles } from '@material-ui/core';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getFriends } from '../../../actions/friends';
import Message from '../../../components/Social/ChatBox';
import { showChatBox } from '../../../actions/ui';
import { watchMessage, } from '../../../actions/message';
const account = JSON.parse(localStorage.getItem('account'));
class ListFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
        }
    }
    componentDidMount() {
        const { getFriends } = this.props;
        getFriends(account.id);
    }
    handleMessage = (id) => {
        const { showChatBox, watchMessage } = this.props;
        showChatBox(id);
        watchMessage(id);

    }
    render() {
        const { classes, listFriends } = this.props;
        if (Array.isArray(listFriends)) {
            return (
                <div className={classes.app}>
                    <Box className={classes.heading}>
                        <Typography className={classes.text}>Contact</Typography>
                        <Typography className={classes.number}>{listFriends.length}</Typography>
                    </Box>
                    <Grid container className={classes.list}>
                        {
                            listFriends.map((friend) => {
                                return <Friend avt={friend.avt} fullName={friend.fullName}
                                    person1ID={friend.person1ID} person2ID={friend.person2ID}
                                    handleMessage={this.handleMessage}
                                    key={friend.id} />
                            })
                        }
                        < Message />
                    </Grid>
                </div>
            );
        } else {
            return null;
        }

    }
}
const mapStateToProps = (state) => {
    return {
        listFriends: state.friends.listFriends,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getFriends: bindActionCreators(getFriends, dispatch),
        showChatBox: bindActionCreators(showChatBox, dispatch),
        watchMessage: bindActionCreators(watchMessage, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ListFriends);
