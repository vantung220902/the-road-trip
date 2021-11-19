const styles = (theme) => {
    return {
        app: {
            backgroundColor: theme.color.primary,
            display: 'flex',
            margin: '0 auto',
            marginTop: 96,
            width: '100vw',
            [theme.breakpoints.down('md')]: {
                marginTop: 146,
            },
        },
        item: {
            margin: '12px 20px',
            maxWidth: '20%',
            maxHeight: '100vh',
            overflowY: 'scroll',
            position: 'fixed',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        itemLeft: {
            left: '4%',
        },
        itemRight: {
            right: '2%'
        },
        content: {
            maxWidth: '50%',
            width: '50%',
            maxHeight: '100vh',
            margin: '0 auto',
            [theme.breakpoints.down('md')]: {
                maxWidth: '80%',
                width: '80%',
            },
        },
        bottomNav: {
            display: 'none',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            [theme.breakpoints.down('md')]: {
                display: 'block',
            },
        },
        btn: {
            marginRight: 8,
        },

    };
};
export default styles;
