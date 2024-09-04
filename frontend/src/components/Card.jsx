import { Link } from 'react-router-dom';
import placeholderImg from '../assets/placeholder.png';

export default function Card({ event }) {
  return (
    <div className='max-w-sm bg-base-100 shadow-lg rounded-lg overflow-hidden'>
      {/* Event Image */}
      <img
        src={event.image || placeholderImg}
        alt={event.name}
        className='w-full h-48 object-cover'
      />

      {/* Event Content */}
      <div className='p-6'>
        {/* Event Title and Date */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>{event.name}</h2>
          <span className='text-xs badge badge-outline badge-primary'>
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
        <Link
          to={`/events/${event.eventId}`}
          className='btn btn-primary w-full'
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
