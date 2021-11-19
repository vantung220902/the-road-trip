import { withStyles, Box, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import SettingsIcon from '@material-ui/icons/Settings';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonAddAlt1Icon from '@material-ui/icons/PersonAdd';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import { NavLink } from 'react-router-dom';

class Me extends Component {

    render() {
        const { classes, tabDetails, listPost, account, children, handleSetting, handleTabs } = this.props;
        const acc = JSON.parse(localStorage.getItem('account'));
        const me = account ? account : acc;
        return (
            <Box className={classes.app}>
                <Box className={classes.header}>
                    <Box className={`${classes.avt} ${classes.info}`}>
                        <Avatar className={classes.iconAvt}
                            alt={me.fullName}
                            src={me.avt}
                        />
                    </Box>
                    <Box>
                        <Box className={classes.info} mb={4}>
                            <Typography className={classes.name}>
                                {me.fullName}
                            </Typography>
                            <Box className={classes.info}>
                                <Button variant="outlined" className={classes.btn}
                                    onClick={handleSetting}>
                                    Setting information
                                </Button>
                                <SettingsIcon />
                            </Box>
                        </Box>
                        <Box className={classes.info}>
                            <Typography>
                                <b>{listPost.length}</b> Posting
                            </Typography>
                            <Typography>
                                <b>12</b> Friends
                            </Typography>
                            <Typography>
                                <b>{17}</b> Events
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <div className={classes.rootTab}>
                    <Tabs
                        value={tabDetails}
                        onChange={handleTabs}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="secondary"
                        aria-label="icon label tabs example"
                    >
                        <Tab
                            key={1}
                            className={classes.iconTab}
                            icon={<PhotoLibraryOutlinedIcon />}
                            label="Post"
                        />

                        <Tab
                            key={2}
                            className={classes.iconTab}
                            icon={
                                <PersonAddAlt1Icon />}
                            label="Friend"
                        />
                        <Tab
                            key={3}
                            className={classes.iconTab}
                            icon={<NavLink className={classes.nav} to={'/user_events'}>
                                <StorefrontIcon />
                            </NavLink>}
                            label="event"
                        />
                    </Tabs>
                </div>
                <Box className={classes.container}>
                    {listPost.length === 0 ? <Typography>
                        You don't have any posts
                    </Typography> : children}
                </Box>

            </Box>
        );
    }
}



export default withStyles(styles)(Me);
