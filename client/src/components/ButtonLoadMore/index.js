import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Button } from '@material-ui/core';
class LoadMore extends Component {
    render() {
        const { classes, loadMore } = this.props;
        return (
            <div className={classes.app}>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={() => {
                        loadMore();
                    }}
                >
                    Load More Event
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(LoadMore);
