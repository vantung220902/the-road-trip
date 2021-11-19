import React, { Component } from 'react'
import './styles.css'
import FeaturedInfo from './../../../components/Admin/FeaturedInfo';
import Chart from './../../../components/Admin/Chart';
import WidgetSm from './../../../components/Admin/WidgetSm/index';
import WidgetLg from './../../../components/Admin/WidgetLg/index';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { revenuePayment, LastsPayment } from '../../../actions/payments';
import { CountUser, LastsUser } from '../../../actions/signInUp';
import { countPost } from '../../../actions/post';
const month = new Date().getMonth();
class Home extends Component {
    componentDidMount() {
        const { revenuePayment, CountUser, countPost, LastsUser, LastsPayment } = this.props;
        revenuePayment();
        CountUser();
        countPost(month + 1);
        LastsUser(0, 5);
        LastsPayment();
    }

    render() {
        const { listPayments, nowP, lastP, listUsers, lastsUsers, listLasts } = this.props;
        return (
            <div className="home">
                <FeaturedInfo listPayments={listPayments ? listPayments : []}
                    listUsers={listUsers ? listUsers : []} nowP={nowP} lastP={lastP} />
                <Chart data={listPayments} title="Revenue monthly" grid dataKey="total" />
                <div className="homeWidgets">
                    <WidgetSm lastsUsers={lastsUsers ? lastsUsers : []} />
                    <WidgetLg listLastsPayments={listLasts} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listPayments: state.payments.listPayments,
        listUsers: state.sign.listUsers,
        nowP: state.post.now,
        lastP: state.post.last,
        lastsUsers: state.sign.lastsUsers,
        listLasts: state.payments.listLasts

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        revenuePayment: bindActionCreators(revenuePayment, dispatch),
        CountUser: bindActionCreators(CountUser, dispatch),
        countPost: bindActionCreators(countPost, dispatch),
        LastsUser: bindActionCreators(LastsUser, dispatch),
        LastsPayment: bindActionCreators(LastsPayment, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Home);