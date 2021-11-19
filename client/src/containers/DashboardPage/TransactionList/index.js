import React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { transactions, deletedPayment } from './../../../actions/payments';
import { Box, Typography, Button } from '@material-ui/core';
import * as actionModal from '../../../actions/modalAction';
import Modal from '../../../components/Modal';

class TransactionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { transactions } = this.props;
        transactions();
    }
    componentDidUpdate(prevProps) {
        const { listPayments } = this.props;
        if (prevProps.listPayments !== listPayments) {
            this.setState({ checked: true });
        }
    }
    componentWillMount() {
        this.columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            {
                field: 'fullName', headerName: 'User name', width: 160,
                renderCell: (params) => {
                    return (
                        <NavLink to={`/dashboard_event/user/${params.row.idAccount}`} className="link">
                            <div className="userListUser">
                                <img className="userListImg" src={params.row.avt} alt="" />
                                {params.row.fullName}
                            </div>
                        </NavLink>

                    );
                },
            },
            {
                field: 'name', headerName: 'Ticket name', width: 160,
                renderCell: (params) => {
                    return (
                        <NavLink to={`/dashboard_event/ticket/${params.row.idTicket}`} className="link">
                            <div className="userListUser">
                                <img className="userListImg" src={params.row.image} alt="" />
                                {params.row.name}
                            </div>
                        </NavLink>

                    );
                },
            },
            { field: 'phone', headerName: 'Phone', width: 120 },
            { field: 'email', headerName: 'Email', width: 120 },
            { field: 'note', headerName: 'Note', width: 110 },
            { field: 'sum', headerName: 'Cost', width: 110 },
            {
                field: 'time', headerName: 'Time', width: 122,
                renderCell: (params) => {
                    return (
                        <p>{params.row.time}: {params.row.dateBuy} </p>

                    );
                },
            },

            {
                field: 'action',
                headerName: 'Action',
                width: 150,
                renderCell: (params) => {
                    return (
                        <React.Fragment >
                            <NavLink to={`/dashboard_event/transaction/${params.row.id}`}>
                                <Button color="primary" variant="text"><EditIcon /></Button>
                            </NavLink>
                            <Button variant="text" color="secondary"
                                onClick={() => this.handDeleteSubmit(params.row.id)}>
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
        const { actionModal, deletedPayment } = this.props;
        const { hideModel } = actionModal;
        if (id) {
            deletedPayment([id]);
        } else {
            const { arrayIds } = this.state;
            deletedPayment(arrayIds);
        }
        hideModel();
    }
    render() {
        const { listPayments } = this.props;
        const { checked } = this.state;
        if (listPayments[0] && Object.keys(listPayments[0]).length === 2) {
            return null;
        }
        return (
            <div className="userList">
                <div className="userBtnContainer">
                    <Button variant="contained" color="secondary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null) }}>
                        Delete <DeleteOutline />
                    </Button>
                </div>
                <DataGrid
                    rows={listPayments}
                    columns={this.columns}
                    pageSize={7}
                    disableSelectionOnClick
                    rowsPerPageOptions={[Math.ceil(listPayments.length / 7)]}
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
        listPayments: state.payments.listPayments,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actionModal: bindActionCreators(actionModal, dispatch),
        transactions: bindActionCreators(transactions, dispatch),
        deletedPayment: bindActionCreators(deletedPayment, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(TransactionsList);
