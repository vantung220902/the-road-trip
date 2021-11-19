import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import SearchHelper from '../../../components/SearchHelper';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import NavTimes from '../../../components/SearchHelper/NavTimes';
import TicketsList from '../../../components/TicketsList';
import {
    fetchListTickets,
    loadMoreTickets,
    filterTickets,
} from '../../../actions/tickets';
import LoadMore from '../../../components/ButtonLoadMore';
class SearchTickets extends Component {
    componentDidMount() {
        const { fetchListTickets } = this.props;
        fetchListTickets({ start: 0, limit: 6 });
    }
    loadMore = () => {
        const { tickets, loadMoreTickets } = this.props;
        let sizeTickets = tickets.length;
        if (sizeTickets) {
            loadMoreTickets({ start: sizeTickets, limit: 6 });
        }
    };
    renderLoadMore = () => {
        let xhtml = null;
        xhtml = <LoadMore loadMore={this.loadMore} />;
        return xhtml;
    };
    handleChange = (e) => {
        const { value } = e.target;
        const { filterTickets } = this.props;
        filterTickets(value);
    };
    render() {
        const { classes, toggled, tickets } = this.props;
        return (
            <div className={classes.app}>
                <SearchHelper handleChange={this.handleChange} />
                <NavTimes toggled={toggled} />
                <TicketsList toggled={toggled} tickets={tickets} />
                {this.renderLoadMore()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        toggled: state.ui.toggled,
        tickets: state.tickets.listTickets,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchListTickets: bindActionCreators(fetchListTickets, dispatch),
        loadMoreTickets: bindActionCreators(loadMoreTickets, dispatch),
        filterTickets: bindActionCreators(filterTickets, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(SearchTickets);
