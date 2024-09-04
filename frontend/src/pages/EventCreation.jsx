import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

export default function CreateEvent() {
  const { authToken } = useContext(AuthContext);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    await axios.post('http://localhost:8080/api/events', formData, config);

    setToastMessage('Event created successfully!');
    setShowToast(true);
  };

  // Auto-hide the toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div>
      <div className='container mx-auto px-6 py-10'>
        {/* Toast Notification */}
        {showToast && (
          <div className='fixed top-4'>
            <div className='toast toast-end'>
              <div
                className={`alert ${
                  toastMessage.includes('success')
                    ? 'alert-success'
                    : 'alert-error'
                }`}
              >
                <div>
                  <span>{toastMessage}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className='text-4xl font-bold text-center mb-10'>
          Create an Event
        </h1>

        <form
          className='max-w-3xl mx-auto bg-base-100 p-8 shadow-lg rounded-lg'
          onSubmit={handleSubmit}
        >
          {/* Event Name */}
          <div className='mb-6'>
            <label htmlFor='name' className='block text-lg font-medium mb-2'>
              Event Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='input input-bordered w-full'
              required
            />
          </div>

          {/* Event Description */}
          <div className='mb-6'>
            <label
              htmlFor='description'
              className='block text-lg font-medium mb-2'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='textarea textarea-bordered w-full'
              rows='4'
              required
            ></textarea>
          </div>

          {/* Event Date */}
          <div className='mb-6'>
            <label htmlFor='date' className='block text-lg font-medium mb-2'>
              Date
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              className='input input-bordered w-full'
              required
            />
          </div>

          {/* Event Time */}
          <div className='mb-6'>
            <label htmlFor='time' className='block text-lg font-medium mb-2'>
              Time
            </label>
            <input
              type='time'
              id='time'
              name='time'
              value={formData.time}
              onChange={handleChange}
              className='input input-bordered w-full'
              required
            />
          </div>

          {/* Event Location */}
          <div className='mb-6'>
            <label
              htmlFor='location'
              className='block text-lg font-medium mb-2'
            >
              Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              className='input input-bordered w-full'
              required
            />
          </div>

          {/* Submit Button */}
          <div className='text-center'>
            <button type='submit' className='btn btn-primary w-full md:w-1/2'>
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
