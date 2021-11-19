import {
    withStyles,
    Paper,
    Tooltip,
    Typography,
    Slider,
    Button,
    Box, Select, MenuItem
} from '@material-ui/core';
import React, { Component } from 'react';
import styles from '../Buy/styles';
import { NavLink } from 'react-router-dom';
import RestoreIcon from '@material-ui/icons/Restore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class UserTrashSell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            value: 0,
        }
    }
    componentWillMount() {
        this.checkedBox = new Set();
    }
    handleCheckBox = (e) => {
        const value = e.target.value;
        const { listTickets } = this.props;
        const checkAll = document.querySelector('input[name="checkAll"]');
        const lengthCheck = document.querySelectorAll('input[name="checkIDs[]"]:checked').length;
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
        if (this.checkedBox.has(value)) {
            this.checkedBox.delete(value);
        } else {
            this.checkedBox.add(value);
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { handDeleteSubmit } = this.props;
        const { value } = this.state;
        handDeleteSubmit(this.checkedBox, value);
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
        })
        this.setState({ checked: checkAll });
    }
    handleValue = (e) => {
        this.setState({ value: e.target.value });
    }
    calculateValue = (value) => {
        return 2 ** value;
    };
    renderView() {
        const { classes, listTickets } = this.props;
        const { checked, value } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: '8px' }} >
                        <input type="checkbox" name="checkAll" onChange={this.handleAll} />
                        <Typography>
                            ALL
                        </Typography>
                    </Box>
                    <Select value={value}
                        onChange={this.handleValue}>
                        <MenuItem value={0}>--Choose Actions--</MenuItem>
                        <MenuItem value={3}>
                            Delete Forever <HighlightOffIcon />
                        </MenuItem>
                        <MenuItem value={4}> Restore<RestoreIcon /></MenuItem>
                    </Select>
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
                                    <input type="checkbox" name="checkIDs[]" value={ticket.id}
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
                                                onClick={() => this.handleDelete(ticket.id, 3)}
                                            >
                                                Delete <HighlightOffIcon />
                                            </Button>

                                        </div>
                                        <div className={classes.contentText}>
                                            <Button variant="contained"
                                                className={classes.contentText}
                                                color="primary"
                                                onClick={() => { this.handleDelete(ticket.id, 4) }}
                                            >
                                                Restore <RestoreIcon />
                                            </Button>
                                        </div>

                                    </div>
                                </Paper>
                            </Tooltip>
                        )
                    })
                }
            </form>
        );
    }
    render() {
        const { listTickets, classes } = this.props;
        return (
            <React.Fragment>
                <Box className={classes.btnCenter}>
                    <NavLink to={'/'} className={classes.nav}>
                        Go To Activity Dashboard
                    </NavLink>
                </Box>

                {listTickets ? this.renderView() : ''}
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(UserTrashSell);
