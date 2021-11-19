import { Box, Button, Grid, withStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import renderTextField from '../../FormHelper/TextField';
import renderSelectField from '../../FormHelper/Select';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DropImg from './../../DropZone';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
class FormCreateTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avt: "",
            fullName: "",
            description: ""

        }
    }
    componentDidMount() {
        const { ticket } = this.props;
        if (ticket) {
            this.props.initialize({
                name: ticket.name,
                place: ticket.place,
                time: ticket.time,
                dateStart: ticket.dateStart.slice(0, 10),
                dateEnd: ticket.dateEnd.slice(0, 10),
                description: ticket.description,
                cost: ticket.cost,
                number: ticket.number,
                idAuthor: ticket.idAuthor,
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { ticket } = this.props;
        if (prevProps.ticket !== ticket) {
            this.props.initialize({
                name: ticket.name,
                place: ticket.place,
                time: ticket.time,
                dateStart: ticket.dateStart.slice(0, 10),
                dateEnd: ticket.dateEnd.slice(0, 10),
                description: ticket.description,
                cost: ticket.cost,
                number: ticket.number,
                idAuthor: ticket.idAuthor,
            });
        }
    }
    required = (value) => {
        let error = 'Please Enter Email or Password';
        if (
            value !== null &&
            typeof value !== 'undefined'
        ) {
            error = null;
        }
        return error;
    };
    minLength = (value) => {
        let error = null;
        if (value.length < 5) {
            error = 'Min length must be 5 characters';
        }
        return error;
    };
    UNSAFE_componentWillMount() {
        this.valueFiles = null;
    }
    onHandleChang = (value) => {
        this.valueFiles = value;
    };
    handleChangUser = (e) => {
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const fullName = optionElement.getAttribute('data-fullName');
        const avt = optionElement.getAttribute('data-avt');
        this.setState({ fullName: fullName, avt: avt });
    }
    onHandleSubmit = (data) => {
        const { onHandleSubmit, onHandleUpdateSubmit, ticket } = this.props;
        const { description } = this.state;
        if (ticket) {
            const img = this.valueFiles ? this.valueFiles : ticket.image;
            const { avt, fullName } = this.state;
            const value = {
                ...data,
                description: description,
                avt: avt === "" || avt === null ? ticket.avt : avt,
                fullName: fullName === "" || fullName === null ? ticket.fullName : fullName,
            }
            onHandleUpdateSubmit(ticket.id, img, value);
            return;
        }
        onHandleSubmit(this.valueFiles, { ...data, description: description});
    };
    setDescription = (data) => {
        this.setState({ description: data });
    }
    render() {
        const { classes, invalid, submitting, handleSubmit, ticket, listUsers } = this.props;
        const { description } = this.state;
        return (
            <div className={classes.app}>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(this.onHandleSubmit)}
                >
                    <Grid container spacing={4} className={classes.form}>
                        <Grid item md={12} xs={12}>
                            <Typography>Name Event</Typography>
                            <Field
                                id="nameEvent"
                                label="Name Event"
                                className={classes.textField}
                                margin="dense"
                                name="name"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        {listUsers ? (<Grid item md={12}>
                            <Typography>Users</Typography>
                            <Field
                                id="user"
                                label="Users ID"
                                className={classes.textField}
                                margin="dense"
                                name="idAuthor"
                                component={renderSelectField}
                                onChange={this.handleChangUser}
                                validate={this.required}
                            >
                                <option value={ticket.idAuthor}>
                                    {ticket.idAuthor}-{ticket.fullName}(Default) </option>
                                {
                                    listUsers.map((user) => {
                                        return (<option key={user.id} data-fullName={user.fullName}
                                            data-avt={user.avt}
                                            value={user.id}>
                                            {user.id}-{user.fullName}</option>)
                                    })
                                }
                            </Field>
                        </Grid>) : null}
                        {ticket ? <img
                            src={`${ticket.image}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${ticket.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                            alt="anh"
                        /> : null}
                        <Grid item md={12} xs={12}>
                            <DropImg onHandleChang={this.onHandleChang} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography>Place Event</Typography>
                            <Field
                                id="place"
                                label="Place"
                                className={classes.textField}
                                multiple
                                rowsMax="4"
                                margin="dense"
                                name="place"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography>Time</Typography>
                            <Field
                                id="time"
                                label="Time"
                                className={classes.textField}
                                multiple
                                rowsMax="4"
                                margin="dense"
                                name="time"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        <Grid item md={12} className={classes.content}>
                            <div className={classes.item}>
                                <Typography>Date Start</Typography>
                                <Field
                                    id="dateStart"
                                    className={classes.textField}
                                    multiple
                                    rowsMax="4"
                                    margin="dense"
                                    name="dateStart"
                                    type="date"
                                    component={renderTextField}
                                    validate={this.required}
                                />
                            </div>
                            <div className={classes.item}>
                                <Typography>Date End</Typography>
                                <Field
                                    id="dateEnd"
                                    className={classes.textField}
                                    multiple
                                    rowsMax="4"
                                    margin="dense"
                                    name="dateEnd"
                                    type="date"
                                    component={renderTextField}
                                    validate={this.required}
                                />
                            </div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography>Description</Typography>
                            <CKEditor
                                editor={ClassicEditor}
                                data={ticket ? ticket.description : description}
                                onChange={(event, editor) => {
                                    const data = editor.getData()
                                    this.setDescription(data)
                                }}
                            />
                        </Grid>
                        <Grid item md={12} className={classes.content}>
                            <div className={classes.item}>
                                <Typography>Price</Typography>
                                <Field
                                    id="price"
                                    className={classes.textField}
                                    multiple
                                    label="Price "
                                    rowsMax="4"
                                    margin="dense"
                                    name="cost"
                                    type="number"
                                    component={renderTextField}
                                    validate={this.required}
                                />
                            </div>
                            <div className={classes.item}>
                                <Typography>Slot</Typography>
                                <Field
                                    id="slot"
                                    className={classes.textField}
                                    multiple
                                    rowsMax="4"
                                    label="Slot"
                                    margin="dense"
                                    name="number"
                                    type="number"
                                    component={renderTextField}
                                    validate={this.required}
                                />
                            </div>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container className={classes.containerBtn}>
                                <Box mr={2}>
                                    <Button
                                        disabled={invalid || submitting}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={classes.btn}
                                    >
                                        {ticket ? "Update" : "Create"}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}
FormCreateTicket.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};
const mapStateToProps = (state) => {
    return {

    };
};

const withConnect = connect(mapStateToProps, null);
const createReduxForm = reduxForm({ form: 'creteTicket' });
export default compose(
    withConnect,
    withStyles(styles),
    createReduxForm,
)(FormCreateTicket);
