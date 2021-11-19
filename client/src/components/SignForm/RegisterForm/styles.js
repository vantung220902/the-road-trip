const styles = (theme) => {
    return {
        app: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column-reverse',
            },
        },
        left: {
            maxWidth: '438px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            [theme.breakpoints.down('md')]: {
                padding: '0 6px',
            },
        },
        iconLogin: {
            margin: '24px auto 18px',
        },
        img: {
            backgroundImage:
                'url(https://ik.imagekit.io/tvlk/blog/2018/03/kinh-nghiem-di-xem-concert-phan-2-1.jpg?tr=dpr-1,w-675)',
            borderColor: 'rgba(229,231,235,1)',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
            backgroundSize: 'cover',
            flex: 1,
            maxWidth: 664,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            overflow: 'hidden',
            height: '90vh',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(17,24,39,0.6)',
                objectFit: 'cover',
            },
            [theme.breakpoints.down('md')]: {
                marginTop: 16,
            },
        },
        heading: {
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.5,
            textAlign: 'center',
            zIndex: 10,
        },
        icon: {
            width: 56,
            height: 56,
            borderRadius: '50%',
            marginRight: 16,
        },
        form: {
            display: 'flex',
        },
        textField: {
            width: '100%',
        },
        password: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        text: {
            marginBottom: 8,
            zIndex: 10,
        },
        btnItem: {
            display: 'flex',
            width: 200,
            height: 60,
            borderRadius: 8,
            fontSize: '18px',
            fontWeight: 600,
            [theme.breakpoints.down('md')]: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            },
        },
        containerBtn: {
            display: 'flex',
            justifyContent: 'center',
        },
        nav: {
            textDecoration: 'none',
            color: 'inherit',
        },
    };
};
export default styles;
