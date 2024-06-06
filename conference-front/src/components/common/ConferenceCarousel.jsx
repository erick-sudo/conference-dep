import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "/src/assets/background1.webp";
import image2 from "/src/assets/background2.webp";
import image3 from "/src/assets/background3.jpeg";
import image4 from "/src/assets/background4.jpeg";
import image5 from "/src/assets/background5.jpeg";
import image6 from "/src/assets/background6.jpeg";
import image7 from "/src/assets/background7.jpeg";

function ConferenceCarousel() {
  return (
    <div className="swiper-container">
          <div className="swiper-wrapper m-4">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
              }}
            >
             

              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image1}
                    alt="1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image2}
                    alt="2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image3}
                    alt="3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image4}
                    alt="4"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image5}
                    alt="5"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image6}
                    alt="6"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-128 h-96 rounded-lg overflow-hidden">
                  <img
                    src={image7}
                    alt="7"
                    className="w-full h-full object-cover"
                  />
                </div>
                
              </SwiperSlide>
              
            </Swiper>
          </div>
        </div>
  )
}

export default ConferenceCarousel