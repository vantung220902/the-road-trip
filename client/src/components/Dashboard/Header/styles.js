const styles = (theme) => {
    return {
        header: {
            display: 'flex',
            width: '100%',
            height: 96,
            alignItems: 'center',
            maxWidth: '100vw',
            padding: '0px',
            position: 'fixed',
            zIndex: 100,
            top: 0,
            [theme.breakpoints.down('md')]: {
                height: 152,
            },
        },
        title: {
            fontSize: 36,
            fontFamily: 'Segoe UI',
            fontWeight: 800,
            padding: '0 16px',
        },
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
            height: '100%',
            width: '100%',
        },
        buttonRight: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        buttonRightActive: {
            display: 'none',
            cursor: 'pointer',
            padding: '20px 30px',

            [theme.breakpoints.down('md')]: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
        },
        iconMenu: {
            width: 40,
            height: 40,
        },
        tittleWhite: {
            color: '#FFFFFF',
        },
        tittleDark: {
            color: '#000000',
        },
        backgroundColor: {
            backgroundColor: theme.color.primary,
        },
        backgroundDark: {
            backgroundColor: theme.color.primaryDark,
        },
        button: {
            width: 119,
            marginRight: 8,
            height: 48,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: '#f3f4f6',
            color: '#000000',
            boxShadow: 'none',
            opacity: 0.8,
        },
        button2: {
            width: 119,
            marginRight: 8,
            height: 48,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: '#e5e7eb',
            color: '#2563eb',
            boxShadow: 'none',
        },
        nav: {
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#3b82f6',
            margin: '6px 0',
        },
        tabs: {
            display: 'flex',
            flexDirection: 'column',
        },
        navTabs: {
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            color: '#3b82f6',
        },
        avt: {
            width: 44,
            height: 44,
            borderRadius: '50%',
            margin: '6px 16px 6px 0px',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',

        },
        containerBelt: {
            marginRight: 16,
        },
        belt: {
            fontSize: 30,
        },
        iconNav: {
            fontSize: 36,
            width: '100%',
        },
        iconSearch: {
            fontSize: 36,
            marginRight: 16,
        },
        drawer: {
            width: '30vw',
        },
    };
};
export default styles;
