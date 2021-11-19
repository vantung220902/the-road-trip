import { Box, Button, Grid, withStyles, Typography, ImageList, ImageListItem } from '@material-ui/core';
import React, { Component } from 'react';
import styles from '../../FormTicket/FormCreate/styles';
import renderTextField from '../../FormHelper/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DropImg from '../../DropZone';
class FormSocial extends Component {
    componentDidMount() {
        const { post } = this.props;
        if (post) {
            this.props.initialize({
                tittle: post.tittle
            });
        }

    }
    required = (value) => {
        let error = 'Please Enter Tittle';
        if (
            value !== null &&
            typeof value !== 'undefined'
        ) {
            error = null;
        }
        return error;
    };
    UNSAFE_componentWillMount() {
        this.valueFiles = [];
    }
    onHandleChang = (value) => {
        if (value !== undefined) {
            this.valueFiles.push(value);
        }

    };
    onHandleSubmit = (data) => {
        const { handleMySubmit } = this.props;
        handleMySubmit(this.valueFiles, data);
        this.valueFiles = [];
    };

    render() {
        const { classes, invalid, submitting, handleSubmit, post } = this.props;
        let array = [];
        if (post) {
            array = post.body.split(';');
            array.pop();
        }
        return (
            <div className={classes.app}>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(this.onHandleSubmit)}
                >
                    <Grid container spacing={4} className={classes.form}>
                        <Grid item md={12} xs={12}>
                            <Typography>Tittle </Typography>
                            <Field
                                id="tittle"
                                label="Tittle"
                                className={classes.textField}
                                margin="dense"
                                name="tittle"
                                type="text"
                                component={renderTextField}
                                validate={this.required}
                            />
                        </Grid>
                        {post ? (<ImageList sx={{ width: '100%', maxWidth:500,maxHeight: 450, objectFit:"cover"}} cols={2} rowHeight={262}>
                            {array.map((item, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                        loading="lazy"
                                        alt="anh"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>) : null}
                        <Grid item md={12} xs={12}>
                            <DropImg onHandleChang={this.onHandleChang} />
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
                                        Post
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
FormSocial.propTypes = {
    classes: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
};
const mapStateToProps = (state) => {
    return {

    };
};

const withConnect = connect(mapStateToProps, null);
const createReduxForm = reduxForm({ form: 'formSocial' });
export default compose(
    withConnect,
    withStyles(styles),
    createReduxForm,
)(FormSocial);
