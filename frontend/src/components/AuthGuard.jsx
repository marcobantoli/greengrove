import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

export default function AuthGuard({ children }) {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    // If not authenticated, display a "Sign In" link
    return (
      <div className='flex flex-col items-center justify-center min-h-96'>
        <p className='mb-4'>You must be signed in to view this page.</p>
        <Link to='/login' className='btn btn-primary'>
          Sign In
        </Link>
      </div>
    );
  }

  // If authenticated, render the protected component
  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
