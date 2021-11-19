import { createStyles } from '@material-ui/core';
import { indigo, blue, teal } from '@material-ui/core/colors';
import { alpha } from '@material-ui/core/styles';
const styles = ({ palette }) =>
    createStyles({
        appointment: {
            borderRadius: 0,
            borderBottom: 0,
        },
        highPriorityAppointment: {
            borderLeft: `4px solid ${teal[500]}`,
        },
        mediumPriorityAppointment: {
            borderLeft: `4px solid ${blue[500]}`,
        },
        lowPriorityAppointment: {
            borderLeft: `4px solid ${indigo[500]}`,
        },
        weekEndCell: {
            backgroundColor: alpha(palette.action.disabledBackground, 0.04),
            '&:hover': {
                backgroundColor: alpha(palette.action.disabledBackground, 0.04),
            },
            '&:focus': {
                backgroundColor: alpha(palette.action.disabledBackground, 0.04),
            },
        },
        weekEndDayScaleCell: {
            backgroundColor: alpha(palette.action.disabledBackground, 0.06),
        },
        text: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        content: {
            opacity: 0.7,
        },
        container: {
            width: '100%',
            lineHeight: 1.2,
            height: '100%',
        },
    });
export default styles;
