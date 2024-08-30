export default function Card() {
  const event = {
    id: 1,
    title: 'Community Tree Planting Drive',
    date: '2024-08-28',
    location: 'Greenwood Park, Springfield',
    description:
      'Join our community for a tree planting drive at Greenwood Park! Help us plant over 200 saplings and contribute to a greener future. Bring your friends, family, and neighbors for a fun and fulfilling day in nature. All tools and refreshments will be provided.',
    image:
      'https://images.unsplash.com/photo-1516684669134-de6b695d3146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHRyZWUlMjBwbGFudGluZ3xlbnwwfHx8fDE2OTExNTIzMDA&ixlib=rb-4.0.3&q=80&w=400', // Replace with a relevant event image URL
    organizer: 'Green Grove Community',
    contactEmail: 'info@greengrove.org',
    contactPhone: '+1 (555) 123-4567',
    participants: 78, // Number of participants already registered
    maxParticipants: 100, // Maximum number of participants allowed
    rewards: [
      { name: 'Eco-Friendly Water Bottle', points: 50 },
      { name: 'Green Grove T-Shirt', points: 100 },
    ],
  };

  return (
    <div className='max-w-sm bg-base-100 shadow-lg rounded-lg overflow-hidden'>
      {/* Event Image */}
      <img
        src={event.image}
        alt={event.title}
        className='w-full h-48 object-cover'
      />

      {/* Event Content */}
      <div className='p-6'>
        {/* Event Title and Date */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>{event.title}</h2>
          <span className='badge badge-outline badge-primary'>
            {event.date}
          </span>
        </div>

        {/* Event Location */}
        <p className='text-gray-600 mb-4'>
          <span className='font-semibold'>Location:</span> {event.location}
        </p>

        {/* Event Description */}
        <p className='text-gray-700 mb-6'>{event.description}</p>

        {/* Event Actions */}
        <button className='btn btn-primary w-full'>View Details</button>
      </div>
    </div>
  );
}
