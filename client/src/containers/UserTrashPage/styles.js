const styles = (theme) => {
    return {
        app: {
            marginTop: 96,
            [theme.breakpoints.down('md')]: {
                marginTop: 146
            },
            backgroundColor: theme.color.primary,
        },
        btn: {
            marginRight: 8,
        }
    }
}
export default styles;