const styles = (theme) => {
    return {
        app: {
            marginTop: 96,
            padding: '0 12px',
            [theme.breakpoints.down('md')]: {
                marginTop: 146
            },
        },
        heading: {
            fontSize: 32,
            fontWeight: 700,
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '24px 0',
        },
        mr: {
            marginRight: 12,
        },
        btn: {
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 600,
            marginRight: 8,
            width: 164,
            height: 48,
            borderRadius: 6,
            '&:hover': {
                backgroundColor: '#f50057',
            },
        },
        navLink: {
            textDecoration: 'none',
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        flex: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    };
};
export default styles;
