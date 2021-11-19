import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import Schedule from '../../components/Schedule';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { findIDAccPayment } from '../../actions/payments';
class SchedulePage extends Component {
    componentDidMount() {
        const { findIDAccPayment } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        findIDAccPayment(account.id);
    }
    renderListPay = () => {
        const { listPayments } = this.props;
        const payments = listPayments.map((payments) => {
            const { dateStart, dateEnd } = payments;
            return {
                title: payments.name,
                image: payments.image,
                startDate: dateStart,
                endDate: dateEnd,
            };
        });
        return payments;
    };
    render() {
        const { classes, listPayments } = this.props;
        return (
            <div className={classes.app}>
                <div className={classes.schedule}>
                    {listPayments.length > 0 ? (
                        <Schedule listPayments={this.renderListPay()} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listPayments: state.payments.listPayments,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findIDAccPayment: bindActionCreators(findIDAccPayment, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(SchedulePage);
