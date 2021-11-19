import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Typography, CircularProgress, Box, } from '@material-ui/core';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import TicketsList from '../../components/TicketsList';
import { fetchListTickets, getNumbers, loadMoreTickets } from '../../actions/tickets';
import Footer from '../../components/Dashboard/Footer';
import { Alert } from '@material-ui/lab';
import InfiniteScroll from "react-infinite-scroll-component";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            limit: 6
        }
    }
    componentDidMount() {
        const { start, limit } = this.state;
        const { fetchListTickets, getNumbers } = this.props;
        fetchListTickets({ start: start, limit: limit });
        getNumbers();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.tickets !== this.props.tickets) {
            this.setState({ tickets: this.props.tickets });
        }
    }
    loadMore = () => {
        const { loadMoreTickets, tickets } = this.props;        
        loadMoreTickets({ start: tickets.length, limit: tickets.length + 6 });
    };
    render() {
        const { toggled, classes, tickets, sum } = this.props;
        let check = true;
        if (tickets.length === sum) {
            check = false;
        }
        return (
            <div
                className={cn(classes.app, {
                    [classes.backgroundColor]: toggled === false,
                    [classes.backgroundDark]: toggled === true,
                })}
            >
                <Typography variant="h4" className={classes.title}>
                    Best Selling
                </Typography>
                <InfiniteScroll
                    dataLength={tickets.length} //This is important field to render the next data
                    next={this.loadMore}
                    hasMore={check}
                    loader={<Box className={classes.loader}>
                        <CircularProgress />
                    </Box>}
                    endMessage={<Box className={classes.loader}>
                        <Alert severity="success" variant="filled" >You seen all the event!</Alert>
                    </Box>}
                >
                    <TicketsList view={6} toggled={toggled} tickets={tickets} check={check} />
                </InfiniteScroll>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        toggled: state.ui.toggled,
        tickets: state.tickets.listTickets,
        sum: state.tickets.count,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchListTickets: bindActionCreators(fetchListTickets, dispatch),
        getNumbers: bindActionCreators(getNumbers, dispatch),
        loadMoreTickets: bindActionCreators(loadMoreTickets, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(HomePage);
