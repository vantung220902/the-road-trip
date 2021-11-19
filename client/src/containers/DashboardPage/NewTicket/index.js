import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { creteTicket } from '../../../actions/tickets';
import FormTicket from '../../../components/FormTicket/FormCreate';
const account = JSON.parse(localStorage.getItem('account'));
class NewTicket extends Component {
    onHandleSubmit = (data, data2) => {
        const { creteTicket } = this.props;
        const formData = new FormData();
        formData.append('file', data);
        formData.append('upload_preset', 'y58ntib0');
        creteTicket(formData, {
            ...data2,
            idAuthor: account.id,
        });
    };
    render() {
        return (
            <div className="newUser">
                <h1 className="newUserTitle">New Ticket</h1>
                <FormTicket onHandleSubmit={this.onHandleSubmit} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        creteTicket: bindActionCreators(creteTicket, dispatch),
    };
};
const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(NewTicket);
