import React, { Component } from 'react';
import styles from './styles';
import { withStyles, Typography } from '@material-ui/core';
import parse from "html-react-parser";
class About extends Component {
    render() {
        const { classes, description, dateStart, dateEnd, time } = this.props;
        return (
            <div className={classes.app}>
                <Typography
                    variant="h4"
                    component="h6"
                    gutterBottom
                    className={classes.heading}
                >
                    Description
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    className={classes.body}
                >
                    {parse(description)}
                    <br />
                    <br />
                    We want to empower as many students and teachers around the
                    world as possible with our unprecedented Qur'anic language
                    curriculum and hope to create a worldwide network of
                    students that learn from each other and their instructions
                    and remain connected indefinitely. Join us today to begin
                    your journey!
                </Typography>
                <Typography
                    variant="h4"
                    component="h6"
                    gutterBottom
                    className={classes.heading}
                >
                    Hours
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    className={classes.body}
                >
                    {dateStart} to {dateEnd} : <b>{time}</b>
                </Typography>
                <Typography
                    variant="h4"
                    component="h6"
                    gutterBottom
                    className={classes.heading}
                >
                    How can I contact the organizer with any question?
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    className={classes.body}
                >
                    Please visit{' '}
                    <a href="https://www.facebook.com/">Our Page</a> and refer
                    to the FAQ section for all questions and contact
                    information.
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(About);
