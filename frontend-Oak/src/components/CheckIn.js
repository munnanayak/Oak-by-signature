import React, { useState } from 'react';
// datepicker
import DatePicker from 'react-datepicker';
// datepicker css
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
// icons
import { BsCalendar } from 'react-icons/bs';

const CheckIn = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <div className='relative flex items-center justify-end h-full'>
      {/* icon */}
      <div className='absolute z-10 pr-8'>
        <div>
          <BsCalendar className='text-accent text-base' />
        </div>
      </div>
      <DatePicker
        id="checkIn"
        className='w-full h-full'
        selected={startDate}
        placeholderText='Check in'
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default CheckIn;
