import React, { createContext, useState } from 'react';

export const RoomSelectionContext = createContext();

export const RoomSelectionProvider = ({ children }) => {
  const [selectedRoomDetails, setSelectedRoomDetails] = useState({
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    adults: 1,
    kids: 0,
    price: 0,
  });

  return (
    <RoomSelectionContext.Provider value={{ selectedRoomDetails, setSelectedRoomDetails }}>
      {children}
    </RoomSelectionContext.Provider>
  );
};
