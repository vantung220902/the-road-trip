const styles = (theme) => {
    return {
        app: {
            width: '64%',
            maxWidth: '64%',
            [theme.breakpoints.down('md')]: {
                width: '100%',
                maxWidth: '100%',
            },
        },
        body: {
            textAlign: 'justify',
            fontSize: '17px',
            color: '#333',
        },
    };
};
export default styles;
