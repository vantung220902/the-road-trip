import { withStyles, Paper, Tooltip, Typography, Button, Box, Select, MenuItem } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RestoreIcon from '@material-ui/icons/Restore';

class UserTrashBuy extends Component {
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
    renderView() {
        const { classes, listPayments } = this.props;
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
                        <MenuItem value={1}>
                            Delete Forever <HighlightOffIcon />
                        </MenuItem>
                        <MenuItem value={2}> Restore<RestoreIcon /></MenuItem>
                    </Select>
                    <Button variant="contained" type="submit" color="primary"
                        disabled={checked && value !== 0 ? false : true} className={classes.contentText}>
                        Confirm
                    </Button>
                </Box>
                {
                    listPayments.map((payment) => {
                        return (
                            <Tooltip
                                title="My Trash"
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
                                                onClick={() => this.handleDelete(payment.id, 1)}
                                                color="secondary"
                                            >
                                                Delete <HighlightOffIcon />
                                            </Button>
                                        </div>
                                        <div className={classes.contentText}>
                                            <Button
                                                variant="contained"
                                                className={classes.contentText}
                                                onClick={() => this.handleDelete(payment.id, 2)}
                                                color="primary"
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
        const { listPayments } = this.props;

        return (
            <React.Fragment>

                {listPayments ? this.renderView() : ''}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(UserTrashBuy);
