const styles = (theme) => {
    return {
        list: {
            marginTop: 14,
            maxHeight: '50vh',
            overflowY: 'scroll',
            backgroundColor: 'white',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },

        heading: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
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
    };
};
export default styles;
