import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Typography, Box, Button } from '@material-ui/core';
import Buy from './Buy';
import BootstrapButton from '../BtnOutline';
import Sell from './Sell';
import { NavLink } from 'react-router-dom';
class UserTrash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    handleClick = (value) => {
        this.setState({ value: value });
    };
    render() {
        const { classes, listPayments, listTickets, handDeleteSubmit } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.app}>
                <Typography variant="h6" className={classes.heading}>
                    My Trash
                </Typography>
                <div >
                    <Box className={classes.container}>
                        <Box>
                            <BootstrapButton
                                onClick={() => {
                                    this.handleClick(0);
                                }}
                                style={
                                    value === 0
                                        ? { backgroundColor: '#f50057' }
                                        : { backgroundColor: '#2563eb' }
                                }
                                className={classes.btn}
                            >
                                Purchased tickets
                            </BootstrapButton>
                            <BootstrapButton
                                onClick={() => {
                                    this.handleClick(1);
                                }}
                                style={
                                    value === 1
                                        ? { backgroundColor: '#f50057' }
                                        : { backgroundColor: '#2563eb' }
                                }
                                className={classes.btn}
                            >
                                Sell Ticket
                            </BootstrapButton>
                        </Box>
                        <NavLink to={'user_events'} className={classes.navLink}>
                            <Button
                                variant="contained"
                                className={classes.btn}
                            >
                                <Typography>
                                    My Events
                                </Typography>
                            </Button>
                        </NavLink>
                    </Box>

                    {value === 0 ? (
                        <Buy listPayments={listPayments} handDeleteSubmit={handDeleteSubmit} />
                    ) : listTickets.length > 0 ? (
                        <Sell listTickets={listTickets} handDeleteSubmit={handDeleteSubmit} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserTrash);
