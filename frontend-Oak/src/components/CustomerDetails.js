import React, { useContext, useState, useEffect } from "react";
import { Box, Input, Button, Text, Image, Icon } from "@chakra-ui/react";
import axios from "axios";
import { RoomContext } from "../context/RoomContext";
import room20Img1 from "../assets/img/gallSlider/20.png";
import hotelImage from "../assets/img/gallSlider/20.png";  // Replace with your hotel image path
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const { selectedRoomDetails } = useContext(RoomContext);
  const initialCustomerDetails = {
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  };
  const [customerDetails, setCustomerDetails] = useState(initialCustomerDetails);
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    console.log("Selected Room Details:", selectedRoomDetails); // Add this line to verify
    setAmount(selectedRoomDetails.price);
    setTax(selectedRoomDetails.taxes);
    setTotalAmount(selectedRoomDetails.totalAmount);
  }, [selectedRoomDetails]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleBookNow = async () => {
    try {
      const bookingDetails = {
        customerDetails,
        roomId: selectedRoomDetails.roomId,
        checkInDate: selectedRoomDetails.checkInDate,
        checkOutDate: selectedRoomDetails.checkOutDate,
        amount: totalAmount * 100,
        currency: "INR",
        isBreakfastIncluded: selectedRoomDetails.isBreakfastIncluded,  // Add this line
        breakfastCost: selectedRoomDetails.breakfastCost,
      };
  
      const { data: { order } } = await axios.post("http://localhost:5000/api/v1/checkout", bookingDetails);
  
      setOrderId(order.id);
  
      const options = {
        key: 'rzp_test_kSxeaCRWjnIZhD',
        amount: totalAmount * 100, // amount in paisa
        currency: "INR",
        name: "Oak Hotel",
        description: "Payment for hotel booking",
        image: room20Img1,
        order_id: order.id,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          try {
            await axios.post("http://localhost:5000/api/v1/paymentverification", {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
            });
  
            // After successful payment verification, create the booking
            const bookingResponse = await axios.post("http://localhost:5000/api/v1/bookings", {
              customerDetails,
              roomId: selectedRoomDetails.roomId,
              checkInDate: selectedRoomDetails.checkInDate,
              checkOutDate: selectedRoomDetails.checkOutDate,
              amount: totalAmount,
              status: "confirmed",  
              isBreakfastIncluded: selectedRoomDetails.isBreakfastIncluded,  // Add this line
              breakfastCost: selectedRoomDetails.breakfastCost, 
            });
  
            console.log("Booking successful:", bookingResponse.data);
  
            alert("Booking and payment successful!");
  
            navigate('/');
          } catch (error) {
            console.error("Payment or booking verification failed:", error);
          }
        },
        theme: {
          color: "#121212",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };
  

  

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundColor: "#D5D5D5" }}>
      <div className="container mx-auto py-8 px-4">
        {/* Hotel Information Section */}
        <Box
          bg="#0C1938"
          p={4}
          rounded="lg"
          shadow="md"
          mb={8}
          display="flex"
          justifyContent="flex-start" // Left-aligns the content
          alignItems="center" // Centers the content vertically
          width="100%" // Covers the full width of the page
          minHeight="120px" // Adjust this value to increase the height of the box
        >
          <Text fontSize="28px" fontWeight="bold" color="white">
            Review your Booking
          </Text>
        </Box>

        <Box 
          position="relative" 
          zIndex={2} 
          mt={-40} // Adjust this value as needed to overlap more or less
          p={4} 
          bg="#F5F5F5" 
          rounded="lg" 
          shadow="md"
        >
          <Text fontSize="25px" fontWeight="bold" mt={4}>  
            Hotel Elite By Signature Group
            <Box ml={2} display="flex" >
              <Icon as={FaStar} color="blue" boxSize="12px" />
              <Icon as={FaStar} color="blue" boxSize="12px" />
              <Icon as={FaStar} color="blue" boxSize="12px" />
              <Icon as={FaStar} color="gray.400" boxSize="12px" />
              <Icon as={FaStar} color="gray.400" boxSize="12px" />
            </Box>
          </Text>
          
          <Text fontSize={{ base: "xs", md: "md" }} mt={{ base: 1, md: 2 }}>
          
            <ChakraLink 
            
              href="https://www.google.com/maps/place/Hotel+oak+by+signature+airport+zone+hyderabad/@17.2605153,78.3891226,17z/data=!3m1!4b1!4m9!3m8!1s0x3bcbbdc2dc0e8837:0xc4b1d21f0157408!5m2!4m1!1i2!8m2!3d17.2605153!4d78.3916975!16s%2Fg%2F11rfc82rcm?entry=ttu" 
              isExternal 
              color="blue.500" // Adds color to indicate it's a link
              
            >
             
              Hotel Elite By Signature Group, No11- 28/21, Shamshabad, Rangareddy, Hyderabad, India
            </ChakraLink>
          </Text>
          <Text fontSize={{ base: "xx-small", md: "sm" }} mt={{ base: 1, md: 2 }} fontWeight="bold" color="gray.500">
            Couple Friendly
          </Text>

          {/* Image positioned at the right corner */}
          <Image 
            src={hotelImage} 
            alt="Hotel Image" 
            boxSize="100px" 
            rounded="md" 
            position="absolute" 
            top="5%" 
            right="15px" // Adds right margin
            transform="translateY(-50%)" // Centers the image vertically
            zIndex={1} // This ensures the image is on top
          />
        </Box>

        <div className="flex flex-col md:flex-row gap-6 mt-3"> {/* Add top margin */}
          {/* Customer Details Section */}
          <Box bg="white" p={6} rounded="lg" shadow="md" w="full" flexBasis="60%"> {/* Adjusted width */}
            <div>
              <Text fontSize="25px" fontWeight="bold" mb={4}>Guest Details</Text>
              {/* Updated grid layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="font-semibold text-sm mb-1">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={customerDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm mb-1">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={customerDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="font-semibold text-sm mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={customerDetails.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col sm:col-span-2">
                  <label className="font-semibold text-sm mb-1">Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm mb-1">City</label>
                  <Input
                    type="text"
                    name="city"
                    value={customerDetails.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm mb-1">Zip Code</label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={customerDetails.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-sm mb-1">Country</label>
                  <Input
                    type="text"
                    name="country"
                    value={customerDetails.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                {/* <Button
                  colorScheme="yellow"
                  onClick={handleSubmit}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
                >
                  Submit
                </Button> */}
                <div className="text-m">
                  Need help?
                  <Link to="/contact" className="ml-1 text-blue-500 hover:text-blue-700">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </Box>

          {/* Order Summary Section */}
          <Box bg="white" p={6} rounded="lg" shadow="md" w="full" flexBasis="40%"> {/* Adjusted width */}
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Text fontWeight="bold">Order ID:</Text>
                <Text>{orderId || "N/A"}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Check-In Date:</Text>
                <Text>{selectedRoomDetails.checkInDate || "N/A"}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Check-Out Date:</Text>
                <Text>{selectedRoomDetails.checkOutDate || "N/A"}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Room Type:</Text>
                <Text>{selectedRoomDetails.roomType || "N/A"}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Adults:</Text>
                <Text>{selectedRoomDetails.adults || "N/A"}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Kids:</Text>
                <Text>{selectedRoomDetails.kids || "N/A"}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Room Price:</Text>
                <Text>₹{amount}</Text>
              </div>
              {selectedRoomDetails.isBreakfastIncluded && (
  <div className="flex justify-between">
    <Text fontWeight="bold">Breakfast Included:</Text>
    <Text>₹{selectedRoomDetails.breakfastCost || 0}</Text>
  </div>
)}


              <div className="flex justify-between">
                <Text fontWeight="bold">Taxes and Service Fees:</Text>
                <Text>₹{tax}</Text>
              </div>
              <div className="flex justify-between">
                <Text fontWeight="bold">Total Amount to be Paid:</Text>
                <Text>₹{totalAmount}</Text>
              </div>
            </div>
            <Button
              colorScheme="teal"
              mt={4}
              onClick={handleBookNow}
              className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700"
            >
              Book Now
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
