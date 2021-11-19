import React, { Component } from 'react'
import "./styles.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Add } from "@material-ui/icons";
import { Box, Typography } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { watchPost, deletedPosts } from '../../../actions/post';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Modal from '../../../components/Modal';
import * as actionModal from '../../../actions/modalAction';
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { watchPost } = this.props;
        watchPost({ start: 0, limit: 100 });
    }
    componentDidUpdate(prevProps) {
        const { listPost } = this.props;
        if (prevProps.listPost !== listPost) {
            this.setState({ checked: true })
        }
    }
    handDeleteSubmit = (id) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete Post');
        ChangeModel((<Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to delete
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button style={{ margin: '0 12px' }} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={() => { this.handleConfirm(id) }} variant="contained" color="secondary">
                    Delete
                </Button>
            </Box>
        </Box>), "240px");
    }
    handleRowSelection = (e) => {
        if (e.length > 0) {
            this.setState({ arrayIds: e, checked: false });
        } else {
            this.setState({ checked: true });
        }
    }
    handleConfirm = (value) => {
        const { deletedPosts } = this.props;
        if (value !== null) {
            deletedPosts([value]);
        } else {
            const { arrayIds } = this.state;
            deletedPosts(arrayIds);
        }
        const { actionModal } = this.props;
        const { hideModel } = actionModal;
        hideModel();
    }
    componentWillMount() {
        this.columns = [
            { field: "id", headerName: "ID", width: 90 },
            {
                field: "fullName",
                headerName: "Name",
                width: 200,
                renderCell: (params) => {
                    return (
                        <NavLink to={`/dashboard_event/user/${params.row.idAuthor}`} className="link">
                            <div className="userListUser">
                                <img className="userListImg" src={params.row.avt} alt="" />
                                {params.row.fullName}
                            </div>
                        </NavLink>
                    );
                },
            },
            { field: "tittle", headerName: "Tittle", width: 200 },
            {
                field: "body", headerName: "image", width: 200,
                renderCell: (params) => {
                    const arrImg = params.row.body.split(';');
                    return (
                        <NavLink to={`/dashboard_event/post/${params.row.id}`} className="productListItem link">
                            {
                                arrImg.map((img, index) => {
                                    if (index === arrImg.length - 1) {
                                        return null;
                                    }
                                    return <img key={index} className="productListImg" src={img} alt="" />;
                                })
                            }
                        </NavLink>
                    );
                },
            },
            {
                field: "datePost",
                headerName: "Date ",
                width: 120,
            },
            {
                field: "rating",
                headerName: "Rating",
                width: 120,
            },
            {
                field: "action",
                headerName: "Action",
                width: 150,
                renderCell: (params) => {
                    return (
                        <React.Fragment >
                            <NavLink to={`/dashboard_event/post/${params.row.id}`}>
                                <Button color="primary" variant="text"><EditIcon /></Button>
                            </NavLink>
                            <Button variant="text" color="secondary" onClick={() => this.handDeleteSubmit(params.row.id)}>
                                <DeleteOutline />
                            </Button>
                        </React.Fragment>
                    );
                },
            },
        ];
    }
    render() {
        const { checked } = this.state;
        const { listPost } = this.props;
        return (
            <div className="productList">
                <div className="userBtnContainer">
                    <NavLink to={`/dashboard_event/newPost`}>
                        <Button variant="contained" color="primary" style={{ marginRight: 12 }}>
                            Create <Add />
                        </Button>
                    </NavLink>
                    <Button variant="contained" color="secondary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null) }}>
                        Delete <DeleteOutline />
                    </Button>
                </div>
                <DataGrid
                    rows={listPost}
                    columns={this.columns}
                    pageSize={7}
                    disableSelectionOnClick
                    rowsPerPageOptions={[Math.ceil(listPost.length / 7)]}
                    checkboxSelection
                    onSelectionModelChange={this.handleRowSelection}
                />
                <Modal />
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
        actionModal: bindActionCreators(actionModal, dispatch),
        watchPost: bindActionCreators(watchPost, dispatch),
        deletedPosts: bindActionCreators(deletedPosts, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(PostList)