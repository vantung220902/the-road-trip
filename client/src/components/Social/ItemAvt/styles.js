const styles = (theme) => {
    return {
        app: {
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '100%',
            borderRadius: 12,
            height: 90,
            textDecoration: 'none',
            color: 'inherit'
        },
        img: {
            width: 50,
            height: 56,
            borderRadius: 8,
            marginRight: 8,
            marginLeft: 28,
        },
        text: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        heading: {
            fontSize: 18,
            color: '#000000',
        },
    };
};
export default styles;
