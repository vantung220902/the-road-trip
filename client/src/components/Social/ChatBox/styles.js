const styles = (theme) => {
    return {
        paper: {
            width: "80vw",
            height: "66vh",
            maxWidth: "328px",
            maxHeight: "400px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "300px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 100,
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            height: "calc( 100% - 80px )"
        },
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            margin: theme.spacing(1),
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: theme.color.primary,
        }
    }
}
export default styles;