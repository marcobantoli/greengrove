import { useState } from 'react';

export default function CreateEvent() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    contact: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Created:', formData);
    // Add event creation logic (e.g., API call)
  };

  return (
    <div>
      <div className='container mx-auto px-6 py-10'>
        <h1 className='text-4xl font-bold text-center mb-10'>
          Create an Event
        </h1>

        <form
          className='max-w-3xl mx-auto bg-base-100 p-8 shadow-lg rounded-lg'
          onSubmit={handleSubmit}
        >
          {/* Event Title */}
          <div className='mb-6'>
            <label htmlFor='title' className='block text-lg font-medium mb-2'>
              Event Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
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

          {/* Organizer Name */}
          <div className='mb-6'>
            <label
              htmlFor='organizer'
              className='block text-lg font-medium mb-2'
            >
              Organizer
            </label>
            <input
              type='text'
              id='organizer'
              name='organizer'
              value={formData.organizer}
              onChange={handleChange}
              className='input input-bordered w-full'
              required
            />
          </div>

          {/* Contact Details */}
          <div className='mb-6'>
            <label htmlFor='contact' className='block text-lg font-medium mb-2'>
              Contact Information
            </label>
            <input
              type='email'
              id='contact'
              name='contact'
              value={formData.contact}
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
