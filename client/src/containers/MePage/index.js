import { withStyles, Typography, Box, Button, Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import Me from '../../components/Me';
import * as actionModal from '../../actions/modalAction';
import Modal from '../../components/Modal';
import { myPost, addPost } from '../../actions/post';
import Posting from '../../components/Social/Posting';
import FormMe from '../../components/Me/Form';
import { updateUser } from '../../actions/signInUp';
import { deletedPosts, updatePost } from '../../actions/post';
import FormPost from '../../components/Social/Form';
import { RenderTabsDetail } from '../../actions/ui';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getFriends } from '../../actions/friends';
import { Add } from '@material-ui/icons';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Friend from '../../components/Social/Friend';
const acc = JSON.parse(localStorage.getItem('account'));
class MePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticked: false,
            checked: false,
            id: -1,
            checkBox: new Set(),
        }
    }
    componentDidMount() {
        const { myPost, getFriends } = this.props;
        myPost(acc.id);
        getFriends(acc.id);
    }
    componentDidUpdate(prevProps) {
        const { account } = this.props;
        if (prevProps.account !== account) {
            this.setState({ ticked: true })
        }
    }
    onHandleUpdateSubmit = (data, data2) => {
        const { updatePost, actionModal } = this.props;
        const { post } = this.state;
        const { hideModel } = actionModal;
        if (data.length > 0) {
            updatePost(post.id, data, {
                tittle: data2.tittle
            }, true);
        } else {
            updatePost(post.id, post.body, {
                tittle: data2.tittle,
            }, false);
        }
        hideModel();
    };
    handleOpenUpdate = (post) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('Update Post');
        ChangeModel(<FormPost handleMySubmit={this.onHandleUpdateSubmit} post={post} />, "auto");
        this.setState({ post: post })
    };
    handDeleteSubmit = (value) => {
        const { actionModal, classes } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete Post');
        ChangeModel((<Box className={classes.model}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to delete
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button className={classes.btn} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={() => { this.handleConfirm(value); }} variant="contained" color="secondary">
                    Delete
                </Button>
            </Box>
        </Box>), "240px");
    }
    componentWillMount() {
        this.checkedBox = new Set();
    }
    handleCheckBox = (e) => {
        const value = e.target.value;
        const { listPost } = this.props;
        const checkAll = document.querySelector('input[name="checkAll"]');
        const lengthCheck = document.querySelectorAll('input[name="checkIDs[]"]:checked').length;
        if (listPost.length === lengthCheck) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
        if (lengthCheck > 0) {
            this.setState({ checked: true });
        } else {
            this.setState({ checked: false });
        }
        if (this.checkedBox.has(value)) {
            this.checkedBox.delete(value);
        } else {
            this.checkedBox.add(value);
        }
        this.setState({
            checkBox: this.checkedBox
        });
    }
    handleTabs = (e, value) => {
        const { renderTabsDetail } = this.props;
        renderTabsDetail(value);
    };
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
            idAuthor: acc.id,
            datePost: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
        });
        hideModel();
    }
    handleSetting = () => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('Setting Information');
        ChangeModel(
            <React.Fragment>
                <Box mb={4} >
                    <Avatar alt={acc.fullName} src={acc.avt} />
                </Box>
                <FormMe handleMySubmit={this.handleSubmit} account={acc} />

            </React.Fragment>, "auto");

    }
    onSubmit = (e) => {
        e.preventDefault();
        this.handDeleteSubmit();
    }
    handleConfirm = (value) => {
        const { deletedPosts } = this.props;
        if (value !== undefined) {
            deletedPosts([value]);
        } else {
            const array = [];
            this.checkedBox.forEach((value) => {
                array.push(value)
            });
            console.log(array);
            deletedPosts([...array]);
        }
        const { actionModal } = this.props;
        const { hideModel } = actionModal;
        hideModel();
    }
    handleAll = () => {
        const checkAll = document.querySelector('input[name="checkAll"]').checked;
        const checkBox = document.querySelectorAll('input[name="checkIDs[]"]');
        checkBox.forEach(e => {
            e.checked = checkAll;
            if (this.checkedBox.has(e.value)) {
                this.checkedBox.delete(e.value);
            } else {
                this.checkedBox.add(e.value);
            }
        })
        this.setState({ checked: checkAll, checkBox: this.checkedBox });
    }
    handleSubmit = (data, data2) => {
        const { updateUser, actionModal } = this.props;
        const { hideModel } = actionModal;
        if (data instanceof File) {
            const formData = new FormData();
            formData.append('file', data);
            formData.append('upload_preset', 'y58ntib0');
            updateUser(formData, {
                ...data2,
                id: acc.id,
            }, true);
        } else {
            updateUser(acc.avt, {
                ...data2,
                id: acc.id,
            }, false);
        }
        hideModel();
    }
    renderTabs = () => {
        const { listPost, tabDetails, listFriends } = this.props;
        const { checked } = this.state;
        // xhtml = ({ 0: <About description={description} />, 1: <Discussion />, 2: <Picture /> }[tabDetails] ?? null);
        let xhtml =
            tabDetails === 1 ? (
                listFriends.length > 0 ? listFriends.map((friend) => {
                    return <Friend avt={friend.avt} fullName={friend.fullName}
                        person1ID={friend.person1ID} person2ID={friend.person2ID}
                        check={true}
                        key={friend.id} />
                }) : (<Typography color="secondary">
                    This user don't have any friends.
                </Typography>)
            ) : (<form onSubmit={this.onSubmit}>
                <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                        <input type="checkbox" name="checkAll" onChange={this.handleAll} />
                        <Typography>
                            ALL
                        </Typography>
                    </Box>
                    <Button variant="contained" type="submit" color="secondary"
                        disabled={checked ? false : true} style={{ margin: '0 12px', }}>
                        Delete <HighlightOffIcon />
                        </Button>
                        <Button variant="contained" color="primary"
                            onClick={this.handleOpenForm}
                            style={{ marginRight: 12 }}>
                            Create <Add />
                        </Button>
                </Box>
                {listPost.map(post => {
                    return (
                        <Box key={post.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <input type="checkbox" name="checkIDs[]" value={post.id}
                                onChange={this.handleCheckBox} style={{ width: 20, height: 20 }} />
                            <Posting key={post.id} post={post} handleDelete={this.handDeleteSubmit} handleUpdate={this.handleOpenUpdate} />
                        </Box>
                    )
                })}
            </form>);
        return xhtml;
    };
    render() {
        const { classes, listPost, account, tabDetails } = this.props;
        return (
            <div className={classes.app} >
                <Me listPost={listPost} account={account}
                    tabDetails={tabDetails}
                    handleSetting={this.handleSetting}
                    handleTabs={this.handleTabs}
                >
                    {this.renderTabs()}
                </Me>
                <Modal />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tabDetails: state.ui.tabDetails,
        listPost: state.post.listPost,
        account: state.sign.account,
        listFriends: state.friends.listFriends,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        renderTabsDetail: bindActionCreators(RenderTabsDetail, dispatch),
        myPost: bindActionCreators(myPost, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
        deletedPosts: bindActionCreators(deletedPosts, dispatch),
        updatePost: bindActionCreators(updatePost, dispatch),
        getFriends: bindActionCreators(getFriends, dispatch),
        addPost: bindActionCreators(addPost, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(MePage);
