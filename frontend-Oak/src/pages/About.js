import React from "react";  
import { Swiper, SwiperSlide } from "swiper/react";  
import "swiper/css";  
import "swiper/css/effect-fade";  
import "swiper/css/navigation";  
import { EffectFade, Autoplay, Navigation } from "swiper";  
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation  
import Header from "../components/Header";  
import Img1 from "../assets/img/aboutSlider/1.png";  
import Img2 from "../assets/img/aboutSlider/2.png";  
import Img3 from "../assets/img/aboutSlider/3.png";  
import BackgroundImage from "../assets/img/bg.png";  

const images = [Img1, Img2, Img3];  

const AboutPage = () => {  
  const navigate = useNavigate(); // Initialize useNavigate  

  const handleCheckNowClick = () => {  
    navigate('/rooms'); // Navigate to the rooms page on button click  
  };  

  return (  
    <div className="relative">  
      <div  
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"  
        style={{ backgroundImage: `url(${BackgroundImage})` }}  
      ></div>  
      <div className="relative z-10">  
        <Header />  
        <div className="container mx-auto pt-32 py-12 flex flex-wrap lg:flex-nowrap">  
          <div className="w-full lg:w-1/2 lg:pr-8 relative mb-8 lg:mb-0">  
            <Swiper  
              modules={[EffectFade, Autoplay, Navigation]}  
              effect="fade"  
              loop={true}  
              autoplay={{  
                delay: 3000,  
                disableOnInteraction: false,  
              }}  
              navigation={true}  
              className="h-[300px] lg:h-[600px]"  
            >  
              {images.map((image, index) => (  
                <SwiperSlide  
                  key={index}  
                  className="flex justify-center items-center"  
                >  
                  <img  
                    src={image}  
                    alt={`About ${index + 1}`}  
                    className="object-cover h-full w-full cursor-pointer"  
                  />  
                </SwiperSlide>  
              ))}  
            </Swiper>  
          </div>  
          <div className="w-full lg:w-1/2 lg:pl-8">  
            <h3 className="text-3xl font-bold mb-4">About Oak by Signature Group</h3>  
            <h4 className="text-2xl font-semibold mb-2">Your Elegant Retreat Near the Airport</h4>  
            <p className="text-lg mb-4">  
              Welcome to *Oak by Signature Group*, where comfort meets elegance.  
              Our hotel features a selection of *45 beautifully appointed rooms*,  
              including *22 Signature Comfort*, *17 Signature Superior*,  
              and *6 Signature Suites*—designed for ultimate relaxation and style.  
            </p>  
            <h4 className="text-2xl font-semibold mb-2">The Ideal Location</h4>  
            <p className="text-lg mb-4">  
              Located in the *Shamshabad Airport Zone*, we offer a perfect blend of charm,  
              tranquility, and accessibility. Ideal for both leisure and business travelers,   
              our hotel serves as a gateway to explore the nearby *Shamshabad Airport*   
              and the vibrant city of *Hyderabad*.  
            </p>  
            <h4 className="text-2xl font-semibold mb-2">Exceptional Service</h4>  
            <p className="text-lg mb-4">  
              At *Oak by Signature Group*, our dedicated staff is committed to providing  
              personalized and attentive service. Our goal is to ensure that each guest has   
              a seamless and memorable experience during their stay.  
            </p>  
            <h4 className="text-2xl font-semibold mb-2">Amenities & Facilities</h4>  
            <p className="text-lg mb-4">  
              Spread across five floors, our hotel features a modern lift for easy access.  
              Enjoy our inviting lounge, where you can unwind with drinks, snacks, or a good book.  
              Don't miss our splendid terrace, perfect for relaxing in the lively atmosphere  
              of daily life from morning till evening.  
            </p>  
            {/* Book Now Button */}  
            <div className="flex justify-end mt-4">  
              <button  
                onClick={handleCheckNowClick}  
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"  
              >  
                Check Now  
              </button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default AboutPage;