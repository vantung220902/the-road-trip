const styles = (theme) => {
    return {
        app: {
            borderRadius: 12,
            marginTop: 14,
            marginBottom: 6,
            width: "100%",
        },
        gridContainer: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        img: {
            marginTop: 8,
            verticalAlign: 'middle',
            width: '100%',
            borderRadius: 8,
            height: '100%',
            objectFit: 'cover',
        },
        column: {
            flex: '50%',
            padding: ' 0 4px',
            [theme.breakpoints.down('md')]: {
                flex: '100%',
            },
        },
        heading: {
            display: 'flex',
            alignItems: 'center',
        },
        comment: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 12px',
        },
        containerBtn: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '12px',
        },
        btn: {
            marginRight: 12,
        },
        avatar: {
            marginBottom: '-20px',
        },
        sort: {
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            width: '92%',
        },
        comments: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 12,
        },
        infoComment: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        avatarComment: {
            marginRight: 12,
            marginTop: '-20px',
        },
        nameComment: {
            marginRight: 12,
        },
        commentContainer: {
            width: "100%",
            height: "100%",
            maxHeight: 500,
            overflowY: "scroll",
            overflowX: "hidden",
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        }
    };
};
export default styles;
