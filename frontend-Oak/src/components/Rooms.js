// Rooms.js
import React, { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';
import Room from './Room';
import { SpinnerDotted } from 'spinners-react';
import BookForm from './BookForm';

const Rooms = () => {
  const { rooms, loading } = useContext(RoomContext);

  return (
    <section className='py-10'>
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted color='white' />
        </div>
      )}
      <div className='container mx-auto lg:px-0'>
        <div className='flex flex-col items-center'>
          <div className='text-center mb-8'>
            <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>
              Hotel & Restaurant
            </div>
            <h2 className='font-primary text-[45px]'>Room & Suites</h2>
          </div>

          {/* Ensure that the BookForm is only rendered here on the Rooms page */}
          <div className='w-full max-w-4xl'>
            <BookForm />
          </div>
        </div>

        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0 mt-8'>
          {rooms.map((room) => {
            return <Room room={room} key={room.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
