import React, { useContext } from 'react';
import CheckIn from './CheckIn'; // Ensure the path is correct
import CheckOut from './CheckOut'; // Ensure the path is correct
import AdultsDropdown from './AdultsDropdown'; // Ensure the path is correct
import KidsDropdown from './KidsDropdown'; // Ensure the path is correct
import { RoomContext } from '../context/RoomContext';

const BookForm = () => {
  const { handleClick } = useContext(RoomContext);

  return (
    <form className='h-[250px] w-full lg:h-[60px]'> {/* Decreased height and added width */}
      <div className='flex flex-col w-full h-full lg:flex-row'>
        <div className='flex-1 border-r'>
          <CheckIn />
        </div>
        <div className='flex-1 border-r'>
          <CheckOut />
        </div>
        <div className='flex-1 border-r'>
          <AdultsDropdown />
        </div>
        <div className='flex-1 border-r'>
          <KidsDropdown />
        </div>
        <button
          onClick={(e) => handleClick(e)}
          type='submit'
          className='btn btn-primary w-full lg:w-auto' 
        >
          Check now
        </button>
      </div>
    </form>
  );
};

export default BookForm;
