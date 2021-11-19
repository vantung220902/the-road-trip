import React, { Component } from 'react'
import './styles.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Add } from "@material-ui/icons";
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { LastsUser, transactionsUser } from './../../../actions/signInUp';
import BChart from './../../../components/Admin/BarChart';
import { Box, Typography } from '@material-ui/core';
import * as actionModal from '../../../actions/modalAction';
import { deletedUser } from '../../../actions/signInUp';
import Modal from '../../../components/Modal';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { LastsUser, transactionsUser } = this.props;
        LastsUser(0, 100);
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
                            <NavLink to={`/dashboard_event/user/${params.row.id}`}>
                                <Button color="primary" variant="text"><EditIcon /></Button>
                            </NavLink>
                            <Button variant="text" color="secondary" onClick={() => this.handDeleteSubmit(params.row.id)}>
                                <DeleteOutline />
                            </Button>
                        </React.Fragment>
                    )
                }
            },
        ];
    }
    handDeleteSubmit = (id) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete User');
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
    handleConfirm = (id) => {
        const { actionModal, deletedUser } = this.props;
        const { hideModel } = actionModal;
        if (id) {
            deletedUser([id]);
        } else {
            const { arrayIds } = this.state;
            deletedUser(arrayIds);
        }
        hideModel();
    }
    render() {
        const { transactions, lastsUsers } = this.props;
        let array = [];
        const { checked } = this.state;
        if (Array.isArray(transactions) && Array.isArray(lastsUsers)) {
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
                    <NavLink to={`/dashboard_event/newUser`}>
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
                    rows={array}
                    columns={this.columns}
                    pageSize={7}
                    disableSelectionOnClick
                    rowsPerPageOptions={[Math.ceil(lastsUsers.length / 7)]}
                    checkboxSelection
                    onSelectionModelChange={this.handleRowSelection}
                />
                <Modal />
                <BChart data={transactions} title="User transitions" grid dataKey="sum" />
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
        LastsUser: bindActionCreators(LastsUser, dispatch),
        transactionsUser: bindActionCreators(transactionsUser, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        deletedUser: bindActionCreators(deletedUser, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(UserList);
