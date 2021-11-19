import {
    withStyles,
    Paper,
    Tooltip,
    Typography,
    Slider,
    Button,
    Box,
    Select,
    MenuItem
} from '@material-ui/core';
import { Pagination } from "@material-ui/lab";
import React, { Component } from 'react';
import styles from '../BuyTicket/styles';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SendIcon from '@material-ui/icons/Send';
import { getCountSell } from '../../../actions/tickets';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import SearchHelper from '../../SearchHelper';
const account = JSON.parse(localStorage.getItem('account'));
class SellTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            page: 1,
            value: 0,
        }
    }
    componentDidMount() {
        const { getCountSell } = this.props;
        getCountSell(account.id);
    }
    componentWillMount() {
        this.checkedBox = new Set();
    }
    handleCheckBox = (e) => {
        const { listTickets } = this.props;
        const checkAll = document.querySelector('input[name="checkAll"]');
        const lengthCheck = document.querySelectorAll('input[name="checkByIDs[]"]:checked').length;
        if (listTickets.length === lengthCheck) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
        if (lengthCheck > 0) {
            this.setState({ checked: true });
        } else {
            this.setState({ checked: false });
        }
        if (this.checkedBox.has(e.target.value)) {
            this.checkedBox.delete(e.target.value);
        } else {
            this.checkedBox.add(e.target.value);
        }
    }
    onSubmit = (e) => {
        const { value } = this.state;
        e.preventDefault();
        const { handDeleteSubmit, handleListFriends } = this.props;
        if (value !== 2) {
            handDeleteSubmit(this.checkedBox, value);
            return;
        } else {
            handleListFriends(this.checkedBox);
            return;
        }

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
        const checkBox = document.querySelectorAll('input[name="checkByIDs[]"]');
        checkBox.forEach(e => {
            e.checked = checkAll;
            if (this.checkedBox.has(e.value)) {
                this.checkedBox.delete(e.value);
            } else {
                this.checkedBox.add(e.value);
            }
        })
        this.setState({ checked: checkAll });
    }
    handleValue = (e) => {
        this.setState({ value: e.target.value });
    }
    calculateValue = (value) => {
        return 2 ** value;
    };
    handleChange = (e) => {
        const { value } = e.target;
        const { handleChangeSell } = this.props;
        handleChangeSell(value);
    }
    renderView() {
        const { classes, listTickets, handleOpenUpdate, count } = this.props;
        const { checked, page, value } = this.state;
        return (
            <React.Fragment>
                <SearchHelper handleChange={this.handleChange} />
                <form onSubmit={this.onSubmit}>
                    <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} mr={2}>
                            <input type="checkbox" name="checkAll" onChange={this.handleAll} />
                            <Typography>
                                ALL
                            </Typography>
                        </Box>
                        <Box mr={2}>
                            <Select value={value}
                                onChange={this.handleValue}>
                                <MenuItem value={0}>--Choose Actions--</MenuItem>
                                <MenuItem value={1}>
                                    Delete <HighlightOffIcon />
                                </MenuItem>
                                <MenuItem value={2}> Invitation<SendIcon /></MenuItem>
                            </Select>
                        </Box>

                        <Button variant="contained" type="submit" color="primary"
                            disabled={checked && value !== 0 ? false : true} className={classes.contentText}>
                            Confirm
                        </Button>

                    </Box>
                    {
                        listTickets.map((ticket) => {
                            return (
                                <Tooltip
                                    title="My Events"
                                    key={ticket.id}
                                    className={classes.app}
                                >
                                    <Paper className={classes.paper}>
                                        <input type="checkbox" name="checkByIDs[]" value={ticket.id}
                                            onChange={this.handleCheckBox} />
                                        <div className={classes.item}>
                                            <img
                                                src={ticket.image}
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
                                                    {ticket.name}
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
                                                    {ticket.place}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <div className={classes.headerText}>
                                                    <Typography
                                                        variant="h6"
                                                        className={classes.headingItem}
                                                    >
                                                        Sold
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        className={classes.headingItem}
                                                    >
                                                        {ticket.sum ? ticket.sum : 0}/{ticket.number}
                                                    </Typography>
                                                </div>
                                                {
                                                    <Slider
                                                        value={ticket.sum ? ticket.sum : 0}
                                                        min={0}
                                                        step={1}
                                                        max={parseInt(ticket.number, 10)}
                                                        scale={() => {
                                                            this.calculateValue(9);
                                                        }}
                                                        valueLabelDisplay="auto"
                                                        aria-labelledby="non-linear-slider"
                                                    />
                                                }
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
                                                    {ticket.cost}
                                                </Typography>
                                            </div>

                                        </div>
                                        {
                                            ticket.status===0 ? (<div className={classes.item}>
                                                <div className={classes.contentText}>
                                                    <Typography
                                                        variant="h6"
                                                        className={classes.headingItem}
                                                    >
                                                        Approval
                                                    </Typography>
                                                    <Typography color="secondary" className={classes.text}>
                                                        Not approved yet
                                                    </Typography>
                                                </div>
                                            </div>
                                            ) : null
                                        }
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <Typography
                                                    variant="h6"
                                                    className={classes.headingItem}
                                                >
                                                    Time Event
                                                </Typography>
                                                <Typography className={classes.text}>
                                                    {ticket.dateStart.length > 10 ?
                                                        ticket.dateStart.slice(0, 10) : ticket.dateStart}
                                                    to {ticket.dateEnd.length > 10 ?
                                                        ticket.dateEnd.slice(0, 10) : ticket.dateEnd} at{' '}
                                                    {ticket.time}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.contentText}>
                                                <Button
                                                    variant="contained"
                                                    className={classes.contentText}
                                                    color="secondary"
                                                    onClick={() => this.handleDelete(ticket.id, 1)}
                                                >
                                                    Delete <HighlightOffIcon />
                                                </Button>

                                            </div>
                                            <div className={classes.contentText}>
                                                <Button variant="contained"
                                                    className={classes.contentText}
                                                    color="primary"
                                                    onClick={() => { handleOpenUpdate(ticket.id) }}
                                                >
                                                    Update <EditIcon />
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
    handleChangePage = (event, value) => {
        const { handleSellTickets } = this.props;
        this.setState({
            page: value
        });
        handleSellTickets(value);
    }
    render() {
        const { listTickets } = this.props;
        return (
            <React.Fragment>
                {listTickets ? this.renderView() : ''}

            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        count: state.tickets.count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCountSell: bindActionCreators(getCountSell, dispatch)
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(SellTicket);

