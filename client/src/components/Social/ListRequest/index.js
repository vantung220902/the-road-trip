import { withStyles, Typography, Box, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import Request from '../Request';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getRequestFriends, acceptFriends, declineFriends } from '../../../actions/friends';
class ListRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRequests: [],
            data: null,
        };
    }
    componentDidMount() {
        const { getRequestFriends, socket } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        socket.on("receive_request", (data) => {
            this.setState({ data: data });
        });
        getRequestFriends(account.id);
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.listRequests !== this.props.listRequests) {
    //         this.setState({
    //             listRequests: this.props.listRequests,
    //         });

    //     }
    // }
    handleAccept = (id) => {
        const { acceptFriends } = this.props;
        const { data } = this.state;
        acceptFriends(id);
        if (id === data.id) {
            this.setState({ data: null });
        }

    }
    handleDecline = (id) => {
        const { declineFriends } = this.props;
        declineFriends(id);
        const { data } = this.state;
        if (id === data.id) {
            this.setState({ data: null });
        }
    }
    render() {
        const { classes, listRequests } = this.props;
        const { data } = this.state;
        return (
            <div className={classes.app}>
                <Box className={classes.heading}>
                    <Typography className={classes.text}>Request</Typography>
                    <Typography className={classes.number}>{listRequests.length}</Typography>
                </Box>
                <Grid container className={classes.list}>
                    {
                        data ? (<Request key={data.id} id={data.id} handleAccept={this.handleAccept}
                            name={data.fullName} avatar={data.avt} handleDecline={this.handleDecline} />) : null
                    }
                    {
                        listRequests.map((t, index) => {
                            return (<Request key={index} id={t.id} handleAccept={this.handleAccept}
                                name={t.fullName} avatar={t.avt} handleDecline={this.handleDecline} />)
                        })
                    }


                </Grid>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listRequests: state.friends.listRequests,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getRequestFriends: bindActionCreators(getRequestFriends, dispatch),
        acceptFriends: bindActionCreators(acceptFriends, dispatch),
        declineFriends: bindActionCreators(declineFriends, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ListRequest);
