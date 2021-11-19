import React, { Component } from 'react';
import {
    withStyles,
    Avatar,
    Typography,
    Box,
    CardContent,
    Button,
    TextField,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ScrollToBottom from 'react-scroll-to-bottom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { watchComment, addComment, deleteComment } from '../../../actions/comment';
import SortIcon from '@material-ui/icons/Sort';
import styles from '../Posting/styles';
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            currentComment: '',
            comment: null,
            list: [],
        }
    }
    componentDidMount() {
        const { watchComment, id, socket } = this.props;
        socket.on("receive_comment", (data) => {
            this.setState({ comment: data });
        });
        watchComment(id);
    }
    handleChange = (e) => {
        const value = e.target.value;
        const { currentComment } = this.state;
        if (currentComment !== '') {
            this.setState({ open: false, currentComment: value });
        } else {
            this.setState({ open: true, currentComment: value });
        }
    };
    handleDelete = (id) => {
        const { deleteComment } = this.props;
        deleteComment(id);
    }
    sendComment = async () => {
        const { currentComment } = this.state;
        const { id, addComment, socket } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        const date = new Date();
        const comment = {
            avt: account.avt,
            idCM: -1,
            fullName: account.fullName,
            body: currentComment,
            idPost: id,
            idAuthor: account.id,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        };
        await socket.emit('send_comment', comment);
        addComment(comment);
        this.setState({ open: false, currentComment: "" });
    }
    render() {
        const account = JSON.parse(localStorage.getItem('account'));
        const { classes, listComments } = this.props;
        const { open, currentComment, comment } = this.state;
        const date = new Date();
        return (
            <CardContent>
                <Box className={classes.heading}>
                    <Typography>{listComments.length} Comments</Typography>
                    <Box className={classes.sort}>
                        <Button variant="text">
                            <SortIcon />
                        </Button>
                        <Typography>Sort</Typography>
                    </Box>
                </Box>
                <Box className={classes.comment}>
                    <Avatar
                        alt={`${account.fullName}`}
                        src={`${account.avt}`}
                        variant="rounded"
                        className={classes.avatar}
                    />
                    <TextField
                        className={classes.input}
                        onChange={this.handleChange}
                        label="Enter Your Comment"
                        variant="standard"
                        value={currentComment}


                    />
                </Box>
                <Box className={classes.containerBtn}>
                    <Button className={classes.btn} variant="contained">
                        Cancel
                    </Button>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        disabled={open}
                        onClick={this.sendComment}
                    >
                        Comment
                    </Button>
                </Box>
                <ScrollToBottom className={classes.commentContainer}>
                    {
                        comment ? (<Box className={classes.comments}>
                            <Avatar
                                alt={comment.fullName}
                                src={comment.avt}
                                variant="rounded"
                                className={classes.avatarComment}
                            />
                            <Box className={classes.bodyComment}>
                                <Box className={classes.infoComment}>
                                    <Typography className={classes.nameComment}>
                                        <b>{comment.fullName}</b>
                                    </Typography>
                                    <Typography variant="caption">
                                        {comment.date}
                                    </Typography>
                                    {comment.idAuthor === account.id ? (<Button variant="text"
                                        onClick={() => { this.handleDelete(comment.idPost) }}>
                                        <HighlightOffIcon className={classes.iconDelete} />
                                    </Button>) : null}
                                </Box>
                                <Typography variant="body1">
                                    {comment.body}
                                </Typography>
                            </Box>
                        </Box>) : null}
                    {listComments.map((c) => {
                        return (<Box key={c.idCM} className={classes.comments}>
                            <Avatar
                                alt={c.fullName ? c.fullName : account.fullName}
                                src={c.avt ? c.avt : account.avt}
                                variant="rounded"
                                className={classes.avatarComment}
                            />
                            <Box className={classes.bodyComment}>
                                <Box className={classes.infoComment}>
                                    <Typography className={classes.nameComment}>
                                        <b>{c.fullName ? c.fullName : account.fullName}</b>
                                    </Typography>
                                    <Typography variant="caption">
                                        {c.dateTime ? c.dateTime : date.toLocaleDateString()}
                                    </Typography>
                                    {c.idAuthor === account.id ? (<Button variant="text"
                                        onClick={() => { this.handleDelete(c.idCM) }}>
                                        <HighlightOffIcon className={classes.iconDelete} />
                                    </Button>) : null}
                                </Box>
                                <Typography variant="body1">
                                    {c.body}
                                </Typography>
                            </Box>
                        </Box>)
                    })}
                </ScrollToBottom>
            </CardContent>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listComments: state.comment.listComments,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        watchComment: bindActionCreators(watchComment, dispatch),
        addComment: bindActionCreators(addComment, dispatch),
        deleteComment: bindActionCreators(deleteComment, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Comment);
