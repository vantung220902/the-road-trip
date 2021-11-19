import React, { Component } from 'react';
import './styles.css';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Button } from '@material-ui/core';
const month = new Date().getMonth();
class FeaturedInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: month,
            disabledUp: true,
            disabledDown: false,
            value2: month,
            disabledUp2: true,
            disabledDow2: false,
        }
    }
    handleClickR = (number) => {
        const { value } = this.state;
        if (value + number > month) {
            this.setState({ disabledUp: true });
        } else if (value + number <= 0) {
            this.setState({ disabledUp: true });
        } else {
            this.setState({
                value: value + number,
                disabledUp: false, disabledDown: false
            });
        }
    }
    handleClickC = (number) => {
        const { value2 } = this.state;
        if (value2 + number > month) {
            this.setState({ disabledUp2: true });
        } else if (value2 + number <= 0) {
            this.setState({ disabledUp2: true });
        } else {
            this.setState({
                value2: value2 + number,
                disabledUp2: false, disabledDown2: false
            });
        }
    }
    render() {
        const { nowP, lastP, listPayments, listUsers } = this.props;
        const { value, disabledUp, disabledDown,
            value2, disabledUp2, disabledDow2 } = this.state;
        let nowR, lastR, nowC, lastC = 0;
        if (listPayments.length > 0) {
            nowR = listPayments[value].total;
            lastR = listPayments[value - 1].total;
        }
        if (listUsers.length > 0) {
            nowC = listUsers[value2].sum;
            lastC = listUsers[value2 - 1].sum;
        }
        let incRevenue = 0;
        let incNumber = 0;
        let incNumberPost = 0;
        if (lastR !== 0) {
            incRevenue = (nowR / lastR) * 100;
        }
        if (lastC !== 0) {
            incNumber = (nowC / lastC) * 100;
        }
        if (lastP !== 0) {
            incNumberPost = (nowP / lastP) * 100;
        }
        return (
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Revenue</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">${nowR}</span>
                        <span className="featuredMoneyRate">
                            {incRevenue >= 100 ?
                                <React.Fragment>
                                    {'+' + incRevenue}<ArrowUpward className="featuredIcon" />
                                </React.Fragment>
                                : <React.Fragment>
                                    {'-' + incRevenue}<ArrowDownward className="featuredIcon negative" />
                                </React.Fragment>}
                        </span>


                    </div>
                    <span className="featuredSub">Compared to {listPayments.length > 0 ? listPayments[value - 1].month : null} month</span>
                    <div className="featureContainerBtn">
                        <Button className="featuredBtn" variant="text" disabled={disabledUp}
                            onClick={() => { this.handleClickR(1) }}>
                            <ArrowUpward />
                        </Button>
                        <Button className="featuredBtn" variant="text" disabled={disabledDown}
                            onClick={() => { this.handleClickR(-1) }}>
                            <ArrowDownward />
                        </Button>
                    </div>
                </div>
                <div className="featuredItem" onClick={this.handleClick}>
                    <span className="featuredTitle">Customer</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">${nowC}</span>
                        <span className="featuredMoneyRate">
                            {incNumber >= 100 ? <React.Fragment>
                                {'+' + incNumber}<ArrowUpward className="featuredIcon" />
                            </React.Fragment>
                                : <React.Fragment>
                                    {'-' + incNumber}<ArrowDownward className="featuredIcon negative" />
                                </React.Fragment>}

                        </span>
                    </div>
                    <span className="featuredSub">Compared to {listUsers.length > 0 ? listUsers[value2 - 1].month : null} month</span>
                    <div className="featureContainerBtn">
                        <Button className="featuredBtn" variant="text" disabled={disabledUp2}
                            onClick={() => { this.handleClickC(1) }}>
                            <ArrowUpward />
                        </Button>
                        <Button className="featuredBtn" variant="text" disabled={disabledDow2}
                            onClick={() => { this.handleClickC(-1) }}>
                            <ArrowDownward />
                        </Button>
                    </div>
                </div>
                <div className="featuredItem" onClick={this.handleClick}>
                    <span className="featuredTitle">Post</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">${nowP}</span>
                        <span className="featuredMoneyRate">
                            {incNumberPost >= 100 ? <React.Fragment>
                                {'+' + incNumberPost}<ArrowUpward className="featuredIcon" />
                            </React.Fragment>
                                : <React.Fragment>
                                    {'-' + incNumberPost}<ArrowDownward className="featuredIcon negative" />
                                </React.Fragment>}
                        </span>
                    </div>
                    <span className="featuredSub">Compared to {listPayments.length > 0 ? listPayments[value - 1].month : null} month</span>
                    <div className="featureContainerBtn">
                        <Button className="featuredBtn" variant="text" disabled={disabledUp}
                            onClick={() => { this.handleClickP(1) }}>
                            <ArrowUpward />
                        </Button>
                        <Button className="featuredBtn" variant="text" disabled={disabledDown}
                            onClick={() => { this.handleClickP(-1) }}>
                            <ArrowDownward />
                        </Button>
                    </div>
                </div>
            </div>
        )

    }
}
export default FeaturedInfo;