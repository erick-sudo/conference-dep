import React, { useEffect, useContext, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Reports } from "./Reports";
import Sidebar from "./Sidebar";
import Conferences from "./Conferences";
import ConferenceDetails from "./ConferenceDetails";
import Login from "../Login";

import CreateConference from "./CreateConference";

import Error404Page from "../Error404Page";
import { UpdateConference } from "./UpdateConference";

import { AuthContext } from "./AuthContext";
import CreateSuperuser from "./CreateSuperuser";
import { Background } from "../common/dottedbg";

function Admin() {
  const { user } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div className="position fixed inset-0 bg-white flex">
      {user && user.is_admin ? (
        <>
          <div className="w-12 relative">
            <Sidebar />
          </div>
          <div className="relative flex-grow">
            <div className="inset-0 flex flex-col absolute overflow-y-scroll">
              <div className="relative flex-grow  py-6">
                <Routes>
                  <Route path="/" element={<Reports />} />
                  <Route path="/conferences" element={<Conferences />} />
                  <Route
                    path="/conference/:referenceNumber"
                    element={<ConferenceDetails />}
                  />
                  <Route
                    path="/new/conference"
                    element={<CreateConference />}
                  />
                  <Route
                    path="/conference/:refNumber/edit"
                    element={<UpdateConference />}
                  />
                  <Route path="/new/admin" element={<CreateSuperuser />} />
                  <Route path="*" element={<Error404Page />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Admin;
