import React, { Component } from 'react';
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { NavLink, Redirect } from 'react-router-dom';
import "./topBar.css";
import { Menu, MenuItem } from '@material-ui/core';
import { SignOut } from '../../../actions/signInUp';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
const account = JSON.parse(localStorage.getItem('account'));
const menuId = 'primary-search-account-menu';
class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEL: null,
            redirect: false
        };
    }
    handleProfileMenuOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };
    renderMenu = () => {
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );
    };
    handleLogout = () => {
        const { SignOut } = this.props;
        SignOut();
        if (account) {
            localStorage.removeItem('account');
        }
        this.handleMenuClose();
        this.setState({ redirect: true })
    };
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='./login' />;
        }
        return (
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topLeft">
                        <NavLink to={'/'} className="link">

                            <span className="logo">The Road Trip</span>
                        </NavLink>
                    </div>
                    <div className="topRight">
                        <div className="topbarIconContainer">
                            <NotificationsNone />
                            <span className="topIconBadge">2</span>
                        </div>
                        <div className="topbarIconContainer">
                            <Language />
                            <span className="topIconBadge">2</span>
                        </div>
                        <div className="topbarIconContainer">
                            <Settings />
                        </div>

                        <img src={account ? account.avt : ''} alt="anh" className="topAvatar" onClick={this.handleProfileMenuOpen} />
                    </div>
                </div>
                {this.renderMenu()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SignOut: bindActionCreators(SignOut, dispatch),
    };
};
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(TopBar);
