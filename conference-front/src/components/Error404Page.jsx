import React from "react";
import { Link } from "react-router-dom";
import errorpage from "../assets/error.svg";


const Error404Page = () => {
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2 flex justify-center">
     
        <img
          className="w-3/4"
          src={errorpage}
          alt="error404"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          Looks like you've found the doorway to the great nothing
        </h1>
        <p className="py-4 text-base text-gray-800">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-2 text-base text-gray-800 mb-4">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <Link
          to="/"
          className="border border-red-600 hover:bg-red-700 hover:text-white  text-red-600 font-bold py-3 px-4 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;
