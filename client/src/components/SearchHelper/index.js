import React, { Component } from 'react';
import styles from './styles';
import { Box, Button, TextField, withStyles } from '@material-ui/core';
class SearchHelper extends Component {
    render() {
        const { classes, handleChange } = this.props;
        return (
            <div className={classes.app}>
                <Box className={classes.root}>
                    <TextField
                        fullWidth
                        label="Search events"
                        onChange={handleChange}
                        className={classes.input}
                        id="fullWidth"
                    />
                </Box>
                <Button variant="contained" color="primary" className="btn">
                    Search
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SearchHelper);
