import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export default function MyEvents() {
  const events = useLoaderData().data;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace with your API endpoint and authentication headers if needed
        // const response = await axios.get('/api/user/events');
        // setEvents(response.data);
        setLoading(false); // Simulating data loading completion
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 pt-16 flex items-center justify-center'>
        <div className='text-lg text-gray-700'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-base-200 pt-16 flex items-center justify-center'>
        <div className='text-lg text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className='container mx-auto px-6 py-10'>
        <h1 className='text-4xl font-bold mb-10 text-center'>My Events</h1>
        {events.length > 0 ? (
          <div>
            {events.map((event) => (
              <div
                key={event.eventId}
                className='mb-8 p-6 bg-base-100 shadow-md rounded-lg flex flex-col md:flex-row'
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className='w-full md:w-1/3 h-48 md:h-auto object-cover rounded-lg md:rounded-none md:mr-6'
                />
                <div className='flex-1'>
                  <h2 className='text-2xl font-semibold mb-2'>{event.name}</h2>
                  <p className='text-gray-600 mb-2'>{event.date}</p>
                  <p className='text-gray-700 mb-4'>{event.location}</p>
                  <p className='text-gray-700 mb-6'>{event.description}</p>
                  <Link
                    to={`/events/${event.eventId}`}
                    className='btn btn-primary'
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-lg text-gray-700 text-center'>
            You are not registered for any events.
          </div>
        )}
      </div>
    </div>
  );
}
