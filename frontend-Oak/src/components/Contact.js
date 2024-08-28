import React, { useState } from 'react';  
import axios from 'axios';  
import Header from './Header';  
import mapImage from '../assets/img/map-contact.png';  
import { useNavigate } from 'react-router-dom';
const ContactPage = () => {  
  const [contactDetails, setContactDetails] = useState({  
    fullName: '',  
    email: '',  
    phoneNumber: '',  
    message: '',  
  });  

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setContactDetails((prevState) => ({  
      ...prevState,  
      [name]: value,  
    }));  
  };  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {  
    e.preventDefault();  

    try {  
      const response = await axios.post('http://localhost:8000/api/v1/contact', contactDetails);  
      if (response.status === 201) {  
        alert('Message sent successfully!');  
        setContactDetails({  
          fullName: '',  
          email: '',  
          phoneNumber: '',  
          message: '',  
        });  
      } else {  
        alert('Failed to send message.');  
      }  
      navigate('/'); 
    } 
    catch (error) {  
      console.error('Error sending message:', error);  
      alert('Failed to send message.');  
    }  
  };  

  const openMapInNewWindow = () => {  
    window.open(  
      'https://www.google.com/maps/place/Hotel+oak+by+signature+airport+zone+hyderabad/@17.2605153,78.3891226,17z/data=!3m1!4b1!4m9!3m8!1s0x3bcbbdc2dc0e8837:0xc4b1d21f0157408!5m2!4m1!1i2!8m2!3d17.2605153!4d78.3916975!16s%2Fg%2F11rfc82rcm?entry=ttu',  
      '_blank'  
    );  
  };  

  return (  
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">  
      <Header />  

      {/* Hero Section */}  
      <div  
        className="relative bg-cover bg-center h-96 flex items-end justify-center pb-10"  
        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipN8f8Ro7waGpCTXdBHm_deT8HqyrJlRF80OnMn6=s1360-w1360-h1020)' }}  
      >  
        <div className="absolute inset-0 bg-black opacity-50"></div>  
        <div className="relative z-10 text-center text-white">  
          <h1 className="text-4xl font-bold">Contact Us</h1>  
          <p className="mt-2 text-lg">We'd love to hear from you! Fill out the form below to get in touch.</p>  
        </div>  
      </div>  

      {/* Contact Form and Map Section */}  
      <div className="container mx-auto py-10 px-4">  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center">  
          {/* Contact Form */}  
          <div className="bg-white p-8 rounded-lg shadow-lg lg:col-span-2 max-w-lg mx-auto">  
            <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>  
            <form onSubmit={handleSubmit}>  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">  
                <div>  
                  <label className="block font-semibold mb-1 text-gray-700">Your Full Name</label>  
                  <input  
                    type="text"  
                    name="fullName"  
                    value={contactDetails.fullName}  
                    onChange={handleInputChange}  
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    required  
                  />  
                </div>  
                <div>  
                  <label className="block font-semibold mb-1 text-gray-700">Email Address</label>  
                  <input  
                    type="email"  
                    name="email"  
                    value={contactDetails.email}  
                    onChange={handleInputChange}  
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    required  
                  />  
                </div>  
                <div>  
                  <label className="block font-semibold mb-1 text-gray-700">Contact Number</label>  
                  <input  
                    type="tel"  
                    name="phoneNumber"  
                    value={contactDetails.phoneNumber}  
                    onChange={handleInputChange}  
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    required  
                  />  
                </div>  
              </div>  

              <div className="mb-4">  
                <label className="block font-semibold mb-1 text-gray-700">Message</label>  
                <textarea  
                  name="message"  
                  value={contactDetails.message}  
                  onChange={handleInputChange}  
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                  rows="4"  
                  required  
                ></textarea>  
              </div>  

              <button  
                type="submit"  
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"  
              >  
                Send Message  
              </button>  
            </form>  
          </div>  

          {/* Map Section */}  
          <div className="relative h-64 w-full lg:h-80 lg:w-80 mx-auto">  
            <div  
              className="bg-cover bg-center rounded-lg h-full w-full cursor-pointer"  
              style={{ backgroundImage: `url(${mapImage})` }}  
              onClick={openMapInNewWindow}  
            >  
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>  
              <div className="relative z-10 flex items-center justify-center h-full">  
                <button  
                  className="bg-white text-black py-2 px-6 rounded-lg font-bold hover:bg-gray-300 transition duration-200"  
                >  
                  View On Map  
                </button>  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  

        
    </div>  
  );  
};  

export default ContactPage;