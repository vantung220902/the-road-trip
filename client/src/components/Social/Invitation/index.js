import { Button, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { deleteInvitation, acceptInvitation } from '../../../actions/invitationActions';
import { Redirect } from 'react-router';
class Invitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: false
        }
    }
    handleClick = (id) => {
        const { acceptInvitation } = this.props;
        acceptInvitation(id);
        this.setState({ action: true });
    }
    render() {
        const { classes, id, name, image, avatar, deleteInvitation, idTicket } = this.props;
        const { action } = this.state;
        if (action) {
            return <Redirect to={`detail/${idTicket}`} push={true} />
        }
        return (
            <div className={classes.app}>

                <img src={image} className={classes.img} alt="Anh" />
                <div className={classes.author}>
                    <img
                        src={
                            avatar
                        }
                        className={classes.avt}
                        alt="Avt"
                    />
                </div>
                <div className={classes.contextText}>
                    <Typography className={classes.text}>{name}</Typography>
                </div>
                <div className={classes.accept}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => { this.handleClick(id) }}
                    >

                        Accept Invitation
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => { deleteInvitation(id) }}
                    >
                        X
                    </Button>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteInvitation: bindActionCreators(deleteInvitation, dispatch),
        acceptInvitation: bindActionCreators(acceptInvitation, dispatch),
    };
};
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Invitation);
