import React, { useContext, useState } from "react";
import { AuthContext } from '../components/dashboard/AuthContext'
import bg from "../images/log.jpg";
import EyeIcon from "../components/dashboard/EyeIcon";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  // sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  function toggleIsActive() {
    setIsActive(!isActive);
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-3/4 lg:w-1/2 bg-white shadow-md rounded-lg">
        <div className="w-full md:w-1/2 hidden md:block">
          <div className="h-full flex items-center justify-center">
            <img src={bg} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-3/4 md:w-1/2 p-10">
          <h1 className="text-center font-bold text-2xl">
            Conference <span className="text-lime-600">Hub</span>
          </h1>
          <input
            className="w-full py-4 my-2 border-b bg-white border-black outline-none focus:outline-none"
            id="name"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-full py-4 my-2 border-b bg-white border-black outline-none focus:outline-none"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="relative">
            <input
              className="w-full py-4 my-2 border-b bg-white border-black outline-none focus:outline-none"
              type={isActive ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon isActive={isActive} toggleIsActive={toggleIsActive} />
          </div>
          <input
            className="w-full py-4 my-2 border-b bg-white border-black outline-none focus:outline-none"
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex items-center justify-center">
            <button
              className="bg-lime-600 hover:bg-lime-900 text-white mt-6 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
