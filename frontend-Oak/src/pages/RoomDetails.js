import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import ScrollToTop from '../components/ScrollToTop';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const RoomDetails = () => {
  const { rooms, selectedRoomDetails, setSelectedRoomDetails } = useContext(RoomContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const room = rooms.find((room) => room.id === Number(id));

  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('totalAmount');

  useEffect(() => {
    if (totalAmount) {
      setSelectedRoomDetails((prevDetails) => ({
        ...prevDetails,
        totalAmount: parseFloat(totalAmount),
      }));
    }
  }, [totalAmount, setSelectedRoomDetails]);

  const [reviews, setReviews] = useState([]);
  const [isBreakfastIncluded, setIsBreakfastIncluded] = useState(false);

  const handleBreakfastToggle = () => {
    setIsBreakfastIncluded(!isBreakfastIncluded);
  };

  const calculateBreakfastCost = () => {
    const numberOfDays = selectedRoomDetails.numberOfDays || 1;
    const totalPeople = (selectedRoomDetails.adults || 0) + (selectedRoomDetails.kids || 0);
    return 200 * totalPeople * numberOfDays;
  };

  const handleNavigation = () => {
    const numberOfDays = selectedRoomDetails.numberOfDays || 1;
    const totalPeople = (selectedRoomDetails.adults || 0) + (selectedRoomDetails.kids || 0);
    const breakfastCost = isBreakfastIncluded ? 200 * totalPeople * numberOfDays : 0;
    const priceWithBreakfast = room.price * numberOfDays + breakfastCost;
    const taxes = Math.round(priceWithBreakfast * 0.12); // Assuming 12% tax rate
    const totalAmount = priceWithBreakfast + taxes;
  
    setSelectedRoomDetails((prevDetails) => ({
      ...prevDetails,
      roomType: room.name,
      price: priceWithBreakfast,
      isBreakfastIncluded,
      breakfastCost,
      taxes,
      totalAmount,
    }));
    navigate('/customerdetails');
  };

  const handleReplyChange = (e, index) => {
    const updatedReviews = reviews.map((review, i) => i === index ? { ...review, reply: e.target.value } : review);
    setReviews(updatedReviews);
  };

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <article>
      <Helmet>
        <title>{room.name} | Oak Hotel by Signature</title>
        <meta name="description" content={`Details and booking for ${room.name}. Enjoy luxury and comfort with our top-notch amenities.`} />
      </Helmet>
      <ScrollToTop />
      <header className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center">
        <div className="absolute w-full h-full bg-black/70"></div>
        <h1 className="text-4xl md:text-6xl text-white z-20 font-primary text-center">
          {room.name}
        </h1>
      </header>
      <section className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row h-full py-12 lg:py-24">
          <div className="w-full lg:w-[60%] px-4 md:px-6">
            <h2 className="h2 text-3xl md:text-4xl">{room.name}</h2>
            <p className="mb-8 text-lg">{room.description}</p>
            <img className="mb-8 w-full rounded shadow-lg" src={room.imageLg} alt={room.name} />
            <section>
              <h3 className="h3 text-2xl mt-8">Hotel Rules</h3>
              <ul className="mb-6 list-disc list-inside text-lg">
                <li>Quiet hours are observed from 10 PM to 7 AM</li>
                <li>Visitors must depart by 10 PM.</li>
                <li>Please maintain the room in good condition</li>
                <li>Use the in-room safe for storing valuables</li>
                <li>Contact the front desk in case of emergencies</li>
              </ul>
            </section>
          </div>
          <aside className="w-full lg:w-[40%] px-4 md:px-6">
            <ReservationSummary
              room={room}
              handleNavigation={handleNavigation}
              isBreakfastIncluded={isBreakfastIncluded}
              handleBreakfastToggle={handleBreakfastToggle}
              calculateBreakfastCost={calculateBreakfastCost}
            />
            <div className="mt-6">
              <h3 className="h3 text-2xl mb-3">Room Facilities</h3>
              <ul className="mb-12 list-disc list-inside">
                {room.facilities.map((facility, index) => (
                  <li key={index} className="flex items-center gap-x-2 text-lg">
                    {facility.icon}
                    <span>{facility.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">User Rating & Reviews</h2>
          <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-4">
            <div className="flex space-x-4 md:space-x-6 text-lg md:text-xl">
              <button className="font-bold text-blue-500 border-b-2 border-blue-500 pb-2">All</button>
              <button className="text-gray-500 hover:text-blue-500">Couple</button>
              <button className="text-gray-500 hover:text-blue-500">Family</button>
              <button className="text-gray-500 hover:text-blue-500">Business</button>
              <button className="text-gray-500 hover:text-blue-500">Group</button>
              <button className="text-gray-500 hover:text-blue-500">Solo</button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Rating Summary */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mr-4">
                  <p className="text-2xl font-bold text-blue-500">3.9</p>
                </div>
                <div>
                  <p className="text-blue-700 font-bold text-xl">Very Good</p>
                </div>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="flex justify-between items-center mb-2">
                    <td>Excellent</td>
                    <td className="w-full h-2 bg-gray-200 ml-4">
                      <div className="h-2 bg-blue-500" style={{ width: '53%' }}></div>
                    </td>
                    <td className="ml-2">53%</td>
                  </tr>
                  <tr className="flex justify-between items-center mb-2">
                    <td>Very Good</td>
                    <td className="w-full h-2 bg-gray-200 ml-4">
                       <div className="h-2 bg-blue-500" style={{ width: '14%' }}></div>
                    </td>
                    <td className="ml-2">14%</td>
                  </tr>
                  <tr className="flex justify-between items-center mb-2">
                    <td>Average</td>
                       <td className="w-full h-2 bg-gray-200 ml-4">
                         <div className="h-2 bg-blue-500" style={{ width: '12%' }}></div>
                       </td>
                    <td className="ml-2">12%</td>
                  </tr>
                  <tr className="flex justify-between items-center mb-2">
                    <td>Poor</td>
                    <td className="w-full h-2 bg-gray-200 ml-4">
                      <div className="h-2 bg-blue-500" style={{ width: '11%' }}></div>
                    </td>
                    <td className="ml-2">11%</td>
                  </tr>
                  <tr className="flex justify-between items-center mb-2">
                    <td>Bad</td>
                    <td className="w-full h-2 bg-gray-200 ml-4">
                      <div className="h-2 bg-blue-500" style={{ width: '10%' }}></div>
                    </td>
                    <td className="ml-2">10%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 font-bold">Last 10 Customer Ratings (Latest First)</p>
              <div className="flex space-x-1 mt-2">
                {[2, 5, 5, 5, 5, 5, 3, 4, 5, 3].map((rating, index) => (
                  <div key={index} className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-500 font-bold">
                    {rating}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-lg">Rating Categories</h3>
                <table className="mt-4 w-full">
                  <tbody>
                    <tr className="flex justify-between">
                      <td>Location</td>
                      <td className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-center">4.4</td>
                    </tr>
                    <tr className="flex justify-between">
                      <td>Cleanliness</td>
                      <td className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-center">3.8</td>
                    </tr>
                    <tr className="flex justify-between">
                      <td>Room</td>
                      <td className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-center">4.1</td>
                    </tr>
                    <tr className="flex justify-between">
                      <td>Food</td>
                      <td className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-center">4.0</td>
                    </tr>
                    <tr className="flex justify-between">
                      <td>Value for Money</td>
                      <td className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-center">4.0</td>
                    </tr>
                    <tr className="flex justify-between">
                      <td>Hospitality</td>
                      <td className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-center">5.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Right Side: Traveller Impressions */}
            <div className="w-full md:w-3/4 pl-0 md:pl-6">
              <div className="flex-1">
                <div className="flex flex-wrap justify-start items-center border-t pt-4 mt-4 space-x-2">
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Near To Airport</button>
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Food</button>
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Sumptuous Dinner</button>
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Friendly Staff</button>
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Good Ambiance</button>
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Clean Rooms</button>
                  <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2">Friendly Atmosphere</button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg">Traveller Impressions</h3>
                <p className="text-gray-700 mt-2">
                  The property is located near the airport and has clean and spacious rooms. Guests have appreciated the peaceful nature and beautiful views from the property. The food served at the restaurant is tasty and hygienic. The staff is polite, helpful and professional. The check-in process is smooth and easy. However, some guests have complained about maintenance issues like non-functional AC, dirty bed sheets and towels, and lack of toiletries. Overall, the property is a good option for a comfortable stay near the airport.
                </p>
              </div>
              <div className="mt-4" id="reviews">
                <h3 className="font-bold text-lg">Customer Reviews</h3>
                {reviews.map((review, index) => (
                  <div key={index} className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">{review.name}</p>
                        <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                        <p>{review.comment}</p>
                        {review.image && <img src={URL.createObjectURL(review.image)} alt="Review" className="mt-2 rounded shadow" />}
                      </div>
                      <div>
                        <textarea
                          name="reply"
                          value={review.reply}
                          onChange={(e) => handleReplyChange(e, index)}
                          placeholder="Reply to this review"
                          className="w-full mb-2 px-4 py-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

const ReservationSummary = ({ room, handleNavigation, isBreakfastIncluded, handleBreakfastToggle, calculateBreakfastCost }) => {
  const { selectedRoomDetails } = useContext(RoomContext);

  return (
    <div className="p-4 border rounded shadow-lg bg-white">
      <h3 className="text-xl font-semibold">{room.name}</h3>
      <div className="my-4">
        <div className="grid grid-cols-2 gap-2">
          <p><strong>Check-In:</strong> {selectedRoomDetails.checkInDate || "N/A"}</p>
          <p><strong>Check-Out:</strong> {selectedRoomDetails.checkOutDate || "N/A"}</p>
          <p><strong>Adults:</strong> {selectedRoomDetails.adults}</p>
          <p><strong>Kids:</strong> {selectedRoomDetails.kids}</p>
        </div>
      </div>
      <button
          className={`flex items-center justify-center px-4 py-2 mb-2 rounded border w-full ${isBreakfastIncluded ? 'text-blue-500 border-blue-500' : 'text-gray-700 border-gray-300'}`}
             onClick={handleBreakfastToggle}
            >
           <FaStar className={`mr-2 ${isBreakfastIncluded ? 'text-blue-500' : 'text-gray-700'}`} />
           Include Breakfast
           <span className="ml-2 text-500">Add for ₹{calculateBreakfastCost()}</span>
      </button>
      <ul className="list-disc pl-5">
        <li className="text-green-600">Free Cancellation till check-in</li>
        <li className="text-blue-500">Couples are allowed at our Property</li>
      </ul>
      <p className="text-2xl font-bold">₹ {room.price * selectedRoomDetails.numberOfDays + (isBreakfastIncluded ? calculateBreakfastCost() : 0)} + ₹ {Math.round((room.price * selectedRoomDetails.numberOfDays + (isBreakfastIncluded ? calculateBreakfastCost() : 0)) * 0.12)} taxes & fees</p>

      <button
        className="btn btn-lg btn-primary w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleNavigation}
      >
        BOOK THIS NOW
      </button>
      <div className="mt-4 border-t pt-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <p className="text-lg font-bold text-blue-500">3.9</p>
          </div>
          <div className="ml-4">
            <p className="font-bold text-blue-700">Very Good</p>
            <button
              className="text-blue-500 mt-2 underline"
              onClick={() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' })}
            >
              All Reviews
            </button>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <FaMapMarkerAlt className="text-blue-500" />
          </div>
          <div className="ml-4">
            <a
              href="https://www.google.com/maps/place/Hotel+oak+by+signature+airport+zone+hyderabad/@17.2605153,78.3891226,17z/data=!3m1!4b1!4m9!3m8!1s0x3bcbbdc2dc0e8837:0xc4b1d21f0157408!5m2!4m1!1i2!8m2!3d17.2605153!4d78.3916975!16s%2Fg%2F11rfc82rcm?entry=ttu"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Google Maps"
            >
              <span>10-23, New Airport Road, Shamshabad, Hyderabad, 501218</span>
            </a>
            <p className="text-sm text-blue-500 cursor-pointer">
              <a
                href="https://www.google.com/maps/place/Hotel+oak+by+signature+airport+zone+hyderabad/@17.2605153,78.3891226,17z/data=!3m1!4b1!4m9!3m8!1s0x3bcbbdc2dc0e8837:0xc4b1d21f0157408!5m2!4m1!1i2!8m2!3d17.2605153!4d78.3916975!16s%2Fg%2F11rfc82rcm?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                See on Map
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
