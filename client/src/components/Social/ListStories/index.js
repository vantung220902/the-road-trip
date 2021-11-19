import { withStyles, Button, Paper, Box, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import AddStory from '../AddStory';
import Story from '../Story';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as actionModal from '../../../actions/modalAction';
import Modal from '../../Modal';
import { addStories, watchStories, deleteStories } from '../../../actions/stories';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormStory from '../Form';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { API_UPLOAD_IMG } from '../../../constants';
import axios from 'axios';
import SwiperCore, {
    Pagination, Navigation
} from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css';
import "./styles.css";
SwiperCore.use([Pagination, Navigation]);
class ListStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            check: false,
            data: null,
            stories: [],
        };
    }
    componentDidMount() {
        const { watchStories, socket } = this.props;
        socket.on("receive_story", (data) => {
            this.setState({ data: data });
        });
        watchStories();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listStories !== this.props.listStories) {
            this.setState({
                stories: this.props.listStories,
                check: true,
            });

        }
    }
    handleChangeStories = (value) => {
        let { index } = this.state;
        const account = JSON.parse(localStorage.getItem('account'));
        index = index + value;
        const { actionModal, listStories, classes } = this.props;
        const length = listStories.length;
        const story = listStories[index];
        const { ChangeModel } = actionModal;
        if (index >= 0 && index < length) {
            ChangeModel((<Box className={classes.modelStories} >
                <Button className={classes.btnStories} onClick={() => { this.handleChangeStories(-1) }}
                    variant="text" color="primary">
                    <ChevronLeftIcon />
                </Button>
                <Paper className={classes.contextStories} style={{ backgroundImage: `url(${story.image})` }}>
                    <div className={classes.author}>
                        <img src={story.avt} className={classes.avt} alt="Avt" />
                        <Typography className={classes.textStories} >
                            {story.fullName}
                        </Typography>
                    </div>
                    <div className={classes.tittleStory}>
                        <Typography variant="h4" className={classes.textStories}>
                            {story.tittle}
                        </Typography>
                    </div>
                    {story.idAccount === account.id ? <Button variant="text"
                        onClick={() => { this.handleDelete(story.id) }}
                        color="secondary" className={classes.btnDelete} >
                        <HighlightOffIcon className={classes.iconDelete} />
                    </Button> : null}
                </Paper>
                <Button className={classes.btnStories} onClick={() => { this.handleChangeStories(1) }}
                    variant="text" color="primary">
                    <ChevronRightIcon />
                </Button>
            </Box >), "auto");
            this.setState({ index: index });
        } else if (index === length) {
            this.setState({ index: 0 });
        } else if (index === -1) {
            this.setState({ index: length });
        }

    }

    handleWatchStories = (id) => {
        const { actionModal, listStories, classes } = this.props;
        let index = listStories.findIndex(item => item.id === id);
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        const account = JSON.parse(localStorage.getItem('account'));
        let story = listStories[index];
        showModel();
        ChangeModelTitle('Watch Stories');
        ChangeModel((<Box className={classes.modelStories}>
            <Button className={classes.btnStories} onClick={() => { this.handleChangeStories(-1) }}
                variant="text" color="primary">
                <ChevronLeftIcon />
            </Button>
            <Paper className={classes.contextStories} style={{ backgroundImage: `url(${story.image})` }}>
                <div className={classes.author}>
                    <img src={story.avt} className={classes.avt} alt="Avt" />
                    <Typography className={classes.textStories}>
                        {story.fullName}
                    </Typography>
                </div>
                <div className={classes.tittleStory}>
                    <Typography variant="h4" className={classes.textStories}>
                        {story.tittle}
                    </Typography>
                </div>
                {story.idAccount === account.id ? <Button variant="text"
                    onClick={() => { this.handleDelete(story.id) }}
                    className={classes.btnDelete} >
                    <HighlightOffIcon className={classes.iconDelete} />
                </Button> : null}
            </Paper>
            <Button className={classes.btnStories} onClick={() => { this.handleChangeStories(1) }}
                variant="text" color="primary">
                <ChevronRightIcon />
            </Button>
        </Box >), "auto");
    };
    handleCreateStory = (data, data2) => {
        const { addStories, actionModal, socket } = this.props;
        const { hideModel } = actionModal;
        const account = JSON.parse(localStorage.getItem('account'));
        const newDate = new Date();
        const formData = new FormData();
        formData.append('file', data[0]);
        formData.append('upload_preset', 'y58ntib0');
        axios.post(`${API_UPLOAD_IMG}/upload`, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
            const urlImg = response.data.url;
            const status = response.status;
            if (status === 200) {
                socket.emit('send_story', {
                    ...data2,
                    image: urlImg,
                    name: account.fullName,
                    avt: account.avt,
                    idAccount: account.id,
                    datePost: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
                });
                addStories(urlImg, {
                    ...data2,
                    idAccount: account.id,
                    datePost: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
                });
            }

        })

        hideModel();

    }
    handleDelete = (id) => {
        const { deleteStories } = this.props;
        deleteStories(id);
    }
    handleClick = () => {
        const { actionModal } = this.props;
        const { showModel, ChangeModel, ChangeModelTitle } = actionModal;
        showModel();
        ChangeModelTitle('Create Stories');
        ChangeModel(<FormStory handleMySubmit={this.handleCreateStory} />, "auto");
    }
    render() {
        const { classes, listStories } = this.props;
        const account = JSON.parse(localStorage.getItem('account'));
        const { check, data } = this.state;
        let list = listStories;
        if (data) {
            listStories.unshift(data);
            list = [...new Set(listStories)];
        }
        return (
            <div className={classes.app}>

                <Swiper slidesPerView={5} spaceBetween={8} slidesPerGroup={5} loop={true} loopFillGroupWithBlank={true} pagination={{
                    "clickable": true
                }} navigation={true} className="mySwiper" key={1000} >
                    <SwiperSlide key={200}> <AddStory handleClick={this.handleClick} /></SwiperSlide>
                    {list.map((e, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Story
                                    key={e.id}
                                    id={e.id}
                                    handleDelete={this.handleDelete}
                                    handleWatchStories={this.handleWatchStories}
                                    name={e.name}
                                    avatar={e.avt ? e.avt : account.avt}
                                    image={e.image}
                                    active={e.idAccount === account.id || check}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <Modal />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listStories: state.stories.listStories,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actionModal: bindActionCreators(actionModal, dispatch),
        addStories: bindActionCreators(addStories, dispatch),
        watchStories: bindActionCreators(watchStories, dispatch),
        deleteStories: bindActionCreators(deleteStories, dispatch),
    };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ListStories);
