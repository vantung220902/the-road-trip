import React, { Component } from 'react'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { findUser, updateUserAdmin } from './../../../actions/signInUp';
import FormUser from '../../../components/Me/Form';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    componentDidMount() {
        const { match, findUser } = this.props;
        const { id } = match.params;
        findUser(id);
    }
    componentDidUpdate(prevProps) {
        const { person } = this.props;
        if (prevProps.person !== person) {
            this.setState({ checked: true })
        }
    }
    handleSubmit = (data, data2) => {
        const { updateUserAdmin, person } = this.props;
        if (data instanceof File) {
            const formData = new FormData();
            formData.append('file', data);
            formData.append('upload_preset', 'y58ntib0');
            updateUserAdmin(formData, {
                ...data2,
                id: person.id,
            }, true);
        } else {
            updateUserAdmin(person.avt, {
                ...data2,
                id: person.id,
            }, false);
        }
    }
    render() {
        const { person } = this.props;
        if (person) {
            return (
                <div className="user">
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Edit User</h1>
                        <NavLink to="/dashboard_event/newUser">
                            <button className="userAddButton">Create</button>
                        </NavLink>
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img
                                    src={`${person.avt}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                    alt="anh"
                                    className="userShowImg"
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{person.fullName}</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Account Details</span>
                                <div className="userShowInfo">
                                    <PermIdentity className="userShowIcon" />
                                    <span className="userShowInfoTitle">{person.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <CalendarToday className="userShowIcon" />
                                    <span className="userShowInfoTitle">{person.date ? person.date.slice(0, 10) : null}</span>
                                </div>
                                <span className="userShowTitle">Contact Details</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className="userShowIcon" />
                                    <span className="userShowInfoTitle">+{person.sdt}</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className="userShowIcon" />
                                    <span className="userShowInfoTitle">{person.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationSearching className="userShowIcon" />
                                    <span className="userShowInfoTitle">{person.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <div className="userUpdateRight">
                                <div className="userUpdateUpload">
                                    <img
                                        className="userUpdateImg"
                                        src={`${person.avt}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                        alt="anh"
                                    />
                                </div>
                            </div>
                            <FormUser handleMySubmit={this.handleSubmit} account={person} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}
const mapStateToProps = (state) => {
    return {
        person: state.sign.person,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findUser: bindActionCreators(findUser, dispatch),
        updateUserAdmin: bindActionCreators(updateUserAdmin, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(User);