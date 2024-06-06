import { React, useContext, useState } from "react";
import bg from "../images/log.jpg";
import EyeIcon from "../components/dashboard/EyeIcon";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/dashboard/AuthContext";

function Login({ signin }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    login(email, password);
  };

  function toggleIsActive() {
    setIsActive(!isActive);
  }

  function handleRememberMeChange(event) {
    setRememberMe(event.target.checked);
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
          <div>
            <h1 className="text-center font-bold text-2xl">
              Conference <span className="text-lime-600">Hub</span>
            </h1>
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
            {error && (
              <div className="text-center text-red-600 test-xl">{error}</div>
            )}
            <div className=" flex items-center justify-between mt-4 mb-10">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMeCheckbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <p className="text-xs">Remember Me</p>
              </div>
              <a
                href="forgot"
                className="cursor-pointer text-xs whitespace-nowrap gap-6 font-semibold underline underline-offset-2"
              >
                Forgot your Password ?
              </a>
            </div>
            <div className="w-full flex flex-col my- mb-4">
              <button
                onClick={handleSubmit}
                className="bg-lime-600 rounded-md text-white my-2 p-4 text-center flex items-center justify-center py-2 hover:scale-105 duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
