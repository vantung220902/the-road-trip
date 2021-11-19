import React, { Component } from 'react'
import './styles.css';
import FromCreate from '../../../components/SignForm/RegisterForm/form';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { addUser } from '../../../actions/signInUp';
class NewUser extends Component {
    handleSubmit = (value) => {
        const { addUser } = this.props;
        const data = {
            fullName: value.name,
            email: value.email,
            password: value.password,
        };
        addUser(data);
    };
    render() {
        return (
            <div className="newUser">
                <h1 className="newUserTitle">New User</h1>
                <FromCreate onHandleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addUser: bindActionCreators(addUser, dispatch),
    };
};
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(NewUser)
