import React from "react";
import conferenceImage from "/src/assets/chair.jpg";
import conferenceVideo from "../../assets/conference_video.mp4";

const styles = {
  backgroundImage: `url(${""})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(90%)",
  minHeight: "70vh",
};

function HeroSection() {
  return (
    <div>
      <div className="">
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <video autoPlay muted loop className="h-full w-full object-cover">
              <source src={conferenceVideo} type="video/mp4" />
            </video>
          </div>
          <div className=" bg-black/50 z-10 text-white py-36 px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-white font-bold mb-4 mt-8">
              Thriving above conference expectations
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 mt-8">
              <span className="text-lime-400 font-bold">Discover</span>
            </h1>
            <h1 className="text-white text-4xl md:text-7xl font-bold mb-6">Conferences</h1>
            <div className="flex flex-row">
              <div className="mt-8 text-center">
                <a
                  href="/conferences"
                  className="block w-full rounded font-bold bg-white px-8 py-3 text-sm  text-lime-600 shadow hover:text-lime-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
