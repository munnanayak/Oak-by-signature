import React, { createContext, useEffect, useState } from 'react';
import { roomData } from '../data';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(roomData);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kids');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState({
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    adults: 1,
    kids: 0,
    price: 0,
    isBreakfastIncluded: false,
    taxes: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    const numberOfAdults = parseInt(adults.split(' ')[0], 10);
    const numberOfKids = parseInt(kids.split(' ')[0], 10);
    setTotal(numberOfAdults + numberOfKids);
  }, [adults, kids]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    const checkInDate = document.querySelector('#checkIn').value;
    const checkOutDate = document.querySelector('#checkOut').value;
    const adultsCount = parseInt(adults.split(' ')[0], 10);
    const kidsCount = parseInt(kids.split(' ')[0], 10);

    // Calculate the number of days between check-in and check-out
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Update the price based on the number of days
    const updatedRooms = roomData.map(room => {
      const newPrice = room.price * numberOfDays;
      return { ...room, totalAmount: newPrice };
    });

    setRooms(updatedRooms);

    setSelectedRoomDetails((prevDetails) => ({
      ...prevDetails,
      checkInDate,
      checkOutDate,
      adults: adultsCount,
      kids: kidsCount,
      numberOfDays,
    }));

    const newRooms = updatedRooms.filter((room) => {
      return total <= room.maxPerson;
    });

    setTimeout(() => {
      setRooms(newRooms);
      setLoading(false);
    }, 3000);
  };

  const updateRoomDetails = (details) => {
    setSelectedRoomDetails((prevDetails) => ({
      ...prevDetails,
      ...details,
    }));
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        adults,
        setAdults,
        kids,
        setKids,
        handleClick,
        loading,
        selectedRoomDetails,
        setSelectedRoomDetails,
        updateRoomDetails,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
