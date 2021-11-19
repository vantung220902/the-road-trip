import {
    Grid,
    withStyles,
    Drawer,
    Button,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import ItemAvt from '../../components/Social/ItemAvt';
import ListInvitations from '../../components/Social/ListInvitations';
import ListStories from '../../components/Social/ListStories';
import ListPosting from '../../components/Social/ListPosting';
import ListRequest from '../../components/Social/ListRequest';
import ListFriends from '../../components/Social/ListFriends';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactsIcon from '@material-ui/icons/Contacts';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventIcon from '@material-ui/icons/Event';
import { socket } from '../../comom/socket';

class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 0,
        };
    }
    renderDrawer = (e, newValue) => {
        this.setState({
            open: newValue !== 0 ? true : false,
            value: newValue,
        });
    };
    handleDrawerClose = () => {
        this.setState({
            open: false,
            value: 0,
        });
    };


    render() {
        const { classes } = this.props;
        const { open, value } = this.state;
        return (
            <div>
                <Grid container spacing={3} className={classes.app}>
                    <Grid item className={`${classes.item} ${classes.itemLeft}`}>
                        <ItemAvt />
                        <ListInvitations />

                    </Grid>
                    <Grid
                        className={classes.content}
                        item
                    >
                        <ListStories socket={socket} />
                        <ListPosting socket={socket} />
                        <Paper className={classes.bottomNav} elevation={3}>
                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    this.renderDrawer(event, newValue);
                                }}
                            >
                                <BottomNavigationAction
                                    label="News"
                                    icon={<FavoriteIcon />}
                                />
                                <BottomNavigationAction
                                    label="Invitation"
                                    icon={<EventIcon />}
                                />
                                <BottomNavigationAction
                                    label="Contacts"
                                    icon={<ContactsIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                        <Drawer
                            anchor={value === 1 ? 'left' : 'right'}
                            open={open}
                            onClose={this.handleDrawerClose}
                            style={{ zIndex: 200 }}
                        >
                            <Grid item className={classes.buttonRightActive}>
                                <Button onClick={this.handleDrawerClose}>
                                    {this.state.open ? (
                                        <ChevronLeftIcon />
                                    ) : (
                                        <ChevronRightIcon />
                                    )}
                                </Button>
                                {value === 2 ? (
                                    <Grid item className={classes.itemMo}>
                                        <ListRequest socket={socket}/>
                                        <ListFriends />
                                    </Grid>
                                ) : value === 1 ? (
                                    <Grid item className={classes.itemMo}>
                                        <ItemAvt />
                                        <ListInvitations />
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Drawer>

                    </Grid>
                    <Grid item className={`${classes.item} ${classes.itemRight}`}>
                        <ListRequest socket={socket} />
                        <ListFriends />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(Social);