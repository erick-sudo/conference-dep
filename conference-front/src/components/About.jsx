import React, { useRef, useEffect, useState } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdLightbulbOutline,
  MdPeopleOutline,
  MdAccessibility,
  MdSecurity,
  MdTrendingUp,
} from "react-icons/md";
import "swiper/swiper-bundle.css";

import image1 from "../assets/background1.webp";
import image2 from "../assets/background2.webp";
import image3 from "../assets/background3.jpeg";
import image4 from "../assets/background4.jpeg";
import image5 from "../assets/background5.jpeg";
import image6 from "../assets/background6.jpeg";
import image7 from "../assets/background7.jpeg";


// Initialize Swiper plugins
SwiperCore.use([Pagination, Autoplay]);

const About = () => {
 

  return (
    <div className="container mx-auto p-8">
      {/* introduction section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-6xl font-bold md:mb-10">
            <span className="text-black">Discover More </span>
            <span className="text-lime-600">About Us</span>
          </h1>
          <p className="mt-4 text-lg text-blueGray-500">
            Welcome to our conference tracking website! We are dedicated to
            developing and implementing a comprehensive Conference Tracking
            System for the Ministry of Tourism, Wildlife, and Heritage. Our goal
            is to create a centralized platform that enhances the monitoring
            capabilities of the ministry and facilitates efficient management
            and tracking of international conferences, meetings, or symposia
            organized by government agencies. By providing a user-friendly and
            accessible system, we aim to streamline the input, storage, and
            retrieval of conference-related information.
          </p>
          <p className="mt-4 text-lg text-blueGray-500">
            Feel free to explore our website and browse through the various
            conferences available.
          </p>
          <a
            href="/conferences"
            className="inline-block rounded-lg mt-6 border border-transparent bg-red-600 px-5 py-3 text-center font-bold text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Explore Now
          </a>
        </div>
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
      </div>

      <div className="bg-white overflow-hidden relative lg:flex lg:items-center">
        <div className="w-full lg:w-full py-8 px-4 sm:px-6 lg:py-6 lg:px-8 md:m-8 ">
          <h2 className="text-4xl font-bold text-lime-600 sm:text-4xl text-transparent  bg-clip-text  mb-1 bg-gradient-to-r from-lime-500 to-orange-500">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-blueGray-500 ">
            Our mission is to develop and implement a comprehensive Conference
            Tracking System for the Ministry of Tourism, Wildlife, and Heritage.
            We aim to provide a centralized platform that enables efficient
            management and tracking of all international conferences, meetings,
            or symposia organized by government agencies. By creating a
            user-friendly and accessible system, we strive to enhance the
            monitoring capabilities of the ministry and facilitate the input,
            storage, and retrieval of conference-related information.
          </p>
          <h2 className="text-4xl font-bold text-lime-600 sm:text-4xl text-transparent  bg-clip-text  mt-4 bg-gradient-to-r from-lime-500 to-orange-500">
            Our Vision
          </h2>
          <p className="mt-4 text-lg text-blueGray-500">Our vision is to:</p>
          <ul className="list-disc list-inside mt-1 ml-5 text-lg text-blueGray-500 ">
            <li>
              Establish a cutting-edge web-based platform that revolutionizes
              the way conferences are managed and tracked.
            </li>
            <li>
              Create a centralized system that seamlessly integrates with
              various government ministries.
            </li>
            <li>
              Enable ministries to effortlessly add, update, and access relevant
              conference information.
            </li>
            <li>
              Promote transparency, accuracy, and efficiency in conference
              management.
            </li>
            <li>
              Support the Ministry of Tourism, Wildlife, and Heritage in
              monitoring and enhancing the tourism industry.
            </li>
            <li>
              Contribute to the growth and success of international conferences.
            </li>
            <li>Ensure the highest standards of data security and privacy.</li>
          </ul>
        </div>

        <div className="hidden sm:flex sm:w-3/5 gap-8 p-8 lg:p-24">
          <div className="flex flex-col w-full">
            <div className="h-96 mb-8">
              <img
                src="/src/assets/pexel1.jpg"
                className="w-full h-full rounded-lg object-cover"
                alt="Tree"
              />
            </div>
            <div className="flex ">
              <div className="w-full md:w-1/2 md:mr-4 mb-8 md:mb-0">
                <img
                  src="/src/assets/pexel3.jpg"
                  className="w-full h-48 rounded-lg object-cover"
                  alt="Tree"
                />
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="/src/assets/pexel2.jpg"
                  className="w-full h-48 rounded-lg object-cover"
                  alt="Tree"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* values section  */}
      <h2 className="text-4xl font-bold text-lime-600 mt-4 text-center">
        <span className="text-black">Core </span>
        <span className="text-lime-600">Values</span>
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-center">
          <MdLightbulbOutline className="text-8xl text-lime-600 mr-4 " />
          <p className="text-lg text-blueGray-500">
            Harnessing the power of technology and constantly innovating to
            deliver a state-of-the-art Conference Tracking System.
          </p>
        </div>
        <div className="flex items-center">
          <MdPeopleOutline className="text-8xl text-lime-600 mr-4" />
          <p className="text-lg text-blueGray-500">
            Fostering strong partnerships and collaboration with government
            agencies and ministries to create a unified and effective conference
            management solution.
          </p>
        </div>
        <div className="flex items-center">
          <MdAccessibility className="text-8xl text-lime-600 mr-4" />
          <p className="text-lg text-blueGray-500">
            Prioritizing a user-friendly and accessible platform for all
            stakeholders involved in conference planning and tracking.
          </p>
        </div>
        <div className="flex items-center">
          <MdSecurity className="text-6xl text-lime-600 mr-4" />
          <p className="text-lg text-blueGray-500">
            Upholding the highest standards of data integrity to ensure accuracy
            and reliability of conference-related information.
          </p>
        </div>
        <div className="flex items-center">
          <MdTrendingUp className="text-8xl text-lime-600 mr-4" />
          <p className="text-lg text-blueGray-500">
            Dedicated to continuous improvement based on user feedback and
            emerging industry trends, striving for excellence in functionality
            and performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
