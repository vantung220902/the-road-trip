import React, { Component } from 'react'
import { Visibility } from "@material-ui/icons";
import './styles.css';
import { NavLink } from 'react-router-dom';
export default class WidgetSm extends Component {
    render() {
        const { lastsUsers } = this.props;
        return (
            <div className="widgetSm">
                <span className="widgetSmTitle">New Join Members</span>
                <ul className="widgetSmList">
                    {
                        lastsUsers.map(user => {
                            return (
                                <li className="widgetSmListItem" key={user.id}>
                                    <img
                                        src={`${user.avt}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                        alt="anh"
                                        className="widgetSmImg"
                                    />
                                    <div className="widgetSmUser">
                                        <span className="widgetSmUsername">${user.fullName}</span>
                                        <span className="widgetSmUserTitle">${user.email}</span>
                                        {
                                            user.address ? <span className="widgetSmUserTitle">${user.address}</span> : null
                                        }
                                        {user.sdt ? <span className="widgetSmUserTitle">${user.sdt}</span> : null}
                                        {user.date ? <span className="widgetSmUserTitle">${user.date.slice(0, 10)}</span> : null}
                                    </div>
                                    <NavLink to={`/dashboard_event/user/${user.id}`} className="link">
                                        <button className="widgetSmButton">
                                            <Visibility className="widgetSmIcon" />
                                            Display
                                        </button>
                                  </NavLink>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
        )
    }
}
