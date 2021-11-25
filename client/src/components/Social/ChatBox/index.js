import React, { Component } from 'react';
import { Paper, withStyles, Snackbar, Box, Typography } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MessageLeft from "./Message/messageLeft";
import MessageRight from "./Message/messageRight";
import styles from './styles';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { hideChatBox } from '../../../actions/ui';
import { showChatBox } from '../../../actions/ui';
import CloseIcon from '@material-ui/icons/Close';
import { socket } from '../../../comom/socket';
import { addMessage } from '../../../actions/message';
import { watchMessage, deleteMessage } from '../../../actions/message';
import ScrollToBottom from 'react-scroll-to-bottom';
const account = JSON.parse(localStorage.getItem('account'));
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMessage: "",
            list: [],
            data: null,
            checked: true,
            idRSocket: -1,
        }
    }
    componentDidMount() {
        const { showChatBox, watchMessage, listMessage } = this.props;
        const { checked } = this.state;
        socket.on("receive_message", (data) => {
            showChatBox();
            if (checked) {
                watchMessage(data.idUSend);
            }
            this.setState({ list: [...listMessage, data], checked: false, idRSocket: data.idUSend });
        });
    }
    setCurrentMessage = (value) => {
        this.setState({ currentMessage: value });
    }
    handleDelete = (id) => {
        const { deleteMessage } = this.props;
        deleteMessage(id);
    }
    sendMessage = async () => {
        const { currentMessage, idRSocket } = this.state;
        const { idReceive, listMessage, addMessage } = this.props;
        const last = listMessage[listMessage.length - 1];
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        if (currentMessage !== "") {
            const messageData = {
                id: last ? last.id + 2 : 1000,
                idUSend: account.id,
                idUReceive: idRSocket !== -1 ? idRSocket : idReceive,
                body: currentMessage,
                dateSend: today,
                avt: account.avt,
                fullName: account.fullName,
            };
            addMessage(messageData);
            await socket.emit('send_message', messageData);
            this.setState({ data: messageData, currentMessage: "" });
        }
    };
    render() {
        const { classes, openChat, hideChatBox, listMessage } = this.props;
        const { currentMessage, list } = this.state;
        const array = list.length > 1 ? list : listMessage;

        return (
            <Snackbar open={openChat}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={hideChatBox}
                message="Chat Box"

            >
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Box className={classes.header}>
                            <Typography>
                                Chat with tung
                            </Typography>
                            <Button variant="text" onClick={hideChatBox}>
                                <CloseIcon />
                            </Button>
                        </Box>
                        <ScrollToBottom id="style-1" className={classes.messagesBody}>
                            {
                                array.map(e => {
                                    if (e.idUSend === account.id) {
                                        return (<MessageRight key={e.id}
                                            id={e.id}
                                            message={e.body}
                                            timestamp={e.dateSend.slice(0, 10)}
                                            photoURL={e.avt}
                                            displayName={e.fullName}
                                            avatarDisp={true}
                                            handleDelete={this.handleDelete}
                                        />)
                                    } else {
                                        return (<MessageLeft key={e.id}
                                            message={e.body}
                                            timestamp={e.dateSend.slice(0, 10)}
                                            photoURL={e.avt}
                                            displayName={e.fullName}

                                        />)
                                    }
                                })
                            }
                        </ScrollToBottom>
                        <form className={classes.wrapForm} noValidate autoComplete="off">
                            <TextField
                                id="standard-text"
                                label="enter input"
                                value={currentMessage}
                                onChange={(e) => { this.setCurrentMessage(e.target.value); }}
                                onKeyPress={(e) => {
                                    e.key === 'Enter' && this.sendMessage();
                                }}
                                className={classes.wrapText}
                            />
                            <Button variant="contained" color="primary"
                                onClick={this.sendMessage}
                                className={classes.button}>
                                <SendIcon />
                            </Button>
                        </form>
                    </Paper>
                </div>
            </Snackbar>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        openChat: state.ui.openChat,
        listMessage: state.message.listMessage,
        idReceive: state.ui.idReceive,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        hideChatBox: bindActionCreators(hideChatBox, dispatch),
        addMessage: bindActionCreators(addMessage, dispatch),
        showChatBox: bindActionCreators(showChatBox, dispatch),
        watchMessage: bindActionCreators(watchMessage, dispatch),
        deleteMessage: bindActionCreators(deleteMessage, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(Message);
