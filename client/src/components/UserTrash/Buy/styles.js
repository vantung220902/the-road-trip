const styles = (theme) => {
    return {
        paper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px',
            marginBottom: 16,
            flexWrap: 'wrap',
        },
        app: {
            margin: '18px 0',
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            flex: 1,
        },
        headingItem: {
            fontSize: 20,
            fontWeight: 600,
        },
        img: {
            width: 100,
            height: 100,
        },
        headerText: {
            display: 'flex',
            justifyContent: 'space-between',
            width: 100,
        },
        nav: {
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 600,
            marginRight: 8,
            display: 'flex',
            textDecoration: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            width: 164,
            height: 48,
            borderRadius: 6,

            '&:hover': {
                backgroundColor: '#f50057',
            },
        },
        btnCenter: {
            display: 'flex',
            justifyContent: 'center',
        },
        model: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        contentText: {
            margin:'0 6px',
        }
    };
};
export default styles;
