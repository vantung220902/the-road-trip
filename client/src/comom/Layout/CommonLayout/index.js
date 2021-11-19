import React, { Component } from 'react';
import Header from '../../../components/Dashboard/Header';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
class DetailHomePage extends Component {
    render() {
        const { component: YourComponent, ...theRest } = this.props;
        return (
            <Route
                {...theRest}
                render={(routeProps) => {
                    return (
                        <React.Fragment>
                            <Header />
                            <YourComponent {...routeProps} />
                        </React.Fragment>
                    );
                }}
            />
        );
    }
}
DetailHomePage.propTypes = {
    component: PropTypes.func,
    YourComponent: PropTypes.object,
};
export default DetailHomePage;
