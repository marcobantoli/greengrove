import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='text-base-content py-10'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {/* Green Grove Section */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Green Grove</h3>
            <p className='text-gray-600'>
              Connecting communities, organizations, and individuals to make a
              greener future. Join us in planting trees and spreading greenery!
            </p>
          </div>

          {/* Navigation Links Section */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
            <ul>
              <li>
                <Link to='/' className='hover:underline text-gray-700'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/about' className='hover:underline text-gray-700'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/events/me' className='hover:underline text-gray-700'>
                  My Events
                </Link>
              </li>
              <li>
                <Link to='/rewards' className='hover:underline text-gray-700'>
                  Rewards
                </Link>
              </li>
              <li>
                <Link to='/profile' className='hover:underline text-gray-700'>
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Social Media Section */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Contact Us</h3>
            <p className='text-gray-600'>123 Green Street, Springfield, USA</p>
            <p className='text-gray-600'>Email: info@greengrove.com</p>
            <p className='text-gray-600 mb-4'>Phone: +1 (123) 456-7890</p>

            {/* Social Media Icons */}
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                className='text-gray-700 hover:text-primary'
                aria-label='Facebook'
              >
                <i className='fab fa-facebook-square fa-2x'></i>
              </a>
              <a
                href='https://twitter.com'
                className='text-gray-700 hover:text-primary'
                aria-label='Twitter'
              >
                <i className='fab fa-twitter-square fa-2x'></i>
              </a>
              <a
                href='https://instagram.com'
                className='text-gray-700 hover:text-primary'
                aria-label='Instagram'
              >
                <i className='fab fa-instagram-square fa-2x'></i>
              </a>
              <a
                href='https://linkedin.com'
                className='text-gray-700 hover:text-primary'
                aria-label='LinkedIn'
              >
                <i className='fab fa-linkedin fa-2x'></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-300 mt-10 pt-4 text-center text-gray-600'>
          &copy; {new Date().getFullYear()} Green Grove. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
