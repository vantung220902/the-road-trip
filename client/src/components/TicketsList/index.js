import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import styles from './styles';

import TicketItem from '../TicketItem';

class TicketsList extends Component {
    render() {
        const { classes, tickets, toggled, handleTicket, view } = this.props;
        if (Array.isArray(tickets)) {
            return (
                <Grid container spacing={4} className={classes.app}>
                    {tickets.map((ticket) => {
                        return (
                            <TicketItem
                                view={view}
                                key={ticket.id}
                                handleTicket={handleTicket}
                                toggled={toggled}
                                ticket={ticket}
                            />
                        );
                    })}
                </Grid>

            );
        } else {
            return null;
        }
    }
}

export default withStyles(styles)(TicketsList);
