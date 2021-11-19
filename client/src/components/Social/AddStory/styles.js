const styles = (theme) => {
    return {
        app: {
            width: 130,
            height: 198,
            maxWidth: 130,
            maxHeight: 198,
            borderRadius: 12,
            position: 'relative',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            cursor: 'pointer',
        },
        container: {
            textAlign: 'center',
            position: 'absolute',
            bottom: '6%',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
        },
        icon: {
            width: '80%',
            height: '84%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            color: '#1977f2',
        },
        content: {
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            border: '3px solid #FFFFFF',
            borderRadius: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: '#FFFFFF',
        },
        author: {
            position: 'absolute',
            height: '40px',
            width: '36px',
            borderRadius: 4,
            top: '10%',
            left: '12%',
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnDelete: {
            position: 'absolute',
            top: '4%',
            right: '-12%',
            color: '#FFFFFF'
        },
        avt: {
            width: '90%',
            maxWidth: '90%',
            height: '90%',
            borderRadius: 4,
        },
    };
};
export default styles;
