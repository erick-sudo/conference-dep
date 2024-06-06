import React from 'react'
import crop from "/src/assets/conferenceImage.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faBrain, faCircleInfo, faGlobe, faHandshakeSimple } from '@fortawesome/free-solid-svg-icons'

function Featured() {
  return (
    <div>
        <section className="relative bg-blueGray-50 pb-4">
<div className="container mx-auto">
  <div className="flex flex-wrap items-center">
    <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
      <div className="relative flex flex-col min-w-0 break-words bg-lime w-full mb-6 shadow-lg rounded-lg bg-gradient-to-r from-lime-400 to-transparent">
        <img alt="..." src={crop} className="w-full  h-128 align-middle rounded-t-lg"/>
        <blockquote className="relative mb-4 justify-center">
          
          <h4 className="p-2 text-2xl font-bold text-black">
          Discover Features
          </h4>
        </blockquote>
      </div>
    </div>

    <div className="w-full md:w-6/12 px-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-6/12 px-4">
          <div className="relative flex flex-col mt-4">
            <div className="px-4 flex-auto">
              <div className="text-lime-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
              <FontAwesomeIcon icon={faBoxArchive} />
              </div>
              <h6 className="text-transparent text-xl bg-clip-text  mb-1 font-semibold bg-gradient-to-r from-lime-500 to-orange-500">Access to Archives</h6>
              <p className="mb-4 text-blueGray-500">
              Explore a rich collection of past conferences, spanning various governmental sectors and topics of paramount importance.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0">
            <div className="px-4 flex-auto">
              <div className="text-lime-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
              <FontAwesomeIcon icon={faHandshakeSimple} />
              </div>
              <h6 className="text-transparent text-xl bg-clip-text  mb-1 font-semibold bg-gradient-to-r from-lime-500 to-orange-500">
              Discover the Power of Collaboration
              </h6>
              <p className="mb-4 text-blueGray-500">
              Embracing the spirit of collaboration, this platform brings together valuable insights and knowledge-sharing from diverse government events.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 mt-4">
            <div className="px-4 flex-auto">
              <div className="text-lime-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
              <FontAwesomeIcon icon={faCircleInfo} />
              </div>
              <h6 className="text-transparent text-xl bg-clip-text  mb-1 font-semibold bg-gradient-to-r from-lime-500 to-orange-500">Information & Engagement</h6>
              <p className="mb-4 text-blueGray-500">
              Stay updated with real-time notifications about upcoming government conferences across Kenya. 
              </p>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0">
            <div className="px-4 flex-auto">
              <div className="text-lime-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
              <FontAwesomeIcon icon={faGlobe} />
              </div>
              <h6 className="text-transparent text-xl bg-clip-text  mb-1 font-semibold bg-gradient-to-r from-lime-500 to-orange-500">Connect & Network</h6>
              <p className="mb-4 text-blueGray-500">
              Embrace the opportunity to collaborate with experts from various fields, build partnerships, and collectively address the challenges that lie ahead. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

    </div>
  )
}

export default Featured