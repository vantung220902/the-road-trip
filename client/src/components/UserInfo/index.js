import { withStyles, Box, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import React, { Component } from 'react';
import styles from '../Me/styles';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonAddAlt1Icon from '@material-ui/icons/PersonAdd';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
class UserInfo extends Component {
    render() {
        const { classes, tabDetails, numberPost, person, number, children,
            handleDelete, handleMessage, handleRequest, checked, handleTabs } = this.props;
        const info = person ? person : {};
        return (
            <Box className={classes.app}>
                <Box className={classes.header}>
                    <Box className={`${classes.avt} ${classes.info}`}>
                        <Avatar className={classes.iconAvt}
                            alt={info.fullName}
                            src={info.avt}
                        />
                    </Box>
                    <Box>
                        <Box className={classes.info} mb={4}>
                            <Typography className={classes.name}>
                                {info.fullName}
                            </Typography>
                            <Box className={classes.info}>
                                <Button variant="outlined" className={classes.btn}
                                    onClick={handleMessage}
                                >
                                    Message
                                </Button>
                                {checked === 1 ? (<Button variant="outlined" className={classes.btn}
                                    onClick={handleDelete}
                                >
                                    <CheckIcon />
                                </Button>) : checked === 0 ? (<Button variant="outlined" className={classes.btn}
                                >
                                    <SendIcon />
                                </Button>) :
                                    (<Button variant="outlined" className={classes.btn}
                                        onClick={handleRequest}
                                    >
                                        <AddCircleIcon />
                                    </Button>)}
                                <MoreHorizIcon />
                            </Box>
                        </Box>
                        <Box className={classes.info}>
                            <Typography>
                                <b>{numberPost}</b> Posting
                            </Typography>
                            <Typography>
                                <b>12</b> Friends
                            </Typography>
                            <Typography>
                                <b>{number}</b> Events
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
                            icon={<StorefrontIcon />}
                            label="event"
                        />
                    </Tabs>
                </div>
                <Box className={classes.container}>
                    {numberPost === 0 ? <Typography>
                        You don't have any posts
                    </Typography> : children}
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(UserInfo);
