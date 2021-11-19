const styles = (theme) => {
    return {
        app: {
            marginTop: 96,
            marginLeft: 12,
            [theme.breakpoints.down('md')]: {
                marginTop: 180,
            },
            backgroundColor: theme.color.primary,
        },
    };
};
export default styles;
