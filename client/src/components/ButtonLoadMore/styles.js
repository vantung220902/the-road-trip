const styles = (theme) => {
    return {
        button: {
            backgroundColor: theme.color.primary,
            color: theme.text.blueColor,
            fontSize: 18,
            fontWeight: 700,
            margin: '0px auto',
            padding: '12px 16px',
        },
        app: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
    };
};
export default styles;
