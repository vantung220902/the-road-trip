import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Typography, Button, Tab, Tabs } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import './main.css';
import BootstrapButton from '../../components/BtnOutline';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { findIDTickets } from './../../actions/tickets';
import { RenderTabsDetail } from '../../actions/ui';
import About from '../../components/TabsTicket/About';
import Discussion from '../../components/TabsTicket/Discussion';
import Picture from '../../components/TabsTicket/Picture';
import SimpleMap from '../../components/GoogleMap';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { fetchListTickets, findIDTicketsSuccess } from '../../actions/tickets';
import TicketsList from '../../components/TicketsList';
import { ShowLoading, HideLoading } from '../../actions/ui';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: null,
        };
    }
    componentDidMount() {
        const { match, findIDTicket, fetchListTickets } = this.props;
        const { id } = match.params;
        findIDTicket(id);
        fetchListTickets({ start: 0, limit: 6 });
    }

    handleTabs = (e, value) => {
        const { renderTabsDetail } = this.props;
        renderTabsDetail(value);
    };
    renderTabs = () => {
        const { tabDetails } = this.props;
        const ticket = this.props.ticket;
        let xhtml = null;
        if (ticket) {
            const { description, dateStart, dateEnd, time } = ticket;
            // xhtml = ({ 0: <About description={description} />, 1: <Discussion />, 2: <Picture /> }[tabDetails] ?? null);
            xhtml =
                tabDetails === 1 ? (
                    <Discussion />
                ) : tabDetails === 2 ? (
                    <Picture />
                ) : (
                    <About
                        description={description}
                        dateStart={dateStart}
                        dateEnd={dateEnd}
                        time={time}
                    />
                );
        }
        return xhtml;
    };
    renderMap = () => {
        let center = {
            lat: 21.02425,
            lng: 105.85469,
        };
        return <SimpleMap center={center} zoom={8} />;
    };
    renderView = () => {
        let xhtml = null;
        const { classes } = this.props;
        const { ticket } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        if (ticket) {
            xhtml = (
                <React.Fragment>
                    <div
                        style={{
                            backgroundImage: `url(${ticket.image})`,
                        }}
                        className="img"
                    >
                        <div className="information">
                            <div className={classes.info}>
                                <Button className={classes.iconBack}>
                                    <KeyboardBackspaceIcon />
                                    <NavLink to="/" className={classes.navLink}>
                                        <Typography
                                            className={classes.textBack}
                                        >
                                            Back
                                        </Typography>
                                    </NavLink>
                                </Button>
                                <Typography className={classes.heading}>
                                    {ticket.name}
                                </Typography>
                                <Typography className={classes.author}>
                                    {ticket.author}
                                </Typography>
                                <Typography className={classes.location}>
                                    {ticket.place}
                                </Typography>
                                <Button className={classes.where}>
                                    <LocationOnOutlinedIcon
                                        className={classes.iconLocation}
                                    />
                                    View Map
                                </Button>
                                <Button
                                    className={classes.report}
                                    variant="contained"
                                    color="secondary"
                                >
                                    <ReportProblemOutlinedIcon />
                                    <Typography className={classes.textReport}>
                                        Report this event
                                    </Typography>
                                </Button>
                            </div>
                            <div className={classes.formBuy}>
                                <Typography className={classes.headingDate}>
                                    Date & Time
                                </Typography>
                                <Typography className={classes.dateTime}>
                                    {ticket.dateStart} to {ticket.dateEnd}
                                </Typography>
                                <Typography className={classes.dateTime}>
                                    Time: {ticket.time}
                                </Typography>
                                <Typography className={classes.remainingTicket}>
                                    Remaining tickets: {ticket.number}
                                </Typography>
                                <Button className={classes.calendar}>
                                    <EventOutlinedIcon /> Watch to Calendar
                                </Button>

                                <NavLink
                                    className={classes.navLink}
                                    to={
                                        account
                                            ? `/payments/${ticket.id}`
                                            : `/login`
                                    }
                                >
                                    <BootstrapButton
                                        className={classes.btnBuy}
                                        variant="contained"
                                    >
                                        Book now(
                                        {ticket.cost === 0
                                            ? 'Free'
                                            : ticket.cost}
                                        )
                                    </BootstrapButton>
                                </NavLink>
                                <Button
                                    className={classes.btnPromote}
                                    variant="contained"
                                >
                                    Promote Program
                                </Button>
                                <Typography className={classes.refund}>
                                    No refund
                                </Typography>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return xhtml;
    };
    renderTickets = () => {
        const { tickets, toggled } = this.props;
        let xhtml = null;
        if (tickets)
            xhtml = (
                <TicketsList
                    toggled={toggled}
                    view={6}
                    handleTicket={this.reRenderTicket}
                    tickets={tickets}
                />
            );
        return xhtml;
    };
    reRenderTicket = (id) => {
        const { tickets, ShowLoading, HideLoading, findIDTicketsSuccess } =
            this.props;
        ShowLoading();
        let ticket = tickets.find(
            (t) => parseInt(t.id, 10) === parseInt(id, 10),
        );
        findIDTicketsSuccess(ticket);
        window.scrollTo(0, 0);
        setTimeout(HideLoading, 1000);
    };
    render() {
        const { classes, ticket, toggled, tabDetails } = this.props;
        return (
            <div
                className={cn(classes.app, {
                    [classes.backgroundColor]: toggled === false,
                    [classes.backgroundDark]: toggled === true,
                })}
            >
                {this.renderView()}
                <div className={classes.detail}>
                    <div className={classes.rootTab}>
                        <Tabs
                            value={tabDetails}
                            onChange={this.handleTabs}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="secondary"
                            aria-label="icon label tabs example"
                        >
                            <Tab
                                key={1}
                                className={classes.iconTab}
                                icon={<InfoOutlinedIcon />}
                                label="About"
                            />
                            ,
                            <Tab
                                key={2}
                                className={classes.iconTab}
                                icon={<ShareOutlinedIcon />}
                                label="Discussion"
                            />
                            ,
                            <Tab
                                key={3}
                                className={classes.iconTab}
                                icon={<PhotoLibraryOutlinedIcon />}
                                label="Picture"
                            />
                        </Tabs>
                    </div>
                    <div className={classes.detailItem}>
                        {this.renderTabs()}
                        <div className={classes.mapContainer}>
                            <div className={classes.map}>
                                {this.renderMap()}
                            </div>
                            <Typography variant="h3" className={classes.author}>
                                {ticket ? ticket.author : ''}
                            </Typography>
                            <Typography className={classes.location}>
                                {ticket ? ticket.place : ''}
                            </Typography>
                            <div className={classes.share}>
                                <Typography variant="h3">
                                    Share with Friends
                                </Typography>
                                <FacebookIcon className={classes.iconShare} />
                                <InstagramIcon className={classes.iconShare} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Typography variant="h3">
                            Other event you may like
                        </Typography>
                        {this.renderTickets()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        toggled: state.ui.toggled,
        ticket: state.tickets.ticket,
        tabDetails: state.ui.tabDetails,
        tickets: state.tickets.listTickets,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findIDTicket: bindActionCreators(findIDTickets, dispatch),
        renderTabsDetail: bindActionCreators(RenderTabsDetail, dispatch),
        fetchListTickets: bindActionCreators(fetchListTickets, dispatch),
        ShowLoading: bindActionCreators(ShowLoading, dispatch),
        HideLoading: bindActionCreators(HideLoading, dispatch),
        findIDTicketsSuccess: bindActionCreators(
            findIDTicketsSuccess,
            dispatch,
        ),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(Detail);
