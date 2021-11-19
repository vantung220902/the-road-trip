import React, { Component } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import SendIcon from '@material-ui/icons/Send';
import { NavLink } from "react-router-dom";
import { Button } from '@material-ui/core';
import { getALLIdsUser } from '../../../actions/signInUp';
import { sendEmail } from '../../../actions/email';
import { connect } from 'react-redux';
import Modal from '../../../components/Modal';
import * as actionModal from '../../../actions/modalAction';
import { bindActionCreators, compose } from 'redux';
import FormEmail from './Form';
class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            arrayIds: []
        }
    }
    componentDidMount() {
        const { getALLIdsUser } = this.props;
        getALLIdsUser();
    }
    handEmailSubmit = (email) => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('Delete User');
        ChangeModel(<FormEmail email={email} handleSendEmail={this.handleSendEmail} />, "auto");
    }
    handleRowSelection = (e) => {

        if (e.length > 0) {
            this.setState({ arrayIds: e, checked: false });
        } else {
            this.setState({ checked: true });
        }
    }
    handleSendEmail = (data, email) => {
        const { actionModal, sendEmail, listUsers } = this.props;
        const { hideModel } = actionModal;
        const { arrayIds } = this.state;

        if (email) {
            sendEmail([email], data);
        } else {
            const array = [];
            arrayIds.forEach((id) => {
                listUsers.forEach((user) => {
                    if (user.id === id) {
                        array.push(user.email);
                    }
                })
            });

            sendEmail(array, data);
        }
        hideModel();
    }

    componentWillMount() {
        this.columns = [
            { field: "email", headerName: "Email", width: 400 },
            {
                field: "fullName",
                headerName: "Full Name",
                width: 200,
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
            {
                field: "action",
                headerName: "Action",
                width: 150,
                renderCell: (params) => {
                    return (
                        <React.Fragment >
                            <Button variant="text" color="secondary"
                                onClick={() => this.handEmailSubmit(params.row.email)}>
                                <SendIcon />
                            </Button>
                        </React.Fragment>
                    );
                },
            },
        ];
    }
    render() {
        const { checked } = this.state;
        const { listUsers } = this.props;
        const data = listUsers[0];
        if (data && Object.keys(data).length === 4) {
            return (
                <div className="userList">
                    <div className="userBtnContainer">

                        <Button variant="contained" color="secondary" disabled={checked}
                            onClick={() => { this.handEmailSubmit(null) }}>
                            Send <SendIcon />
                        </Button>
                    </div>
                    <Modal />
                    <DataGrid
                        rows={listUsers}
                        columns={this.columns}
                        pageSize={7}
                        disableSelectionOnClick
                        rowsPerPageOptions={[Math.ceil(listUsers.length / 7)]}
                        checkboxSelection
                        onSelectionModelChange={this.handleRowSelection}
                    />
                </div>
            );
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return {
        listUsers: state.sign.listUsers,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getALLIdsUser: bindActionCreators(getALLIdsUser, dispatch),
        actionModal: bindActionCreators(actionModal, dispatch),
        sendEmail: bindActionCreators(sendEmail, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(SendEmail)