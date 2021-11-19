import React from 'react';
import HomePage from './../containers/HomePage';
import Detail from './../containers/Detail';
import Login from './../containers/SignPage/Login';
import Register from './../containers/SignPage/Register';
import SearchTickets from '../containers/Search/STickets';
import PayPage from '../containers/PayPage';
import UserEventsPage from '../containers/UserEventsPage';
import SchedulePage from '../containers/SchedulePage';
import Home from '../containers/DashboardPage/Home/index';
import UserList from '../containers/DashboardPage/UserList/index';
import User from '../containers/DashboardPage/User/index';
import NewUser from '../containers/DashboardPage/NewUser/index';
import PostList from '../containers/DashboardPage/PostList/index';
import Post from '../containers/DashboardPage/Post/index';
import NewPost from '../containers/DashboardPage/NewPost/index';
import SocialPage from '../containers/SocialPage';
import UserTrashPage from '../containers/UserTrashPage';
import MePage from '../containers/MePage';
import AccountPage from '../containers/AccountPage';
import UserTrashList from '../containers/DashboardPage/UserTrashList';
import Approval from '../containers/DashboardPage/Approval';
import TransactionsList from '../containers/DashboardPage/TransactionList';
import Transaction from '../containers/DashboardPage/Transaction';
import TransactionTrash from '../containers/DashboardPage/TransactionTrash';
import TicketsList from '../containers/DashboardPage/TicketsList';
import Ticket from '../containers/DashboardPage/Ticket';
import NewTicket from '../containers/DashboardPage/NewTicket';
import TrashTickets from '../containers/DashboardPage/TrashTickets';
import SendEmail from '../containers/DashboardPage/Emails';
export const API_ENDPOINT = 'http://localhost:3000';
export const API_UPLOAD_IMG =
    'https://api.cloudinary.com/v1_1/the-roap-trip/image';

export const ROUTE = [
    {
        path: '/',
        name: 'Home Page',
        exact: true,
        component: () => {
            return <HomePage />;
        },
    },
];
export const DETAIL_ROUTES = [
    {
        path: '/detail/:id',
        name: 'Detail',
        exact: false,
        component: ({ match, location }) => {
            return <Detail match={match} location={location} />;
        },
    },
];
export const SIGN_ROUTES = [
    {
        path: '/login',
        name: 'Login',
        exact: false,
        component: () => {
            return <Login />;
        },
    },
    {
        path: '/register',
        name: 'Register',
        exact: false,
        component: () => {
            return <Register />;
        },
    },
];
export const SEARCH_ROUTES = [
    {
        path: '/searchTickets',
        name: 'Search',
        exact: false,
        component: () => {
            return <SearchTickets />;
        },
    },
];
export const PAY_ROUTES = [
    {
        path: '/payments/:id',
        name: 'Payments',
        exact: false,
        component: ({ match, location }) => {
            return <PayPage match={match} location={location} />;
        },
    },
];
export const USER_EVENTS = [
    {
        path: '/user_events',
        name: 'User Events',
        exact: false,
        component: () => {
            return <UserEventsPage />;
        },
    },
    {
        path: '/user_trash',
        name: 'User Trash',
        exact: false,
        component: () => {
            return <UserTrashPage />;
        },
    },
];
export const SCHEDULED_ROUTES = [
    {
        path: '/schedule_events',
        name: 'Schedule Events',
        exact: false,
        component: () => {
            return <SchedulePage />;
        },
    },
];
export const ACTIVE_DASHBOARD_EVENTS = [
    {
        path: '/dashboard_event',
        name: 'DashBoard Event',
        exact: true,
        component: () => {
            return <Home />;
        },
    },
    {
        path: '/dashboard_event/users',
        name: 'DashBoard Event',
        exact: true,
        component: () => {
            return <UserList />;
        },
    },
    {
        path: '/dashboard_event/user/:id',
        name: 'DashBoard Event',
        exact: false,
        component: ({ match, location }) => {
            return <User match={match} location={location} />;
        },
    },
    {
        path: '/dashboard_event/newUser',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <NewUser />;
        },
    },
    {
        path: '/dashboard_event/posts',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <PostList />;
        },
    },
    {
        path: '/dashboard_event/post/:id',
        name: 'DashBoard Event',
        exact: false,
        component: ({ match, location }) => {
            return <Post match={match} location={location} />;
        },
    },
    {
        path: '/dashboard_event/newPost',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <NewPost />;
        },
    },
    {
        path: '/dashboard_event/trashUsers',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <UserTrashList />;
        },
    },
    {
        path: '/dashboard_event/approval',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <Approval />;
        },
    },
    {
        path: '/dashboard_event/transactions',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <TransactionsList />;
        },
    },
    {
        path: '/dashboard_event/transaction/:id',
        name: 'DashBoard Event',
        exact: false,
        component: ({ match, location }) => {
            return <Transaction match={match} location={location} />;
        },
    },
    {
        path: '/dashboard_event/trashTransactions',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <TransactionTrash />;
        },
    },
    {
        path: '/dashboard_event/ticketsList',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <TicketsList />;
        },
    },
    {
        path: '/dashboard_event/ticket/:id',
        name: 'DashBoard Event',
        exact: false,
        component: ({ match, location }) => {
            return <Ticket match={match} location={location} />;
        },
    },
    {
        path: '/dashboard_event/newTicket',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <NewTicket />;
        },
    },
    {
        path: '/dashboard_event/trashTickets',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <TrashTickets />;
        },
    },
    {
        path: '/dashboard_event/sendEmail',
        name: 'DashBoard Event',
        exact: false,
        component: () => {
            return <SendEmail />;
        },
    },
];
export const SOCIAL_NETWORK = [
    {
        path: '/social',
        name: 'Social Network',
        exact: false,
        component: () => {
            return <SocialPage />;
        },
    },
];
export const ME = [
    {
        path: '/me',
        name: 'Me',
        exact: false,
        component: () => {
            return <MePage />;
        },
    },
];
export const PERSON = [
    {
        path: '/person/:id',
        name: 'Person',
        exact: false,
        component: ({ match, location }) => {
            return <AccountPage match={match} location={location} />;
        },
    },
];

