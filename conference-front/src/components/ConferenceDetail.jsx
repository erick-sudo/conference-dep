import React, { useState, useEffect, useContext } from "react";
import {
  FaHashtag,
  FaBuilding,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCity,
} from "react-icons/fa";

import { useParams } from "react-router-dom";
import { AuthContext } from "./dashboard/AuthContext";
import Loading from "./common/Loading";

import { remoteImageToDataURL } from "./dashboard/UpdateConference";

const ConferenceDetail = () => {
  const { id } = useParams();
  const [conference, setConference] = useState({});

  const [poster, setPoster] = useState(null);

  const { backendUrl } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${backendUrl}/conferences/${id}`)
      .then((res) => res.json())
      .then((data) => {
        remoteImageToDataURL(
          `${backendUrl}/media/poster/${data.id}/download`
        ).then((imageDataUrl) => setPoster(imageDataUrl));

        setConference(data);
      });
  }, []);

  if (!conference) {
    return <p>Loading conference details...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* conference image */}
        <div className="rounded-xl p-4">
          {poster ? (
            <img src={poster} alt="Conference" className="rounded-xl" />
          ) : (
            <div className="min-h-[40vh] border relative">
              <Loading />
            </div>
          )}
        </div>

        {/* conference details */}
        <div className="col-span-1">
          <div className="flex items-center h-full md:justify-center md:mr-0">
            <div className="max-w-m">
              <div className="mx-auto mb-6 flex justify-center">
                <span className="inline-block h-1 w-full rounded-full bg-lime-600" />
                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-black" />
                <span className="inline-block h-1 w-2 rounded-full bg-black" />
                <span className="mx-1 inline-block h-1 w-1 rounded-full bg-black" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold mb-7">
                Conference Details
              </h2>

              <p className="text-gray-600 mb-2">
                <FaHashtag className="inline-block mr-3 text-lg text-lime-600 " />
                Reference Number:{" "}
                <span className="font-semibold">
                  {conference.reference_number}
                </span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaHashtag className="inline-block mr-3 text-lg text-lime-600" />
                Conference Title:{" "}
                <span className="font-semibold">{conference.title}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaBuilding className="inline-block mr-3 text-lg text-lime-600" />
                Ministry In Charge:{" "}
                <span className="font-semibold">
                  {conference.state_department?.ministry_name}
                </span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaPhone className="inline-block mr-3 text-lg text-lime-600" />
                Phone Number:{" "}
                <span className="font-semibold">{conference.number}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaEnvelope className="inline-block mr-3 text-lg text-lime-600" />
                Email: <span className="font-semibold">{conference.email}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaMapMarkerAlt className="inline-block mr-3 text-lg text-lime-600" />
                Location:{" "}
                <span className="font-semibold">{conference.location}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaCity className="inline-block mr-3 text-lg text-lime-600" />
                Town/City:{" "}
                <span className="font-semibold">{conference.city}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaCalendarAlt className="inline-block mr-3 text-lg text-lime-600" />
                Date: <span className="font-semibold">{conference.date}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* conference description */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="">
          <h2 className="text-2xl text-lime-600 font-bold mb-2">
            Conference Description
          </h2>
          <p className="text-gray-600">{conference.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetail;
