const styles = (theme) => {
    return {
        app: {
            background: '#FFFFFF',
            width: '100%',
            padding: '12px',
            position: 'relative',
            borderRadius: '8px',
            marginTop: '12px',
        },
        img: {
            width: '100%',
            borderRadius: '8px',
        },
        author: {
            position: 'absolute',
            height: '40px',
            width: '36px',
            borderRadius: 4,
            top: '10%',
            left: '12%',
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        avt: {
            width: '90%',
            height: '90%',
            borderRadius: 4,
        },
        contextText: {
            position: 'absolute',
            top: '46%',
            left: '12%',
        },
        text: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 600,
        },
        accept: {
            display: 'flex',
            marginTop: 8,
            justifyContent: 'space-between',
        },
        link: {
            textDecoration: 'none',
            color: '#FFFFFF',
        },
    };
};
export default styles;
