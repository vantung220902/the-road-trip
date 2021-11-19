const styles = (theme) => {
    return {
        app: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 24,
            height: 100,
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 14,
        },
        img: {
            width: 50,
            height: 54,
            borderRadius: 8,
            marginRight: 16,
        },
        content: {
            display: 'flex',
            alignItems: 'center',
        },
        text: {
            fontWeight: 600,
            color: '#CCC',
        },
    };
};
export default styles;
