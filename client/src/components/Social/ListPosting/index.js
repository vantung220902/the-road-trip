import { CircularProgress, Box, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import Posting from '../Posting';
import { bindActionCreators, compose } from 'redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
import { watchPost, loadMorePost, addPost, numberPost } from '../../../actions/post';
import { Alert } from '@material-ui/lab';
import * as actionModal from '../../../actions/modalAction';
import Modal from '../../Modal';
import FormPost from '../Form';
import CreatePost from '../CreatePost';
const account = JSON.parse(localStorage.getItem('account'));
class ListPosting extends Component {
    constructor(props) {
        super(props);
        const { socket } = this.props;
        socket.emit("join_room", `Post`);
        this.state = {
            listPost: []
        }
    }
    componentDidMount() {
        const { watchPost, numberPost } = this.props;
        watchPost({ start: 0, limit: 4 });
        numberPost()

    }
    loadMore = () => {
        const { loadMorePost, listPost } = this.props;
        let sizePost = listPost.length;
        if (sizePost) {
            loadMorePost({ start: sizePost, limit: sizePost + 4 });
        }
    };
    componentDidUpdate(prevProps) {
        if (prevProps.listPost !== this.props.listPost) {
            this.setState({ listPost: this.props.listPost });
        }
    }
    handleOpenForm = () => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('Create Post');
        ChangeModel(<FormPost handleMySubmit={this.handleCreate} />, "auto");
    }
    handleCreate = (data, data2) => {
        const { addPost, actionModal } = this.props;
        const { hideModel } = actionModal;
        const newDate = new Date();
        addPost(data, {
            ...data2,
            idAuthor: account.id,
            datePost: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
        });
        hideModel();
    }

    render() {
        const { classes, listPost, count, socket } = this.props;
        if (Array.isArray(listPost)) {
            let check = true;
            if (listPost.length === count) {
                check = false;
            }
            return (
                <React.Fragment>
                    <CreatePost handleOpenForm={this.handleOpenForm} />
                    {listPost.length > 0 ? (<InfiniteScroll
                        dataLength={listPost.length} //This is important field to render the next data
                        next={this.loadMore}
                        hasMore={check}
                        loader={<Box className={classes.loader}>
                            <CircularProgress />
                        </Box>}
                        endMessage={<Alert severity="success" >You seen all the news!</Alert>}
                    >
                        <div className={classes.app}>

                            {listPost.map((post, index) => {
                                return <Posting key={index} post={post} socket={socket} handleDelete={this.handDeleteSubmit}
                                />
                            })}
                        </div>
                    </InfiniteScroll>) : <Alert severity="success" >Don't have any news!</Alert>}
                    <Modal />
                </React.Fragment>
            );
        } else {
            return null;
        }

    }
}
const mapStateToProps = (state) => {
    return {
        listPost: state.post.listPost,
        count: state.post.count
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        watchPost: bindActionCreators(watchPost, dispatch),
        loadMorePost: bindActionCreators(loadMorePost, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        addPost: bindActionCreators(addPost, dispatch),
        numberPost: bindActionCreators(numberPost, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ListPosting);
