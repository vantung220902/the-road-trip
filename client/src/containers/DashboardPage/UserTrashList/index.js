import React, { Component } from 'react'
import '../UserList/styles.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import RestoreIcon from '@material-ui/icons/Restore';
import { Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import * as actionModal from '../../../actions/modalAction';
import { trashUser, transactionsUser, deletedForever, restoreTrash } from '../../../actions/signInUp';
import Modal from '../../../components/Modal';

class UserTrashList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { trashUser, transactionsUser } = this.props;
        trashUser();
        transactionsUser();
    }
    componentDidUpdate(prevProps) {
        const { lastsUsers } = this.props;
        if (prevProps.lastsUsers !== lastsUsers) {
            this.setState({ checked: true })
        }
    }
    componentWillMount() {
        this.columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            {
                field: 'fullName', headerName: 'User name', width: 160,
                renderCell: (params) => {
                    return (
                        <NavLink to={`/dashboard_event/user/${params.row.id}`} className="link">
                            <div className="userListUser">
                                <img className="userListImg" src={params.row.avt} alt="" />
                                {params.row.fullName}
                            </div>
                        </NavLink>

                    );
                },
            },
            { field: 'sdt', headerName: 'Phone', width: 160 },
            {
                field: 'transactions',
                headerName: 'Transactions Volume',
                width: 160,
            },
            {
                field: 'action',
                headerName: 'Action',
                width: 150,
                renderCell: (params) => {
                    return (
                        <React.Fragment >
                            <Button color="primary" variant="text"
                                onClick={() => this.handDeleteSubmit(params.row.id,'restore')}>
                                <RestoreIcon /></Button>
                            <Button variant="text" color="secondary"
                                onClick={() => this.handDeleteSubmit(params.row.id,'delete')}>
                                <DeleteOutline />
                            </Button>
                        </React.Fragment>
                    )
                }
            },
        ];
    }
    handDeleteSubmit = (id, type) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        const tittle = type === 'delete' ? 'Delete User' : 'Restore User';
        showModel();
        ChangeModelTitle(tittle);
        ChangeModel((<Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to {tittle}
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button style={{ margin: '0 12px' }} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={() => { this.handleConfirm(id, type) }} variant="contained" color="secondary">
                    {tittle}
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
    handleConfirm = (id, type) => {
        const { actionModal, deletedForever, restoreTrash } = this.props;
        const { hideModel } = actionModal;
        if (type === 'delete') {
            if (id) {
                deletedForever([id]);
            } else {
                const { arrayIds } = this.state;
                deletedForever(arrayIds);
            }
        } else {
            if (id) {
                restoreTrash([id]);
            } else {
                const { arrayIds } = this.state;
                restoreTrash(arrayIds);
            }
        }

        hideModel();
    }
    render() {
        const { transactions, lastsUsers } = this.props;
        let array = [];
        const { checked } = this.state;
        if (transactions.length > 0 && lastsUsers.length > 0) {
            for (let i = 0; i < lastsUsers.length; i++) {
                let check = true;
                for (let j = 0; j < transactions.length; j++) {
                    if (lastsUsers[i].id === transactions[j].id) {
                        array.push({ ...lastsUsers[i], transactions: transactions[j].sum });
                        check = false;
                    }
                }
                if (check) {
                    array.push({ ...lastsUsers[i], transactions: 0 });
                }
            }
        }
        return (
            <div className="userList">
                <div className="userBtnContainer">
                    <Button variant="contained" color="primary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null, 'restore')}}
                        style={{ marginRight: 12 }}>
                        Restore <RestoreIcon />
                    </Button>
                    <Button variant="contained" color="secondary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null,'delete') }}>
                        Delete Forever <DeleteOutline />
                    </Button>
                </div>
                <DataGrid
                    rows={array}
                    columns={this.columns}
                    pageSize={7}
                    disableSelectionOnClick
                    rowsPerPageOptions={[Math.ceil(lastsUsers.length / 7)]}
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
        transactions: state.sign.transactions,
        lastsUsers: state.sign.lastsUsers,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        transactionsUser: bindActionCreators(transactionsUser, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        trashUser: bindActionCreators(trashUser, dispatch),
        deletedForever: bindActionCreators(deletedForever, dispatch),
        restoreTrash: bindActionCreators(restoreTrash, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(UserTrashList);
