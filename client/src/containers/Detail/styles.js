const styles = (theme) => {
    return {
        app: {
            padding: '96px 24px 100px',
            transition: 'all 0.2s linear',
            fontFamily: 'Roboto',
            backgroundColor: theme.color.primary,
            [theme.breakpoints.down('md')]: {
                padding: '96px 12px 50px',
            },
        },
        info: {
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            height: '80%',
            [theme.breakpoints.down('md')]: {
                height: '100%',
                flexDirection: 'column',
                width: '100%',
                position: 'relative',
            },
        },
        iconBack: {
            color: 'white',
        },
        textBack: {
            paddingLeft: '8px',
        },
        heading: {
            fontSize: 48,
            fontWeight: 700,
            lineHeight: '1.75rem',
            [theme.breakpoints.down('md')]: {
                lineHeight: 'inherit',
            },
        },
        where: {
            padding: 0,
            color: '#34d399',
            fontSize: 22,
            fontWeight: 450,
            textTransform: 'none',
        },
        iconLocation: {
            marginRight: 4,
            fontSize: 34,
        },
        report: {
            backgroundColor: '#f87171',
            color: 'white',
            padding: '12px 12px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
        },
        textReport: {
            marginLeft: 4,
        },
        formBuy: {
            backgroundColor: 'white',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            width: 390,
            padding: '28px 34px',
            height: 440,
        },
        headingDate: {
            color: '#000000',
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 12,
        },
        dateTime: {
            fontSize: 18,
            color: '#333',
            marginBottom: 12,
        },
        calendar: {
            fontSize: 18,
            fontWeight: 500,
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 18,
        },
        remainingTicket: {
            fontSize: 18,
            marginBottom: 24,
            color: '#333',
        },
        btnBuy: {
            backgroundColor: '#2563eb',
            padding: '12px 0',
            borderRadius: 8,
            color: '#FFF',
            marginBottom: 18,
            width: '100%',
        },
        btnPromote: {
            padding: '12px 0',
            borderRadius: 8,
            marginBottom: 28,
        },
        refund: {
            textAlign: 'center',
        },
        detail: {
            marginTop: 80,
        },
        detailItem: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                width: '100vw',
            },
        },
        mapContainer: {
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 8,
            maxWidth: '30%',
            marginLeft: 8,
        },
        map: {
            marginBottom: 22,
            overflow: 'hidden',
            maxHeight: '442px',
            [theme.breakpoints.down('md')]: {
                maxWidth: '100vw',
                width: '100vw',
            },
        },
        share: {
            marginTop: 18,
        },
        iconShare: {
            fontSize: 48,
        },
        backgroundColor: {
            backgroundColor: theme.color.primary,
        },
        backgroundDark: {
            backgroundColor: theme.color.primaryDark,
            color: 'white',
        },
        navLink: {
            textDecoration: 'none',
            color: 'white',
            width: '100%',
        },
        rootTab: {
            flexGrow: 1,
            maxWidth: 500,
        },
        iconTab: {
            backgroundColor: 'none',
            fontSize: 16,
            color: '#000',
        },
    };
};
export default styles;
