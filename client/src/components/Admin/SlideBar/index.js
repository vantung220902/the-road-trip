import React, { Component } from 'react'
import {
    LineStyle,
    Timeline,
    PermIdentity,
    AttachMoney,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
} from "@material-ui/icons";
import AssignmentIcon from '@material-ui/icons/Assessment';
import CheckIcon from '@material-ui/icons/Check';
import EventIcon from '@material-ui/icons/Event';
import { NavLink } from "react-router-dom";
import "./sideBar.css";
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { HandleTabs } from '../../../actions/ui';
import MenuIcon from '@material-ui/icons/Menu';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    renderClickHandler = (value) => {
        const { HandleTabs } = this.props;
        HandleTabs(value);
    }
    render() {
        const { tabs } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <div className="dashboard-icon">
                    <MenuIcon onClick={() => { this.setState({ open: !open }) }} />
                </div>
                <div className={`sidebar${open ? 'active' : ''}`}>
                    <div className="sidebarWrapper">
                        <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Dashboard</h3>
                            <ul className="sidebarList">
                                <NavLink to="/dashboard_event" className="link">
                                    <li className={`sidebarListItem${tabs === 0 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(0) }}>
                                        <LineStyle className="sidebarIcon" />
                                        Home
                                    </li>
                                </NavLink>
                                <li className={`sidebarListItem${tabs === 1 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(1) }}>
                                    <Timeline className="sidebarIcon" />
                                    Analytics
                                </li>
                                <NavLink to="/dashboard_event/approval" className="link">
                                    <li className={`sidebarListItem${tabs === 2 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(2) }}>
                                        <CheckIcon className="sidebarIcon" />
                                        Approval
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                        <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Quick Menu</h3>
                            <ul className="sidebarList">
                                <NavLink to="/dashboard_event/users" className="link">
                                    <li className={`sidebarListItem${tabs === 3 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(3) }}>
                                        <PermIdentity className="sidebarIcon" />
                                        Users
                                    </li>
                                </NavLink>
                                <NavLink to="/dashboard_event/posts" className="link">
                                    <li className={`sidebarListItem${tabs === 4 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(4) }}>
                                        <AssignmentIcon className="sidebarIcon" />
                                        Posts
                                    </li>
                                </NavLink>
                                <NavLink to="/dashboard_event/transactions" className="link">
                                    <li className={`sidebarListItem${tabs === 5 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(5) }}>
                                        <AttachMoney className="sidebarIcon" />
                                        Transactions
                                    </li>
                                </NavLink>
                                <NavLink to="/dashboard_event/ticketsList" className="link">
                                    <li className={`sidebarListItem${tabs === 6 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(6) }}>
                                        <EventIcon className="sidebarIcon" />
                                        Events
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                        <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Notifications</h3>
                            <ul className="sidebarList">
                                <NavLink to="/dashboard_event/sendEmail" className="link">
                                    <li className={`sidebarListItem${tabs === 7 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(7) }}>
                                        <MailOutline className="sidebarIcon" />
                                        Mail
                                    </li>
                                </NavLink>
                                <li className={`sidebarListItem${tabs === 8 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(8) }}>
                                    <DynamicFeed className="sidebarIcon" />
                                    Feedback
                                </li>
                                <li className={`sidebarListItem${tabs === 9 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(9) }}>
                                    <ChatBubbleOutline className="sidebarIcon" />
                                    Messages
                                </li>
                            </ul>
                        </div>
                        <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Trash</h3>
                            <ul className="sidebarList">
                                <NavLink to="/dashboard_event/trashUsers" className="link">
                                    <li className={`sidebarListItem${tabs === 10 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(10) }}>
                                        <PermIdentity className="sidebarIcon" />
                                        Users
                                    </li>
                                </NavLink>
                                <NavLink to="/dashboard_event/trashTransactions" className="link">
                                    <li className={`sidebarListItem${tabs === 11 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(11) }}>
                                        <AttachMoney className="sidebarIcon" />
                                        Transactions
                                    </li>
                                </NavLink>
                                <NavLink to="/dashboard_event/trashTickets" className="link">
                                    <li className={`sidebarListItem${tabs === 12 ? ' active' : ""}`} onClick={() => { this.renderClickHandler(12) }}>
                                        <EventIcon className="sidebarIcon" />
                                        Events
                                    </li>
                                </NavLink>

                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {

        tabs: state.ui.tabs,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        HandleTabs: bindActionCreators(HandleTabs, dispatch),

    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(SideBar);
