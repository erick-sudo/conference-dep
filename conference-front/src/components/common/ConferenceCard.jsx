import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../dashboard/AuthContext";

import { Card, NavLink } from "react-bootstrap";

import { remoteImageToDataURL } from "../dashboard/UpdateConference";

import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

import { FaCalendarAlt, FaCity, FaBuilding } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"

function ConferenceCard({ conference, onClickUrl }) {
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const { backendUrl } = useContext(AuthContext);

  useEffect(() => {
    fetchPoster();
  }, []);

  const fetchPoster = () => {
    remoteImageToDataURL(
      `${backendUrl}/media/poster/${conference.id}/download`
    ).then((imageDataUrl) => setImage(imageDataUrl));
  };

  return (
    <div className="flex">
      <Card
        className="flex-grow rounded-none bg-white"
        onClick={() => navigate(`${onClickUrl}/${conference.reference_number}`)}
      >
        <Card.Body>
          <div>
            {image ? (
              <Card.Img src={image} alt={conference.reference_number} />
            ) : (
              <div className="min-h-[40vh] m-4 border relative">
                <Loading />
              </div>
            )}
          </div>
          <div className="font-bold text-xl mb-2">{conference.title}</div>
          <p className="text-gray-700 text-base">
            {conference.description.substring(0, 100)}...
          </p>
          <div className=" my-4">
            <button
              onClick={() => navigate(`${onClickUrl}/${conference.reference_number}`) }
              className="text-lime-600 border-2 w-max rounded-md py-2  border-lime-600 hover:bg-lime-600 hover:text-white px-2 font-semibold"
            >
              View More
            </button>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="px-6 py-4 flex flex-wrap items-start gap-2">
            <span className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
              <FaCalendarAlt /> {conference.date}
            </span>
            <span className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              <MdLocationOn /> {conference.location}
            </span>
            <span className="flex items-center gap-2 bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              <FaCity /> {conference.city}
            </span>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ConferenceCard;
