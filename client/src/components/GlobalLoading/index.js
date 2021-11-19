import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
class GlobalLoading extends Component {
    render() {
        let xhtml = null;
        let { classes, showLoading } = this.props;
        if (showLoading) {
            xhtml = (
                <div className={classes.globalLoading}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/img/loading.gif`}
                        alt="Anh Loading"
                        className={classes.icon}
                    />
                </div>
            );
        }
        return xhtml;
    }
}
const mapStateToProps = (state) => {
    return {
        showLoading: state.ui.showLoading,
    };
};

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, withStyles(styles))(GlobalLoading);
