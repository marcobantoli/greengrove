import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed for API requests

// Mock data
const mockEvents = [
  {
    id: 1,
    title: 'Community Tree Planting Drive',
    date: 'September 30, 2024',
    location: 'Greenwood Park, Springfield',
    description:
      'Join our community for a tree planting drive at Greenwood Park! Help us plant over 200 saplings and contribute to a greener future. Bring your friends, family, and neighbors for a fun and fulfilling day in nature. All tools and refreshments will be provided.',
    image:
      'https://images.unsplash.com/photo-1516684669134-de6b695d3146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHRyZWUlMjBwbGFudGluZ3xlbnwwfHx8fDE2OTExNTIzMDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 2,
    title: 'Urban Forest Revival',
    date: 'October 15, 2024',
    location: 'City Center, Metropolis',
    description:
      'Be a part of our Urban Forest Revival project. We aim to restore greenery in the heart of the city with the help of passionate volunteers. This event will involve planting trees, shrubs, and other plants to enhance urban biodiversity.',
    image:
      'https://images.unsplash.com/photo-1530488325000-d9fa7f542c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHVuYmVsbGl2aWFsJTIwZnJlc2NodXJlJTIwcGxhbnRpbmclMjBldmVudHxlbnwwfHx8fDE2OTExNTI0MjI&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 3,
    title: 'Green Grove Tree Festival',
    date: 'November 5, 2024',
    location: 'Nature Reserve, Oakwood',
    description:
      'Celebrate the beauty of trees at the Green Grove Tree Festival! Enjoy a day filled with activities, workshops, and guest speakers focused on tree conservation and sustainable living. Fun for the whole family!',
    image:
      'https://images.unsplash.com/photo-1522312234107-1d35df4e292f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGdyZWVuJTIwZ292ZSUyMHRyZWVzbG9nZXxlbnwwfHx8fDE2OTExNTI1OTc&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 4,
    title: 'Annual Park Cleanup',
    date: 'December 1, 2024',
    location: 'Central Park, Rivertown',
    description:
      'Join us for our Annual Park Cleanup event. We will be collecting litter, planting trees, and working to improve the park’s facilities. Volunteers are encouraged to bring gloves and wear sturdy shoes.',
    image:
      'https://images.unsplash.com/photo-1580668387442-77f5e30e51e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGNhcmQtbGFuZC1hbGwlfGV2ZW50fGVufDB8fHx8MTY5MTE1MjYwOQ&ixlib=rb-4.0.3&q=80&w=400',
  },
];

export default function MyEvents() {
  const [events, setEvents] = useState(mockEvents);
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
                key={event.id}
                className='mb-8 p-6 bg-base-100 shadow-md rounded-lg flex flex-col md:flex-row'
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className='w-full md:w-1/3 h-48 md:h-auto object-cover rounded-lg md:rounded-none md:mr-6'
                />
                <div className='flex-1'>
                  <h2 className='text-2xl font-semibold mb-2'>{event.title}</h2>
                  <p className='text-gray-600 mb-2'>{event.date}</p>
                  <p className='text-gray-700 mb-4'>{event.location}</p>
                  <p className='text-gray-700 mb-6'>{event.description}</p>
                  <Link to={`/events/${event.id}`} className='btn btn-primary'>
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
