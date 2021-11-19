const styles = (theme) => {
    return {
        app: {
            background: `url(https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-purple-gradient-abstract-line-image_37728.jpg)`,
            width: '90vw',
            margin: '0 auto 100px',
            height: '600px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            position: 'relative',
            top: 96,
            [theme.breakpoints.down('md')]: {
                width: '100vw',
            },
        },
        slider: {
            position: 'absolute',
            background:
                `url(https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)
                    rgba(251,136,171, 0.3)`,
            width: '500px',
            height: '600px',
            top: '0%',
            right: '0%',
            backgroundBlendMode: 'multiply',
            borderRadius: '24px',
            [theme.breakpoints.down('md')]: {
                width: '100%',
                top: '20%',
                right: '0%',
                left: '0%',
            },
        },
        sliderText: {
            position: 'absolute',
            width: '500px',
            height: '600px',
            top: '10%',
            left: '0%',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                width: '100%',
                top: '20%',
                right: '0%',
                left: '0%',
            },
        },
        title: {
            color: '#000',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '64px',
            fontFamily: 'Segoe UI',
            margin: '12px 0 24px',
            [theme.breakpoints.down('md')]: {
                fontSize: '46px',
            },
        },
    };
};
export default styles;
