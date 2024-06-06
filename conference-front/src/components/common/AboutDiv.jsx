import React from "react";
import { useNavigate } from "react-router-dom";

function AboutDiv() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/about");
  }

  return (
    <div className="bg-white overflow-hidden relative lg:flex lg:items-center">
      <div className="w-full lg:w-full py-8 px-4 sm:px-6 lg:py-6 lg:px-8 md:m-8 ">
        <h2 className="text-3xl font-extrabold  sm:text-4xl text-transparent  bg-clip-text  mb-1 bg-gradient-to-r from-lime-500 to-orange-500">
          <span className="block">About Us</span>
        </h2>
        <p className="text-base md:text-lg mt-4 text-blueGray-500">
          We are dedicated to developing and implementing a comprehensive
          Conference Tracking System for the Ministry of Tourism, Wildlife, and
          Heritage. Our goal is to create a centralized platform that enhances
          the monitoring capabilities of the ministry and facilitates efficient
          management and tracking of international conferences, meetings, or
          symposia organized by government agencies. By providing a
          user-friendly and accessible system, we aim to streamline the input,
          storage, and retrieval of conference-related information.
        </p>
        <div className="lg:mt-8 mt-5">
          <button
            type="button"
            onClick={handleClick}
            className="py-2 px-4 bg-rose-600 hover:bg-rose-800 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Learn more
          </button>
        </div>
      </div>
      <div className="hidden sm:flex sm:w-3/5 p-8 lg:p-24">
        <div className="flex">
          <div className="w-1/2 mr-4">
            <img
              src="/src/assets/pexel3.jpg"
              className="w-full rounded-lg object-cover"
              alt="Tree"
            />
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-1 gap-8">
              <img
                src="/src/assets/pexel2.jpg"
                className="rounded-lg object-cover"
                alt="Tree"
              />
              <img
                src="/src/assets/pexel1.jpg"
                className="rounded-lg object-cover"
                alt="Tree"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutDiv;
