import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowsFullscreen, BsPeople } from 'react-icons/bs';
import { RoomContext } from '../context/RoomContext';

const Room = ({ room }) => {
  const { selectedRoomDetails } = useContext(RoomContext);
  const { id, name, image, size, maxPerson, description, price, totalAmount } = room;
  const numberOfDays = selectedRoomDetails.numberOfDays || 1;
  const displayPrice = totalAmount || (price * numberOfDays);
  
  return (
    <div className='bg-white shadow-2xl min-h-[500px] group'>
      <div className='overflow-hidden'>
        <img
          className='group-hover:scale-110 transition-all duration-300 w-full'
          src={image}
          alt=''
        />
      </div>
      <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
        <div className='flex justify-between w-full px-4'>
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsArrowsFullscreen className='text-[15px]' />
            </div>
            <div className='flex gap-x-1'>
              <div>Size</div>
              <div>{size}SF</div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsPeople className='text-[15px]' />
            </div>
            <div className='flex gap-x-1 text-sm'>
              <div>Max</div>
              <div>People</div>
              <div>{maxPerson}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <Link to={`/room/${id}?totalAmount=${displayPrice}`}>
          <h3 className='h3'>{name}</h3>
        </Link>
        <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>
          {description.slice(0, 56)}...
        </p>
      </div>
      <Link
        to={`/room/${id}?totalAmount=${displayPrice}`}
        className='btn btn-secondary btn-sm max-w-[300px] mx-auto'
      >
        Book now from ₹{displayPrice}
      </Link>
    </div>
  );
};

export default Room;
