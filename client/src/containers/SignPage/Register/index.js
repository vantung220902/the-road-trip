import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import RegisterForm from '../../../components/SignForm/RegisterForm';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { SignUp } from '../../../actions/signInUp';
import { Redirect } from 'react-router-dom';
class Register extends Component {
    handleSubmit = (value) => {
        const { SignUp } = this.props;
        const data = {
            fullName: value.name,
            email: value.email,
            password: value.password,
        };
        SignUp(data);
    };
    render() {
        const { classes, account } = this.props;
        if (account) {
            return <Redirect to="/" />;
        }
        return (
            <div className={classes.app}>
                <RegisterForm onHandleSubmit={this.handleSubmit} />
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
        SignUp: bindActionCreators(SignUp, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Register);
