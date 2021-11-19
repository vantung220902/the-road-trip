import React, { Component } from 'react';
import Header from './Header';
import Slider from './Slider';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
class DashBoard extends Component {
    render() {
        const { children, classes, toggled, component, title } = this.props;
        return (
            <div
                className={cn(classes.App, {
                    [classes.backgroundColor]: toggled === false,
                    [classes.backgroundDark]: toggled === true,
                })}
            >
                <Header component={component} />
                <Slider title={title} />
                {children}
            </div>
        );
    }
}
DashBoard.propTypes = {
    classes: PropTypes.object,
    toggled: PropTypes.bool,
    component: PropTypes.object,
    children: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
const mapStateToProps = (state) => {
    return {
        toggled: state.ui.toggled,
        component: state.ui.component,
        title: state.ui.title,
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(DashBoard);
