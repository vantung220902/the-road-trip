const styles = (theme) => {
    return {
        heading: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        text: {
            fontSize: 16,
        },
        number: {
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#3f51b5',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        list: {
            marginTop: 14,
            maxHeight: '40vh',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
    };
};
export default styles;
