import React, { Component } from 'react';
import styles from './styles';
import { Provider } from 'react-redux';
import configStore from './../../redux/configStore';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../comom/Theme/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { withStyles } from '@material-ui/core';
import {
    ROUTE,
    DETAIL_ROUTES,
    SIGN_ROUTES,
    SEARCH_ROUTES,
    PAY_ROUTES,
    USER_EVENTS,
    SCHEDULED_ROUTES,
    ACTIVE_DASHBOARD_EVENTS,
    SOCIAL_NETWORK, ME, PERSON
} from './../../constants';
import HomePageLayout from './../../comom/Layout/HomePageLayout';
import CommonLayout from '../../comom/Layout/CommonLayout';
import PropTypes from 'prop-types';
import GlobalLoading from '../../components/GlobalLoading';
import DashboardLayout from '../../comom/Layout/DashboardEvent';
const store = configStore();
class App extends Component {
    renderHomePage = () => {
        let xhtml = null;
        xhtml = ROUTE.map((e) => {
            return (
                <HomePageLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderDetailPage = () => {
        let xhtml = null;
        xhtml = DETAIL_ROUTES.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderSignPage = () => {
        let xhtml = null;
        xhtml = SIGN_ROUTES.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderSearchPage = () => {
        let xhtml = null;
        xhtml = SEARCH_ROUTES.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderPaymentsPage = () => {
        let xhtml = null;
        xhtml = PAY_ROUTES.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderUserEventsPage = () => {
        let xhtml = null;
        xhtml = USER_EVENTS.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderSchedulePage = () => {
        let xhtml = null;
        xhtml = SCHEDULED_ROUTES.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderDashboardPage = () => {
        let xhtml = null;
        xhtml = ACTIVE_DASHBOARD_EVENTS.map((e) => {
            return (
                <DashboardLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderSocialPage = () => {
        let xhtml = null;
        xhtml = SOCIAL_NETWORK.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderMePage = () => {
        let xhtml = null;
        xhtml = ME.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };
    renderPersonPage = () => {
        let xhtml = null;
        xhtml = PERSON.map((e) => {
            return (
                <CommonLayout
                    key={e.path}
                    path={e.path}
                    component={e.component}
                    name={e.name}
                    exact={e.exact}
                />
            );
        });
        return xhtml;
    };

    render() {
        const { classes } = this.props;
        return (
            <Provider store={store}>
                <Router>
                    <ThemeProvider theme={theme}>
                        <div className={classes.App}>
                            <GlobalLoading />
                            <CssBaseline />
                            <ToastContainer />
                            <Switch>
                                {this.renderHomePage()}
                                {this.renderDetailPage()}
                                {this.renderSignPage()}
                                {this.renderSearchPage()}
                                {this.renderPaymentsPage()}
                                {this.renderUserEventsPage()}
                                {this.renderSchedulePage()}
                                {this.renderDashboardPage()}
                                {this.renderSocialPage()}
                                {this.renderMePage()}
                                {this.renderPersonPage()}
                            </Switch>
                        </div>
                    </ThemeProvider>
                </Router>
            </Provider>
        );
    }
}
App.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(App);
