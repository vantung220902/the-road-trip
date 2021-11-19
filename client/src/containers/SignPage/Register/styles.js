const styles = (theme) => {
    return {
        app: {
            marginTop: 96,
            [theme.breakpoints.down('md')]: {
                marginTop: 146,
            },
        },
    };
};
export default styles;
