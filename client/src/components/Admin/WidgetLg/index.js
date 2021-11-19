import React, { Component } from 'react'
import './styles.css';

export default class WidgetLg extends Component {
    render() {
        const { listLastsPayments } = this.props;

        return (
            <div className="widgetLg">
                <h3 className="widgetLgTitle">Latest transactions</h3>
                <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Number</th>
                    </tr>
                    {
                        listLastsPayments.map((payment) => {
                            return (
                                <tr className="widgetLgTr" key={payment.id}>
                                    <td className="widgetLgUser">
                                        <img
                                            src={payment.avt}
                                            alt="anh"
                                            className="widgetLgImg"
                                        />
                                        <span className="widgetLgName">{payment.fullName}</span>
                                    </td>
                                    <td className="widgetLgDate">{payment.dateBuy ? payment.dateBuy.slice(0, 10) : null}</td>
                                    <td className="widgetLgAmount">${payment.sum}</td>
                                    <td className="widgetLgStatus">
                                        {payment.number}
                                    </td>
                                </tr>
                            )
                        })
                    }


                </table>
            </div>
        )
    }
}
