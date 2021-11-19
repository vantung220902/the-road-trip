import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
class Slider extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                <div className={classes.sliderText}>
                    <Typography variant="button" color="secondary">
                        EXPERIENCE MORE
                    </Typography>
                    <Typography variant="h1" className={classes.title}>
                        The cheapest tickets on the internet, period
                    </Typography>
                    <Typography  >
                        zero hidden service fees, price match guarantee, group discounts, and more. Because it
                        should be this easy
                    </Typography>
                </div>

                <div className={classes.slider}>

                </div>
            </div>
        );
    }
}
Slider.propTypes = {
    classes: PropTypes.object,
};
export default withStyles(styles)(Slider);
