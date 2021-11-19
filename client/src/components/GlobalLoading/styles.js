const styles = (theme) => {
    return {
        globalLoading: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        icon: {
            position: 'fixed',
            width: 300,
        },
    };
};
export default styles;
