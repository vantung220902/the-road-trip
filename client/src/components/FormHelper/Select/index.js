import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import styles from './styles';
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};
const renderSelectField = ({
    input,
    label,
    classes,
    meta: { touched, error },
    children,
    ...custom
}) => (
    <FormControl className={classes.formControl} error={touched && error}>
        <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: input.name,
                id: 'color-native-simple',
            }}
            value={input.value}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
);
renderFromHelper.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.bool,
};
renderSelectField.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
    children: PropTypes.array,
    classes: PropTypes.object,
};
export default withStyles(styles)(renderSelectField);
