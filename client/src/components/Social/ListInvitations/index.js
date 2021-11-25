import { Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import Invitation from '../Invitation';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { watchInvitation } from '../../../actions/invitationActions';
import { socket } from '../../../comom/socket';
class ListInvitations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            
        }
    }
    componentDidMount() {
        const { watchInvitation } = this.props;
        let acc = JSON.parse(localStorage.getItem('account'));
        socket.on("receive_invitation", (data) => {
            watchInvitation(acc.id);
            this.setState({ checked: data.checked });
        })
        watchInvitation(acc.id);
    }
    render() {
        const { classes, invitations } = this.props;
        if (Array.isArray(invitations)) {
            return (
                <div className={classes.app}>
                    <div className={classes.heading}>
                        <Typography className={classes.text}>
                            INVITATIONS
                        </Typography>
                        <span className={classes.number}>{invitations.length}</span>
                    </div>
                    <div className={classes.content}>
                        {invitations.map((invitation) => {
                            return (
                                <Invitation
                                    key={invitation.id}
                                    id={invitation.id}
                                    idTicket={invitation.idTicket}
                                    idAuthor={invitation.idAuthor}
                                    name={invitation.name}
                                    image={invitation.image}
                                    avatar={invitation.avt}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return {
        invitations: state.invitations.listInvitations,
        account: state.sign.account,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        watchInvitation: bindActionCreators(watchInvitation, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ListInvitations);
