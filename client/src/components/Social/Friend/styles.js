const styles = (theme) => {
    return {
        app: {
            maxWidth: '100%',
            padding: '12px 18px',
            marginTop: 12,
            borderRadius: '8px',
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        avatar: {
            width: 42,
            height: 42,
            marginRight: 12,
        },
        heading: {
            display: 'flex',
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
        },
        number: {
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };
};
export default styles;
