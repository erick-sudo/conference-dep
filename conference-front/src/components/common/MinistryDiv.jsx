import React from 'react';
import defenceImage from '/src/assets/defence.png';
import educationImage from '/src/assets/education.jpg';
import energyImage from '/src/assets/energy.jpeg';
import healthImage from '/src/assets/health.png';
import miningImage from '/src/assets/mining.jpg';
import presidentImage from '/src/assets/president.png';
import tourismImage from '/src/assets/tourism.jpeg';
import waterImage from '/src/assets/water.png';

function MinistryDiv() {
  return (
    <div>
      <div className="container mx-auto justify-center items-center h-auto p-8 -mt-8">
        <h1 className="text-center text-4xl mb-8">
          Our <span className="text-4xl text-lime-600 font-bold">Ministries</span>
        </h1>

        <div className="mx-auto grid grid-cols-2 md:grid-cols-4  lg:grid-cols-4 gap-4 mt-4">
          <div className="h-48">
            <img src={defenceImage} alt="defence" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={educationImage} alt="education" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={energyImage} alt="energy" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={healthImage} alt="health" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={miningImage} alt="mining" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={presidentImage} alt="president" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={tourismImage} alt="tourism" className="h-full md:w-2/3 object-contain" />
          </div>

          <div className="h-48">
            <img src={waterImage} alt="water" className="h-full md:w-2/3 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinistryDiv;


