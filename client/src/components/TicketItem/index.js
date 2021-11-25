import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Grid, Card } from '@material-ui/core';
import './index.css';
import { NavLink } from 'react-router-dom';
import parse from "html-react-parser";
class TicketItem extends Component {
    render() {
        const { classes, ticket, handleTicket, view } = this.props;
        
        return (
            <Grid
                item
                xs={12}
                sm={6}
                xl={6}
                lg={view}
                onClick={() => {
                    handleTicket
                        ? handleTicket(ticket.id)
                        : console.log('ko có');
                }}
            >
                <Card className={classes.root}>
                    <NavLink to={`/detail/${ticket.id}`} id="container">
                        <div className="wrapper">
                            <div className="product-img">
                                <img
                                    src={`${ticket.image}?w=164&h=164&fit=crop&auto=format`}
                                    height={420}
                                    width={'100%'}
                                    alt="Anh"
                                />
                            </div>
                            <div className="product-info">
                                <div className="product-text">
                                    <h1>{ticket.name}</h1>
                                    <h2>
                                        AuThor:<b>{ticket.fullName}</b>
                                    </h2>
                                    <h2>
                                        Date Start:<b>{ticket.dateStart ?
                                            ticket.dateStart.slice(0, 10) : null}</b>
                                    </h2>
                                    <div className="description">
                                        <p className="descriptionText">
                                            {parse(ticket.description)}
                                        </p>
                                    </div>
                                </div>
                                <div className="product-price-btn">
                                    <p>
                                        <span className="price_ticket">
                                            {ticket.cost}
                                        </span>
                                        $
                                    </p>
                                    <button type="button">buy now</button>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(TicketItem);
