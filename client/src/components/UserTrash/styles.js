const styles = (theme) => {
    return {
        app: {
            padding: '0 12px',
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
        container: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        navLink: {
            textDecoration: 'none',
            width: 119,
            marginRight: 70,
            height: 48,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: '#f3f4f6',
            color: '#000000',
            boxShadow: 'none',
            opacity: 0.8,
        }

    };
};
export default styles;
