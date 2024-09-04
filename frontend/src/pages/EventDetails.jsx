import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function EventDetails() {
  const { authToken } = useContext(AuthContext);
  const eventDetails = useLoaderData().data;

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleJoinEvent = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    await axios.post(
      'http://localhost:8080/api/event-participants',
      {
        eventId: eventDetails.eventId,
      },
      config
    );

    setToastMessage('Successfully Registered');
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
      {/* Event Banner */}
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

      <div
        className='relative w-full h-80 bg-cover bg-center'
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white text-center'>
            {eventDetails.name}
          </h1>
        </div>
      </div>

      {/* Event Content */}
      <div className='container mx-auto px-6 py-10'>
        <p className='text-lg text-gray-800 mb-6'>{eventDetails.description}</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Date & Time</h2>
            <p className='text-gray-700'>{eventDetails.date}</p>
            <p className='text-gray-700'>{eventDetails.time}</p>
          </div>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Location</h2>
            <p className='text-gray-700'>{eventDetails.location}</p>
          </div>
        </div>

        <div className='mb-10'>
          <h2 className='text-2xl font-bold mb-2'>Organizer</h2>
          <p className='text-gray-700'>
            {eventDetails.organizer || 'Organizer Placeholder'}
          </p>
          <p className='text-gray-700'>
            {eventDetails.contact || 'Contact Placeholder'}
          </p>
        </div>

        <div className='text-center'>
          <button
            className='btn btn-primary text-lg px-10'
            onClick={handleJoinEvent}
          >
            Join Event
          </button>
        </div>
      </div>
    </div>
  );
}
