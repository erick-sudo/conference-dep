import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GiVideoConference } from "react-icons/gi";
import { RiDashboardFill, RiGovernmentFill } from "react-icons/ri";
import { BiUserPlus, BiLogOutCircle } from "react-icons/bi";
import { FcConferenceCall, FcHome } from "react-icons/fc";
import { AuthContext } from "./AuthContext";

function Sidebar() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(1);

  const { logout } = useContext(AuthContext)

  const navs = [
    {
      path: "/",
      icon: <FcHome />
    },
    {
      path: "/admin",
      icon: <RiDashboardFill />,
    },
    {
      path: "/admin/conferences",
      icon: <FcConferenceCall />,
    },
    {
      path: "/admin/new/conference",
      icon: <GiVideoConference />,
    },
    {
      path: "/admin/new/admin",
      icon: <BiUserPlus />,
    },
    {
      path: "/admin/ministries",
      icon: <RiGovernmentFill />
    }
  ];

  return (
    <div
      className="absolute inset-0 z-50 bg-white border-r border-lime-700 gap-2 flex flex-col"
    >
      <div className="grid">
        {navs.map((nav, i) => {
          return (
            <div
              className={`${
                selected === i
                  ? "bg-lime-800 text-white"
                  : "border-b border-lime-800"
              } hover:bg-red-800 hover:text-white cursor-pointer text-3xl py-4 flex items-center justify-center`}
              key={i}
              onClick={() => {
                setSelected(i)
                navigate(nav.path)
              }}
            >
              {nav.icon}
            </div>
          );
        })}
      </div>
      <div className="flex-grow">

      </div>
      <div onClick={() => logout()} className="border-t border-lime-700 hover:bg-red-800 hover:text-white cursor-pointer text-3xl py-4 flex items-center justify-center">
        <BiLogOutCircle />
      </div>
    </div>
  );
}

export default Sidebar;
