const styles = (theme) => {
    return {
        backgroundColor: {
            backgroundColor: theme.color.primary,
        },
        backgroundDark: {
            backgroundColor: theme.color.primaryDark,
        },
        title: {
            fontWeight: 700,
            textAlign: 'center',
            marginTop: 44,
        },
        textDark: {
            color: '#000000',
        },
        textWhite: {
            color: '#FFFFFF',
        },
        loader: {
            display: 'flex', margin: '20px auto', alignItems: 'center', position: 'relative', justifyContent: 'center', width: '100%'
        },
    };
};
export default styles;
