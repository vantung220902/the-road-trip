import React, { Component } from 'react';
import { Modal, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modalAction';
class MyModal extends Component {
    render() {
        const { classes, open, component, modalActions, title, height } = this.props;
        const { hideModel } = modalActions;
        return (
            <Modal open={open} onClose={hideModel} className={classes.modal}>
                <div className={classes.paper} style={{ height: height }}>
                    <div className={classes.header}>
                        <span className={classes.title}>{title}</span>
                        <CloseIcon
                            className={classes.close}
                            onClick={hideModel}
                        />
                    </div>
                    <div className={classes.content} >{component}</div>
                </div>
            </Modal>
        );
    }
}
MyModal.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object,
    title: PropTypes.string,
    component: PropTypes.object,
    modalActions: PropTypes.shape({
        hideModel: PropTypes.func,
    }),
};
const mapStateToProps = (state) => {
    return {
        open: state.modal.showModel,
        component: state.modal.component,
        title: state.modal.title,
        height: state.modal.height
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        modalActions: bindActionCreators(modalActions, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(MyModal);
