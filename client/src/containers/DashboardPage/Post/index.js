import React, { Component } from 'react'
import {
    CalendarToday
} from "@material-ui/icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { findPost, updatePost } from './../../../actions/post';
import FormPost from '../../../components/Social/Form/index';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
        }
    }
    componentDidMount() {
        const { match, findPost } = this.props;
        const { id } = match.params;
        findPost(id);
    }
    componentDidUpdate(prevProps) {
        const { listPost } = this.props;
        if (prevProps.listPost !== listPost) {
            this.setState({ post: listPost[0] })
        }
    }
    onHandleUpdateSubmit = (data, data2) => {
        const { updatePost, listPost } = this.props;
        const post = listPost[0];
        if (data.length > 0) {
            updatePost(post.id, data, {
                tittle: data2.tittle
            }, true);
        } else {
            updatePost(post.id, post.body, {
                tittle: data2.tittle,
            }, false);
        }
    };
    render() {
        const { listPost } = this.props;
        const post = this.state.post ? this.state.post : listPost[0];
        const arrImg = post ? post.body.split(';') : [];
        if (!post) {
            return null;
        }
        return (
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Edit Post</h1>
                    <NavLink to="/dashboard_event/newUser">
                        <button className="userAddButton">Create</button>
                    </NavLink>
                </div>
                <div className="userContainer">
                    <div className="userShow">
                        <div className="userShowTop">
                            <img
                                src={`${post.avt}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                alt="anh"
                                className="userShowImg"
                            />
                            <div className="userShowTopTitle">
                                <p>{post.fullName}</p>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">{post.tittle}</span>
                            <div className="userShowInfo">
                                <CalendarToday className="userShowIcon" />
                                <span className="userShowInfoTitle">{post.datePost ? post.datePost.slice(0, 10) : null}</span>
                            </div>
                            <div className="userShowInfo">
                                <FavoriteIcon className="userShowIcon" />
                                <span className="userShowInfoTitle"> {post.rating}</span>
                            </div>
                            <div >
                                {
                                    arrImg.map((img, i) => {
                                        if (img !== "") {
                                            return (
                                                <div style={{ width: "100%", marginBottom: 12 }} key={i}>
                                                    <img
                                                        style={{ width: "100%", height: 200, objectFit: "cover" }}
                                                        src={`${img}?auto=compress&cs=tinysrgb&dpr=2&w=500`}
                                                        alt="anh"
                                                    />
                                                </div>
                                            )
                                        } else {
                                            return null;
                                        }

                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="userUpdate maxWUpload">
                        <span className="userUpdateTitle">Edit</span>
                        <FormPost handleMySubmit={this.onHandleUpdateSubmit} post={post} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listPost: state.post.listPost,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        findPost: bindActionCreators(findPost, dispatch),
        updatePost: bindActionCreators(updatePost, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Post);