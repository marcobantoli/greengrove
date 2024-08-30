import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='text-center text-3xl font-bold mb-6'>Sign Up</h2>
          <form>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                placeholder='Full Name'
                className='input input-bordered w-full'
              />
            </div>

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
              <label className='label'>
                <span className='label-text'>Confirm Password</span>
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                className='input input-bordered w-full'
              />
            </div>

            <button type='submit' className='btn btn-primary w-full'>
              Sign Up
            </button>
          </form>

          <div className='text-center mt-4'>
            <p className='text-sm'>
              Already have an account?{' '}
              <Link to='/login' className='link link-primary'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
