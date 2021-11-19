import React, { Component } from 'react'
import './styles.css';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { addPost } from '../../../actions/post';
import FormPost from '../../../components/Social/Form';
const account = JSON.parse(localStorage.getItem('account'));
class NewPost extends Component {
    handleCreate = (data, data2) => {
        console.log(data,data2)
        const { addPost } = this.props;
        const newDate = new Date();
        addPost(data, {
            ...data2,
            idAuthor: account.id,
            datePost: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
        });
    }
    render() {
        return (
            <div className="newUser">
                <h1 className="newUserTitle">New Post</h1>
                <FormPost handleMySubmit={this.handleCreate} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: bindActionCreators(addPost, dispatch),
    };
};
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(NewPost);
