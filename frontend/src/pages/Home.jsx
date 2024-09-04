import { useLoaderData } from 'react-router-dom';
import Card from '../components/Card';

export default function Home() {
  const events = useLoaderData().data;

  const listEvents = events.map((event) => (
    <Card key={event.eventId} event={event} />
  ));

  return (
    <>
      <section className='mt-6 mb-1'>
        <label className='input input-bordered flex items-center gap-2'>
          <input type='text' className='grow' placeholder='Search' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </section>
      <section className='py-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listEvents}
        </div>
      </section>
    </>
  );
}
