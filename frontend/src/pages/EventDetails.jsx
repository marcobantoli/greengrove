export default function EventDetails() {
  // Example event data (replace with real data or props)
  const event = {
    id: 1,
    title: 'Community Tree Planting Event',
    description:
      'Join us for a community tree planting event to help restore our local park! This is a great opportunity to connect with nature and give back to the community.',
    date: 'September 15, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Green Park, Springfield',
    organizer: 'Green Grove Organization',
    contact: 'contact@greengrove.org',
    image: 'https://via.placeholder.com/1200x400', // Placeholder image, replace with a real one
  };

  return (
    <div>
      {/* Event Banner */}
      <div
        className='relative w-full h-80 bg-cover bg-center'
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white text-center'>
            {event.title}
          </h1>
        </div>
      </div>

      {/* Event Content */}
      <div className='container mx-auto px-6 py-10'>
        <p className='text-lg text-gray-800 mb-6'>{event.description}</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Date & Time</h2>
            <p className='text-gray-700'>{event.date}</p>
            <p className='text-gray-700'>{event.time}</p>
          </div>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Location</h2>
            <p className='text-gray-700'>{event.location}</p>
          </div>
        </div>

        <div className='mb-10'>
          <h2 className='text-2xl font-bold mb-2'>Organizer</h2>
          <p className='text-gray-700'>{event.organizer}</p>
          <p className='text-gray-700'>{event.contact}</p>
        </div>

        <div className='text-center'>
          <button className='btn btn-primary text-lg px-10'>Join Event</button>
        </div>
      </div>
    </div>
  );
}
