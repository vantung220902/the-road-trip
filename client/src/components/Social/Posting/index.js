import React, { Component } from 'react';
import {
    withStyles,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    styled,
    Collapse,
    Tooltip,
    Menu,
    MenuItem,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './styles';
import Comment from '../Comments';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { likePost } from '../../../actions/post';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const menuId = 'primary-search-account-menu';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const account = JSON.parse(localStorage.getItem('account'));
class Posting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            like: 0,
            checked: false,
            anchorEl: false,
        };
    }
    handleProfileMenuOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    };
    handleExpandClick = (id) => {
        const { expanded } = this.state;
        this.setState({ expanded: !expanded });
    };
    handleLike = () => {
        const { checked, like } = this.state;
        const { post, likePost } = this.props;
        if (checked && like !== 0) {
            likePost({ id: post.id, value: -1 });
            this.setState({ like: post.rating - 1 === -1 ? 0 : post.rating, checked: !checked });
        } else {
            likePost({ id: post.id, value: 1 });
            this.setState({ like: post.rating + 1, checked: !checked });
        }

    }

    renderMenu = () => {
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const { handleDelete, post, handleUpdate } = this.props;
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={() => { this.setState({ anchorEl: false }); }}
            >

                <MenuItem >
                    <Button variant="text" color="primary" onClick={() => handleUpdate(post)}>
                        Update  <SettingsIcon />
                    </Button>
                </MenuItem>
                <MenuItem >
                    <Button variant="text" color="secondary" onClick={() => { handleDelete(post.id) }}>
                        Delete  <HighlightOffIcon />
                    </Button>
                </MenuItem>
            </Menu>
        );
    };
    render() {
        const { classes, post, socket } = this.props;
        const { expanded, like, checked } = this.state;
        const arrImg = post.body.split(';');
        const xhtml = post.idAuthor === account.id ?
            (<IconButton aria-label="settings" onClick={this.handleProfileMenuOpen}>
                <MoreVertIcon />
            </IconButton>) : null;
        return (
            <Card sx={{ boxShadow: 3 }} className={classes.app}>
                <CardHeader
                    avatar={
                        <NavLink to={post.idAuthor !== account.id?`person/${post.idAuthor}`:`me`}>
                            <Avatar
                                sx={{ width: 56, height: 62 }}
                                src={
                                    `${post.avt ? post.avt : account.avt}`
                                }
                                alt="avatar"
                                variant="rounded"
                            />
                        </NavLink>

                    }
                    action={
                        xhtml
                    }
                    title={
                        <Typography variant="h6">
                            {post.fullName ? post.fullName : account.fullName}
                        </Typography>
                    }
                    subheader={post.datePost.slice(0, 10)}
                />
                {this.renderMenu()}
                <CardContent>
                    <Typography variant="body2">
                        {post.tittle}
                    </Typography>
                </CardContent>
                <div className={classes.gridContainer}>
                    {
                        arrImg.map((img, i) => {
                            if (img !== "") {
                                return (
                                    <div key={i} className={classes.column} >
                                        <CardMedia
                                            component="img"
                                            className={classes.img}
                                            image={`${img}`}
                                            alt="Paella dish"
                                        />
                                    </div>
                                )
                            } else {
                                return null;
                            }

                        })
                    }

                </div>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={this.handleLike}>
                        {like === 0 ? post.rating : like}
                        <Tooltip title="Add to favorites" color={checked ? "secondary" : "inherit"}>
                            <FavoriteIcon />
                        </Tooltip>
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={() => { this.handleExpandClick(post.id) }}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <Tooltip title="Comments">
                            <ExpandMoreIcon />
                        </Tooltip>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {expanded ? <Comment id={post.id} socket={socket} /> : null}
                </Collapse>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likePost: bindActionCreators(likePost, dispatch),
    };
};
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Posting);
