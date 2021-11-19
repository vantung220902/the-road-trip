import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import LoginForm from '../../../components/SignForm/LoginForm';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { SignIn } from '../../../actions/signInUp';
import { Redirect } from 'react-router-dom';
class Login extends Component {
    handleSubmit = (value) => {
        const { SignIn } = this.props;
        SignIn(value);
    };
    render() {
        const { classes, account } = this.props;
        if (account) {
            if (account.role === 'user') {
                return <Redirect to="/" />;
            } else {
                return <Redirect to="/dashboard_event" />
           }
        }
        return (
            <div className={classes.app}>
                <LoginForm onHandleSubmit={this.handleSubmit} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        account: state.sign.account,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        SignIn: bindActionCreators(SignIn, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Login);
