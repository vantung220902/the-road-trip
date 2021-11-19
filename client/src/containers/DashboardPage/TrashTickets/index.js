import React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import RestoreIcon from '@material-ui/icons/Restore';
import { bindActionCreators, compose } from 'redux';
import { trashTicketsAdmin, deletedForeverTicket, restoreTrashTickets } from './../../../actions/tickets';
import { Box, Typography, Button } from '@material-ui/core';
import * as actionModal from '../../../actions/modalAction';
import Modal from '../../../components/Modal';
class TrashTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { trashTicketsAdmin } = this.props;
        trashTicketsAdmin();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listTickets !== this.props.listTickets) {
            this.setState({ checked: true });
        }
    }
    handDeleteSubmit = (id, type) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        const tittle = type === 'delete' ? 'Delete Payment' : 'Restore Payment';
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
        const { actionModal, deletedForeverTicket, restoreTrashTickets } = this.props;
        const { hideModel } = actionModal;
        if (type === 'delete') {
            if (id) {
                deletedForeverTicket([id]);
            } else {
                const { arrayIds } = this.state;
                deletedForeverTicket(arrayIds);
            }
        } else {
            if (id) {
                restoreTrashTickets([id]);
            } else {
                const { arrayIds } = this.state;
                restoreTrashTickets(arrayIds);
            }
        }

        hideModel();
    }
    componentWillMount() {
        this.columns = [
            { field: "id", headerName: "ID", width: 90 },
            {
                field: "fullName",
                headerName: "Author",
                width: 120,
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
            {
                field: "name", headerName: "Name", width: 120,
                renderCell: (params) => {
                    return (
                        <NavLink to={`/dashboard_event/ticket/${params.row.id}`} className="productListItem link">
                            <p>{params.row.name}</p>
                        </NavLink>
                    );
                },
            },
            {
                field: "image", headerName: "Image", width: 120,
                renderCell: (params) => {
                    return (
                        <NavLink to={`/dashboard_event/ticket/${params.row.id}`} className="productListItem link">
                            <img className="productListImg" src={params.row.image} alt="" />
                        </NavLink>
                    );
                },
            },
            {
                field: "dateStart",
                headerName: "Start",
                width: 108,
            },
            {
                field: "dateEnd",
                headerName: "End",
                width: 105,
            },
            {
                field: "cost",
                headerName: "Price",
                width: 110,
            },
            {
                field: "number",
                headerName: "Number",
                width: 120,
            },
            {
                field: "place",
                headerName: "Place",
                width: 120,
            },
            {
                field: "action",
                headerName: "Action",
                width: 150,
                renderCell: (params) => {
                    return (
                        <React.Fragment >
                            <Button color="primary" variant="text"
                                onClick={() => this.handDeleteSubmit(params.row.id, 'restore')}>
                                <RestoreIcon /></Button>
                            <Button variant="text" color="secondary"
                                onClick={() => this.handDeleteSubmit(params.row.id, 'delete')}>
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
        const { listTickets } = this.props;
        return (
            <div className="userList">
                <div className="userBtnContainer">
                    <Button variant="contained" color="primary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null, 'restore') }}
                        style={{ marginRight: 12 }}>
                        Restore <RestoreIcon />
                    </Button>
                    <Button variant="contained" color="secondary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null, 'delete') }}>
                        Delete Forever <DeleteOutline />
                    </Button>
                </div>
                <Modal />
                <DataGrid
                    rows={listTickets}
                    columns={this.columns}
                    pageSize={7}
                    disableSelectionOnClick
                    rowsPerPageOptions={[Math.ceil(listTickets.length / 7)]}
                    checkboxSelection
                    onSelectionModelChange={this.handleRowSelection}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listTickets: state.tickets.listTickets,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        restoreTrashTickets: bindActionCreators(restoreTrashTickets, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        trashTicketsAdmin: bindActionCreators(trashTicketsAdmin, dispatch),
        deletedForeverTicket: bindActionCreators(deletedForeverTicket, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(TrashTicket)