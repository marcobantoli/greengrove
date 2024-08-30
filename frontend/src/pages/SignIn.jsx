import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='text-center text-3xl font-bold mb-6'>Sign In</h2>
          <form>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Email'
                className='input input-bordered w-full'
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
              />
            </div>

            <div className='form-control mb-4'>
              <label className='label cursor-pointer'>
                <span className='label-text'>Remember me</span>
                <input type='checkbox' className='checkbox' />
              </label>
            </div>

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
