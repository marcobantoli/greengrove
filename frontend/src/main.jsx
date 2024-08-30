import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './pages/Root';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import EventCreation from './pages/EventCreation';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import MyEvents from './pages/MyEvents';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'events/:eventId',
        element: <EventDetails />,
      },
      {
        path: 'events/create',
        element: <EventCreation />,
      },
      {
        path: 'events/me',
        element: <MyEvents />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'rewards',
        element: <Rewards />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
