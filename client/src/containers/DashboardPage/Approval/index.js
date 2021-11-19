import React, { Component } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Close, Check } from "@material-ui/icons";
import { Box, Typography } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { Button } from '@material-ui/core';
import { getTicketsApproval, acceptTickets, deletedForeverTicket } from '../../../actions/tickets';
import { connect } from 'react-redux';
import Modal from '../../../components/Modal';
import * as actionModal from '../../../actions/modalAction';
import { bindActionCreators, compose } from 'redux';
class Approval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { getTicketsApproval } = this.props;
        getTicketsApproval();
    }
    handDeleteSubmit = (id, type) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle, hideModel } = actionModal;
        showModel();
        ChangeModelTitle('Delete Post');
        ChangeModel((<Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to {type}
            </Typography>
            <Box sx={{ mt: 2 }} >
                <Button style={{ margin: '0 12px' }} variant="contained" color="primary"
                    onClick={hideModel}
                >
                    Cancel
                </Button>
                <Button onClick={() => { this.handleConfirm(id, type) }} variant="contained" color="secondary">
                    {type}
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
    componentDidUpdate(prevProps) {
        if (prevProps.listTickets !== this.props.listTickets) {
            this.setState({ checked: true });
        }
    }
    handleConfirm = (value, type) => {
        const { acceptTickets, deletedForeverTicket } = this.props;
        if (type === 'accept') {
            if (value !== null) {
                acceptTickets([value]);
            } else {
                const { arrayIds } = this.state;
                console.log(arrayIds);
                acceptTickets(arrayIds);
            }
        } else {
            if (value !== null) {
                deletedForeverTicket([value]);
            } else {
                const { arrayIds } = this.state;
                console.log(arrayIds);
                deletedForeverTicket(arrayIds);
            }
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
                                onClick={() => this.handDeleteSubmit(params.row.id, 'accept')}>
                                <Check /></Button>
                            <Button variant="text" color="secondary"
                                onClick={() => this.handDeleteSubmit(params.row.id, 'delete')}>
                                <Close />
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
            <div className="productList">
                <div className="userBtnContainer">

                    <Button variant="contained" color="primary" style={{ marginRight: 12 }}
                        disabled={checked} onClick={() => { this.handDeleteSubmit(null, 'accept') }}>
                        Accept <Check />
                    </Button>
                    <Button variant="contained" color="secondary" disabled={checked}
                        onClick={() => { this.handDeleteSubmit(null, 'delete') }}>
                        Decline <Close />
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
        getTicketsApproval: bindActionCreators(getTicketsApproval, dispatch),
        acceptTickets: bindActionCreators(acceptTickets, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        deletedForeverTicket: bindActionCreators(deletedForeverTicket, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Approval)