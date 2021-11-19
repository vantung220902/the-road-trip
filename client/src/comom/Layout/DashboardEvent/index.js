import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import TopBar from '../../../components/Admin/TopBar';
import './styles.css';
import SlideBar from '../../../components/Admin/SlideBar';
class DashboardLayout extends Component {

    render() {
        const { component: YourComponent, ...theRest } = this.props;

        return (
            <Route
                {...theRest}
                render={(routeProps) => {
                    return (
                        <React.Fragment>
                            <TopBar />
                            <div className="container">
                                <SlideBar />
                                <YourComponent {...routeProps} />
                            </div>
                        </React.Fragment>
                    );
                }}
            />
        );
    }
}
DashboardLayout.propTypes = {
    component: PropTypes.func,
    YourComponent: PropTypes.object,
};
export default DashboardLayout;
