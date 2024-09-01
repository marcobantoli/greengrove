import { Outlet } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className='px-4 md:px-8 py-8 md:py-12'>
        <div className='max-w-6xl m-auto'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
