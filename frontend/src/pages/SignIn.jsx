import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = { email, password };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/signin',
        body
      );

      const { token, expiresIn } = response.data;

      login(token, expiresIn);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='text-center text-3xl font-bold mb-6'>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Email'
                className='input input-bordered w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Password'
                className='input input-bordered w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-control mb-4'>
              <label className='label cursor-pointer'>
                <span className='label-text'>Remember me</span>
                <input
                  type='checkbox'
                  className='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </label>
            </div>

            {error && <p className='text-red-500'>{error}</p>}

            <button type='submit' className='btn btn-primary w-full'>
              Sign In
            </button>
          </form>

          <div className='text-center mt-4'>
            <p className='text-sm'>
              Don't have an account?{' '}
              <Link to='/signup' className='link link-primary'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
