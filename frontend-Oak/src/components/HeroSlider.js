// HeroSlider.js

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper';
import Img1 from '../assets/img/heroSlider/1.jpg';
import Img2 from '../assets/img/heroSlider/2.png';
import Img3 from '../assets/img/heroSlider/3.jpg';

const slides = [
  {
     title: 'For  Luxury Accommodation ',
    bg: Img1,
  },
  {
     title: 'For  Luxury Accommodation ',
    bg: Img2,
  },
  {
     title: ' For Luxury Accommodation ',
    bg: Img3,
  },
];

const HeroSlider = () => {
  // const handleReviewsClick = () => {
  //   window.open('/homereview', '_blank');
  // };

  return (
    <div id='home'>
  <Swiper
    modules={[EffectFade, Autoplay]}
    effect={'fade'}
    loop={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    className='heroSlider h-[600px] lg:h-[860px] mb-0' // Removed bottom margin
  >
    {slides.map((slide, index) => {
      const { title, bg } = slide;
      return (
        <SwiperSlide
          className='h-full relative flex justify-center items-center'
          key={index}
        >
          <div className='z-20 text-white text-center'>
            <div className='uppercase font-tertiary tracking-[6px] mb-5 opacity-95'>
            Welcome to Oak Hotel by Signature
            </div>
            <h1 
  className='text-[24px] lg:text-[48px] font-primary uppercase tracking-[2px] max-w-[920px] leading-tight mb-6 text-shadow opacity-95'>
  {title}
</h1>

            {/* <button
              onClick={handleReviewsClick}
              className='text-white py-2 px-4 rounded mt-4 bg-transparent border border-white text-lg'
            >
              User Rating & Reviews
            </button> */}
          </div>
          <div className='absolute top-0 w-full h-full'>
            <img
              className='object-cover h-full w-full'
              src={bg}
              alt='Slide Background'
            />
          </div>
          <div className='absolute w-full h-full bg-black/50'></div>
        </SwiperSlide>
      );
    })}
  </Swiper>
</div>

  );
};

export default HeroSlider;
