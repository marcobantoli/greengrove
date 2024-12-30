export default function About() {
  return (
    <div>
      <div className='container mx-auto px-6 py-10'>
        {/* About Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>About Green Grove</h1>
          <p className='text-lg text-gray-700'>
            Learn more about our mission, values, and the impact we&apos;re
            making.
          </p>
        </div>

        {/* Mission Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-semibold mb-4'>Our Mission</h2>
          <p className='text-lg text-gray-800'>
            At Green Grove, our mission is to connect individuals,
            organizations, and communities through impactful tree planting
            events. We believe in creating a greener, more sustainable future by
            engaging people in environmental stewardship and community-building
            activities.
          </p>
        </div>

        {/* Vision Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-semibold mb-4'>Our Vision</h2>
          <p className='text-lg text-gray-800'>
            Our vision is to foster a global movement towards environmental
            sustainability. By providing opportunities for people to participate
            in tree planting and other green initiatives, we aim to raise
            awareness about the importance of environmental conservation and
            make a tangible difference in the world.
          </p>
        </div>

        {/* Values Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-semibold mb-4'>Our Values</h2>
          <ul className='list-disc list-inside text-lg text-gray-800'>
            <li>
              <strong>Environmental Stewardship:</strong> Committed to
              protecting and improving the environment through active
              participation in tree planting and other green initiatives.
            </li>
            <li>
              <strong>Community Engagement:</strong> Building stronger
              communities by encouraging collaboration and fostering a sense of
              shared responsibility for our planet.
            </li>
            <li>
              <strong>Integrity:</strong> Operating with transparency and
              accountability in all our activities, ensuring that our efforts
              have a genuine and positive impact.
            </li>
            <li>
              <strong>Innovation:</strong> Continuously seeking new and creative
              ways to enhance our programs and engage more people in our
              mission.
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className='text-3xl font-semibold mb-4'>Contact Us</h2>
          <p className='text-lg text-gray-800'>
            If you have any questions or would like to get involved, feel free
            to reach out to us:
          </p>
          <p className='text-lg text-gray-800 mt-2'>
            <strong>Email:</strong>{' '}
            <a href='mailto:info@greengrove.org' className='text-blue-500'>
              info@greengrove.org
            </a>
          </p>
          <p className='text-lg text-gray-800 mt-2'>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
