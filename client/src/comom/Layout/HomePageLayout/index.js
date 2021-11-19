import React, { Component } from 'react';
import DashBoard from '../../../components/Dashboard';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
class HomePageLayout extends Component {
    render() {
        const { component: YourComponent, ...theRest } = this.props;
        return (
            <Route
                {...theRest}
                render={(routeProps) => {
                    return (
                        <DashBoard {...theRest}>
                            <YourComponent {...routeProps} />
                        </DashBoard>
                    );
                }}
            />
        );
    }
}
HomePageLayout.propTypes = {
    component: PropTypes.func,
    YourComponent: PropTypes.object,
};
export default HomePageLayout;
