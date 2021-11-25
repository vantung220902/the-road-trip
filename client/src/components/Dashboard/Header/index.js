import React, { Component } from 'react';
import styles from './styles';
import {
    Container,
    Grid,
    Typography,
    withStyles,
    Button,
    Tab,
    Menu,
    MenuItem,
    IconButton,
    Avatar,
    Drawer, Badge
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Toggle from './../Toggle/index';
import { ToggleDark, HandleTabs } from '../../../actions/ui';
import { NavLink, Redirect } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import GroupsOutlinedIcon from '@material-ui/icons/GroupOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import TabsTicket from './../../TabsTicket';
import SearchIcon from '@material-ui/icons/Search';
import { SignOut } from '../../../actions/signInUp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const menuId = 'primary-search-account-menu';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEL: null,
            open: false,
            redirect: false
        };
    }
    handleProfileMenuOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };
    handleTabs = (e, newValue) => {
        const { HandleTabs } = this.props;
        HandleTabs(newValue);
    };
    handleToggle = () => {
        const { toggled, ToggleDark } = this.props;
        ToggleDark(toggled);
    };
    handleLogout = () => {
        const { SignOut } = this.props;
        SignOut();
        const account = JSON.parse(localStorage.getItem('account'));
        if (account) {
            localStorage.removeItem('account');
        }
        this.handleMenuClose();
        this.setState({ redirect: true })
    };
    renderMenu = () => {
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const { classes, account } = this.props;
        let acc = account ? account : JSON.parse(localStorage.getItem('account'));
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >

                <MenuItem>
                    <NavLink to="/me" className={classes.nav}>
                        My Page
                    </NavLink>
                </MenuItem>
                {acc.role === 'admin' ?
                    <MenuItem>
                        <NavLink to="/dashboard_event" className={classes.nav}>
                           DashBoard
                        </NavLink>
                    </MenuItem> : null

                }
                <MenuItem>
                    <NavLink to="/user_events" className={classes.nav}>
                        My Event
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );
    };

    handleDrawerOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleDrawerClose = () => {
        this.setState({
            open: false,
        });
    };
    renderTabs = (vector) => {
        const { tabs, classes } = this.props;
        return (
            <Grid item className={classes.navigation}>
                <TabsTicket
                    value={tabs}
                    vector={vector}
                    className={classes.tabs}
                    icons={[
                        <Tab
                            key={1}
                            value={1}
                            icon={
                                <NavLink
                                    className={classes.navTabs}
                                    to={'/social'}
                                >
                                    <GroupsOutlinedIcon
                                        className={classes.iconNav}
                                    />
                                </NavLink>
                            }
                        />,
                        <Tab
                            key={2}
                            value={0}
                            icon={
                                <NavLink
                                    className={classes.navTabs}
                                    to={'/'}
                                >
                                    <StorefrontOutlinedIcon
                                        className={classes.iconNav}
                                    />
                                </NavLink>
                            }
                        />,
                        <Tab
                            key={3}
                            value={2}
                            icon={
                                <NavLink
                                    className={classes.navTabs}
                                    to={'/schedule_events'}
                                >
                                    <EventAvailableOutlinedIcon
                                        className={classes.iconNav}
                                    />
                                </NavLink>
                            }
                        />,
                    ]}
                    handleTabs={this.handleTabs}
                />
            </Grid>
        );
    };
    renderButtonRight = (acc) => {
        const { classes, toggled } = this.props;
        const xhtml = acc ? (
            <React.Fragment>
                <NavLink to="/searchTickets" className={classes.nav}>
                    <SearchIcon className={classes.iconSearch} />
                </NavLink>
                {this.renderMenu()}
                <Badge badgeContent={4} color="secondary" className={classes.containerBelt}>
                    <NotificationsNoneOutlinedIcon className={classes.belt} />
                </Badge>
                <div>
                    <Avatar
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                        className={classes.avt}
                        src={acc.avt}
                    > {acc.fullName}</Avatar>
                </div>
                <Toggle onClick={this.handleToggle} toggled={toggled} />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <NavLink to="/login" className={classes.nav}>
                    <Button className={classes.button} variant="contained">
                        Login
                    </Button>
                </NavLink>
                <NavLink to="/register" className={classes.nav}>
                    <Button className={classes.button2} variant="contained">
                        Sign up
                    </Button>
                </NavLink>
            </React.Fragment>
        );
        return xhtml;
    };
    render() {
        const { classes, toggled, account } = this.props;
        const { redirect } = this.state;
        let acc = account ? account : JSON.parse(localStorage.getItem('account'));
        if (redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <Container fixed className={classes.header}>
                <Grid
                    container
                    className={cn(classes.headerContainer, {
                        [classes.backgroundColor]: toggled === false,
                        [classes.backgroundDark]: toggled === true,
                    })}
                >
                    <Grid item className={classes.item}>
                        <NavLink to="/" className={classes.nav}>
                            <Typography
                                className={cn(classes.title, {
                                    [classes.tittleWhite]: toggled === true,
                                    [classes.tittleDark]: toggled === false,
                                })}
                                variant="h6"
                                noWrap
                            >
                                The Road Trip
                            </Typography>
                        </NavLink>
                    </Grid>
                    {acc ? this.renderTabs('horizontal') : null}
                    <Grid item className={classes.buttonRightActive}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={this.handleDrawerOpen}
                            sx={{ ...(this.state.open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className={classes.buttonRight}>
                        {this.renderButtonRight(acc)}
                    </Grid>
                </Grid>

                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={this.state.open}
                    onClose={this.handleDrawerClose}
                >
                    <Grid item className={classes.buttonRightActive}>
                        <Button onClick={this.handleDrawerClose}>
                            {this.state.open ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </Button>
                        {this.renderButtonRight(acc)}
                    </Grid>
                </Drawer>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        toggled: state.ui.toggled,
        account: state.sign.account,
        tabs: state.ui.tabs,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        ToggleDark: bindActionCreators(ToggleDark, dispatch),
        SignOut: bindActionCreators(SignOut, dispatch),
        HandleTabs: bindActionCreators(HandleTabs, dispatch),
    };
};

Header.propTypes = {
    classes: PropTypes.object,
    toggled: PropTypes.bool,
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(Header);
