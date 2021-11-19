const styles = (theme) => {
    return {
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
        },
        paper: {
            width: '50%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            position: 'absolute',
            top: 12,
            bottom: 12,
            [theme.breakpoints.down('md')]: {
                width: '100%',
            },
        },
        title: {
            color: '#000',
            fontSize: 18,
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        header: {
            color: '#000',
            padding: theme.spacing(2),
            display: 'flex',
            justifyContent: 'space-between',
        },
        content: {
            padding: theme.spacing(2),
            width: '100%',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none',
                width: '100%',
            },
        },
        close: {
            cursor: 'pointer',
        },
    };
};
export default styles;
