import { withStyles, Paper, Tooltip, Typography, Button, Box } from '@material-ui/core';
import { Pagination } from "@material-ui/lab";
import React, { Component } from 'react';
import styles from '../BuyTicket/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { getCountBuy } from '../../../actions/payments';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import SearchHelper from '../../SearchHelper';
class BuyTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            page: 1
        }
    }
    componentDidMount() {
        const { getCountBuy } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        getCountBuy(account.id);
    }
    componentWillMount() {
        this.checkedBox = new Set();
    }
    handleCheckBox = (e) => {
        const value = e.target.value;
        const { listPayments } = this.props;
        const checkAll = document.querySelector('input[name="checkAll"]');
        const lengthCheck = document.querySelectorAll('input[name="checkIDs[]"]:checked').length;
        if (listPayments.length === lengthCheck) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
        if (lengthCheck > 0) {
            this.setState({ checked: true });
        } else {
            this.setState({ checked: false });
        }
        if (this.checkedBox.has(value)) {
            this.checkedBox.delete(value);
        } else {
            this.checkedBox.add(value);
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { handDeleteSubmit } = this.props;
        handDeleteSubmit(this.checkedBox, 0);
    }
    handleDelete = (value, type) => {
        if (this.checkedBox.has(value)) {
            this.checkedBox.delete(value);
        } else {
            this.checkedBox.add(value);
        }
        const { handDeleteSubmit } = this.props;
        handDeleteSubmit(this.checkedBox, type);
    }
    handleAll = () => {
        const checkAll = document.querySelector('input[name="checkAll"]').checked;
        const checkBox = document.querySelectorAll('input[name="checkIDs[]"]');
        checkBox.forEach(e => {
            e.checked = checkAll;
            if (this.checkedBox.has(e.value)) {
                this.checkedBox.delete(e.value);
            } else {
                this.checkedBox.add(e.value);
            }
        });
        this.setState({ checked: checkAll });
    }
    handleChangePage = (event, value) => {
        const { handleBuyTickets } = this.props;
        this.setState({
            page: value
        });
        handleBuyTickets(value);
    }
    handleChange = (e) => {
        const { handleChangeBuy } = this.props;
        const { value } = e.target;
        handleChangeBuy(value);
    }
    renderView() {
        const { classes, listPayments, count } = this.props;
        const { checked, page } = this.state;
        return (
            <React.Fragment>
                <SearchHelper handleChange={this.handleChange} />
                <form onSubmit={this.onSubmit}>
                    <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} >
                            <input type="checkbox" name="checkAll" onChange={this.handleAll} />
                            <Typography>
                                ALL
                            </Typography>
                        </Box>
                        <Button variant="contained" type="submit" color="secondary"
                            disabled={checked ? false : true} sx={{ margin: '0 12px', }}>
                            Delete <HighlightOffIcon />
                        </Button>

                    </Box>
                    {
                        listPayments.map((payment) => {
                            return (
                                <Tooltip
                                    title="My Events"
                                    key={payment.id}
                                    className={classes.app}
                                >
                                    <Paper className={classes.paper}>

                                        <input type="checkbox" name="checkIDs[]" value={payment.id}
                                            onChange={this.handleCheckBox} />

                                        <div className={classes.item}>
                                            <img
                                                src={payment.image}
                                                alt="img"
                                                className={classes.img}
                                            />
                                            <div className={classes.contentText}>
                                                <Typography
                                                    variant="h6"
                                                    className={classes.headingItem}
                                                >
                                                    Name
                                                </Typography>
                                                <Typography className={classes.text}>
                                                    {payment.name}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <Typography
                                                    variant="h6"
                                                    className={classes.headingItem}
                                                >
                                                    Where
                                                </Typography>
                                                <Typography className={classes.text}>
                                                    {payment.place}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <Typography
                                                    variant="h6"
                                                    className={classes.headingItem}
                                                >
                                                    Price
                                                </Typography>
                                                <Typography className={classes.text}>
                                                    {payment.number * payment.cost + 1.5}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <Typography
                                                    variant="h6"
                                                    className={classes.headingItem}
                                                >
                                                    Time Event
                                                </Typography>
                                                <Typography className={classes.text}>
                                                    {payment.dateStart.length > 10 ?
                                                        payment.dateStart.slice(0, 10) : payment.dateStart}
                                                    to {payment.dateEnd.length > 10 ?
                                                        payment.dateEnd.slice(0, 10) : payment.dateEnd} at{' '}
                                                    {payment.time}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <Button
                                                    variant="contained"
                                                    className={classes.contentText}
                                                    onClick={() => this.handleDelete(payment.id, 0)}
                                                    color="secondary"
                                                >
                                                    Delete <HighlightOffIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </Tooltip>
                            )
                        })
                    }
                </form>
                <Box spacing={2} className={classes.pagination}>
                    <Typography>Page: {page}</Typography>
                    <Pagination count={count} page={page} onChange={this.handleChangePage} />
                </Box>
            </React.Fragment>
        );
    }

    render() {
        const { listPayments } = this.props;
        return (
            <React.Fragment>

                {listPayments ? this.renderView() : ''}

            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        count: state.payments.count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCountBuy: bindActionCreators(getCountBuy, dispatch)
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(BuyTicket);
