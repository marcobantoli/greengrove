import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import Root from './components/Root';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import About from './pages/About';
import MyEvents from './pages/MyEvents';
import EventCreation from './pages/EventCreation';
import EventDetails from './pages/EventDetails';
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
            loader: async () => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              };
              return await axios.get(
                'http://localhost:8080/api/events',
                config
              );
            },
          },
          {
            path: 'events/:eventId',
            element: <EventDetails />,
            loader: async ({ params }) => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              };

              return await axios.get(
                `http://localhost:8080/api/events/${params.eventId}`,
                config
              );
            },
          },
          {
            path: 'events/create',
            element: (
              <AuthGuard>
                <EventCreation />
              </AuthGuard>
            ),
          },
          {
            path: 'events/me',
            element: (
              <AuthGuard>
                <MyEvents />
              </AuthGuard>
            ),
            loader: async () => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              };
              return await axios.get(
                'http://localhost:8080/api/event-participants/my-events',
                config
              );
            },
          },
          {
            path: 'profile',
            element: (
              <AuthGuard>
                <Profile />
              </AuthGuard>
            ),
            loader: async () => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              };
              return await axios.get(
                'http://localhost:8080/api/users/me',
                config
              );
            },
          },
          {
            path: 'rewards',
            element: (
              <AuthGuard>
                <Rewards />
              </AuthGuard>
            ),
            loader: async () => {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              };

              const [userPoints, availableRewards, earnedRewards] =
                await Promise.all([
                  axios.get('http://localhost:8080/api/points/total', config),
                  axios.get('http://localhost:8080/api/rewards', config),
                  axios.get('http://localhost:8080/api/user-rewards', config),
                ]);

              return { userPoints, availableRewards, earnedRewards };
            },
          },
          {
            path: 'about',
            element: <About />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
