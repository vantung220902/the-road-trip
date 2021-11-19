const styles = (theme) => {
    return {
        app: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        left: {
            maxWidth: '438px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        form: {
            display: 'flex',
        },
        textField: {
            width: '100%',
        },
        btn: {
            width: 150,
            height: 60,
            borderRadius: 4,
            fontSize: '18px',
            fontWeight: 600,
        },
        containerBtn: {
            display: 'flex',
            justifyContent: 'center',
        },
        stepper: {
            backgroundColor: '#fafafa',
            padding: '18px 0px 28px',
        },
        label: {
            fontSize: 16,
        },
        heading: {
            fontSize: 28,
            color: '#000',
            fontWeight: 700,
        },
        headingBill: {
            fontSize: 20,
            color: '#000',
            fontWeight: 600,
            marginBottom: 12,
        },
        right: {
            width: 379,
            backgroundColor: '#f3f4f6',
            height: '88vh',
        },
        img: {
            width: '100%',
            height: 213,
        },
        bill: {
            padding: 30,
        },
        info: {
            display: 'flex',
            margin: '12px 0',
            justifyContent: 'space-between',
        },
    };
};
export default styles;
