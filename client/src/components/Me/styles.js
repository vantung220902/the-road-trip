const styles = (theme) => {
    return {
        header: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 975,
            margin: "12px auto",
            paddingBottom: "24px",
            borderBottom: "1px solid #ccc",
        },
        app: {
            margin: "12px auto",
        },
        info: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        avt: {
            width: 300,
            height: 150,
        },
        iconAvt: {
            width: 150,
            height: 150,
        },
        name: {
            fontSize: 18,
            marginRight: 12,

        },
        btn: {
            marginRight: 12,
        },
        rootTab: {
            flexGrow: 1,
            maxWidth: 500,
            margin: '12px auto',
        },
        iconTab: {
            backgroundColor: 'none',
            fontSize: 16,
            color: '#000',
        },
        container: {
            maxWidth: 900,
            margin: "0 auto",
        },
        nav: {
            color: 'inherit',
            display: 'contents',
        }
    }
}
export default styles;