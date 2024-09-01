import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
          },
          {
            path: 'events/:eventId',
            element: <EventDetails />,
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
          },
          {
            path: 'profile',
            element: (
              <AuthGuard>
                <Profile />
              </AuthGuard>
            ),
          },
          {
            path: 'rewards',
            element: (
              <AuthGuard>
                <Rewards />
              </AuthGuard>
            ),
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
