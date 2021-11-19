const styles = (theme) => {
    return {
        app: {
            marginTop: 12,
            display: 'flex',
            webkitTouchCallout: 'none',
            webkitUserSelect: "none",
            khtmlUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            backgroundColor: "#fafcfe"
        },
        container: {
            display: 'flex',
        },

        modelStories: {
            display: 'flex',
            justifyContent: 'center',

        },
        contextStories: {
            margin: "0 12px",
            width: "100%",
            height: "80vh",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            borderRadius: 12,

        },
        author: {
            height: '70px',
            borderRadius: 4,
            position: 'absolute',
            zIndex: 99,
            top: '0%',
            left: '2%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        },
        btnDelete: {
            position: 'absolute',
            top: '2%',
            right: '0%',
            color: '#FFFFFF'
        },
        iconDelete: {
            width: '40px',
            height: '40px'
        },
        tittleStory: {
            position: 'absolute',
            zIndex: 99,
            top: '10%',
            left: '0%',
            right: '0%',
            display: 'flex',
            justifyContent: 'center',
        },
        avt: {
            width: '90%',
            maxWidth: '90%',
            height: '90%',
            marginRight: 8,
            borderRadius: 4,
        },
        textStories: {
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
        socket: {
            position: 'inherit',
            display: 'flex',
        },
        avatar: {
            marginBottom: '-20px',
        },
    };
};
export default styles;
