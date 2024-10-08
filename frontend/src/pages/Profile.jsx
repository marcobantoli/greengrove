import { useLoaderData, Link } from 'react-router-dom';

export default function Profile() {
  const profileData = useLoaderData().data;

  // Example user data (replace with real data or props)
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tree Planting at Green Park',
      date: 'September 15, 2024',
    },
    { id: 2, title: 'River Cleanup Drive', date: 'October 10, 2024' },
  ];

  return (
    <div>
      <div className='container mx-auto px-6 py-10'>
        {/* Profile Header */}
        <div className='flex flex-col md:flex-row items-center md:items-start bg-base-100 p-8 shadow-lg rounded-lg'>
          {/* Profile Image */}
          <div className='w-32 h-32 mb-6 md:mb-0 md:mr-8 rounded-full overflow-hidden'>
            <img
              src={
                profileData.profileImage || 'https://via.placeholder.com/150'
              }
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>

          {/* User Info */}
          <div className='flex-grow'>
            <h1 className='text-3xl font-bold'>{`${profileData.firstName} ${profileData.lastName}`}</h1>
            <p className='text-gray-600 mb-2'>{profileData.email}</p>
            <p className='text-gray-700 mb-4'>
              {profileData.bio ||
                'Nature enthusiast, tree lover, and community organizer.'}
            </p>
            <p className='text-gray-500'>{`${profileData.city}, ${profileData.state}`}</p>

            {/* Action Buttons */}
            <div className='mt-6'>
              <button className='btn btn-primary mr-4'>Edit Profile</button>
              <Link to='/events/me' className='btn btn-outline'>
                View My Events
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className='mt-12'>
          <h2 className='text-2xl font-bold mb-6'>Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className='bg-base-100 p-6 shadow-md rounded-lg'
                >
                  <h3 className='text-xl font-bold'>{event.title}</h3>
                  <p className='text-gray-600'>{event.date}</p>
                  <button className='btn btn-link mt-4'>View Details</button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-700'>No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );
}
