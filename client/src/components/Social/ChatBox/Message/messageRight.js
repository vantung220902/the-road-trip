import { withStyles, Menu, MenuItem, Button } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import CloseIcon from '@material-ui/icons/Close';
const menuId = 'primary-search-account-menu';
class MessageRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
        };
    }
    handleProfileMenuOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    };
    renderMenu = () => {
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const { handleDelete, id } = this.props;
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={isMenuOpen}
                onClose={() => { this.setState({ anchorEl: false }); }}
            >
                <MenuItem >
                    <Button variant="text" color="secondary" onClick={() => handleDelete(id)}>
                        <CloseIcon />
                    </Button>
                </MenuItem>
            </Menu>
        );
    };
    render() {
        const { classes } = this.props;
        const message = this.props.message ? this.props.message : "no message";
        const timestamp = this.props.timestamp ? this.props.timestamp : "";
        return (
            <React.Fragment>
                <div className={classes.messageRowRight} onClick={this.handleProfileMenuOpen}>
                    <div className={classes.messageOrange}>
                        <p className={classes.messageContent}>{message}</p>
                        <div className={classes.messageTimeStampRight}>{timestamp}</div>
                    </div>
                </div>
                {this.renderMenu()}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MessageRight);
