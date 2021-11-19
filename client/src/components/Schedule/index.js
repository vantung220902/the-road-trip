import React, { Component } from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    MonthView,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    TodayButton,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
import cn from 'classnames';
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
            ) {
                if (
                    e.indexOf(p[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
class Schedule extends Component {
    isWeekEnd = (date) => date.getDay() === 0 || date.getDay() === 6;
    DayScaleCell = withStyles(styles)((_a) => {
        var { startDate, classes } = _a,
            restProps = __rest(_a, ['startDate', 'classes']);
        return React.createElement(
            MonthView.DayScaleCell,
            Object.assign(
                {
                    className: cn({
                        [classes.weekEndDayScaleCell]:
                            this.isWeekEnd(startDate),
                    }),
                    startDate: startDate,
                },
                restProps,
            ),
        );
    });
    TimeTableCell = withStyles(styles)((_a) => {
        var { startDate, classes } = _a,
            restProps = __rest(_a, ['startDate', 'classes']);
        return React.createElement(
            MonthView.TimeTableCell,
            Object.assign(
                {
                    className: cn({
                        [classes.weekEndCell]: this.isWeekEnd(startDate),
                    }),
                    startDate: startDate,
                },
                restProps,
            ),
        );
    });
    render() {
        const { listPayments } = this.props;
        return (
            <Paper>
                <Scheduler data={listPayments}>
                    <ViewState />
                    <MonthView
                        dayScaleCellComponent={this.DayScaleCell}
                        timeTableCellComponent={this.TimeTableCell}
                    />
                    <DayView
                        displayName={'Three days'}
                        startDayHour={9}
                        endDayHour={17}
                        intervalCount={3}
                    />

                    <Appointments />
                    <AppointmentTooltip showCloseButton />
                    <Toolbar />
                    <DateNavigator />
                    <ViewSwitcher />
                    <TodayButton />
                </Scheduler>
            </Paper>
        );
    }
}

export default withStyles(styles)(Schedule);
