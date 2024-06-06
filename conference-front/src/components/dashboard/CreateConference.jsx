import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import FileInput from "./FileInput";

function CreateConference() {
  const navigate = useNavigate();

  const { backendUrl, ministries, state_departments } = useContext(AuthContext);

  const [selectedMinistry, setSelectedMinistry] = useState(ministries[0].name);
  const [stateDepartments, setStateDepartments] = useState([]);

  // ------------ File Input related variables ------------
  const [files, setFiles] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  function updateFiles(files_update) {
    setFiles(files_update);
  }

  function updateSelectedIndex(idx) {
    setSelectedIndex(idx);
  }

  // -------------------------------------------------------

  useEffect(() => {
    const s_dps = state_departments.filter(
      (department) => department.ministry_name === selectedMinistry
    );
    setStateDepartments(s_dps);
    setConference({
      ...conference,
      state_department_id: s_dps.length > 0 ? s_dps[0].id : 0,
    });
  }, [selectedMinistry, state_departments]);

  const [conference, setConference] = useState({
    state_department_id: 0,
    number: "",
    email: "",
    location: "",
    city: "",
    start_time: "",
    end_time: "",
    start_date: "",
    end_date: "",
    poster: "",
    title: "",
    description: "",
    files: [],
    expected: 0,
  });

  function handleChange(e) {
    setConference({
      ...conference,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageUpload(e) {
    if (Boolean(e.target.value)) {
      const fake_url = e.target.files[0];
      readImage(fake_url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const conferenceData = {
      state_department_id: conference.state_department_id,
      number: conference.number,
      email: conference.email,
      location: conference.location,
      expected: 0,
      city: conference.city,
      date: `${conference.start_date} - ${conference.end_date}`,
      title: conference.title,
      description: conference.description,
    };

    if(files.length > 0) {
      conferenceData.files = files.map(file => file.dataUrl)
    }

    if(conference.poster) {
      conferenceData.poster = conference.poster
    }

    fetch(`${backendUrl}/conferences`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(conferenceData),
    }).then((response) => {
      if (response.status < 400) {
        response.json().then((data) => {
          console.log(data);
          navigate("/admin/conferences");
          resetForm();
        });
      } else if (response.status === 422) {
        response.json().then((data) => {});
      } else {
      }
    });
  }

  function resetForm() {
    setConference({
      state_department_id: 0,
      expected: 0,
      number: "",
      email: "",
      location: "",
      city: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      poster: "",
      title: "",
      description: "",
      files: [],
    });
  }

  function readImage(fake_url) {
    const reader = new FileReader();

    reader.onload = () => {
      setConference({
        ...conference,
        poster: reader.result,
      });
    };

    reader.readAsDataURL(fake_url);
  }

  return (
    <div className="container lg:w-[65%] mx-auto shadow rounded border-5 border-lime-700 bg-white/50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-4 rounded"
      >
        <h2 className="font-bold text-xl text-center">
          <span className="text-lime-700">Create</span> Event
        </h2>
        <div>
          <div>Event Title</div>
          <input
            required
            value={conference.title}
            onChange={handleChange}
            className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
            name="title"
            type="text"
            placeholder="Enter the event's title"
          />
        </div>
        <div>
          <div>Event Location</div>
          <input
            required
            value={conference.city}
            onChange={handleChange}
            className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
            name="city"
            type="text"
            placeholder="City"
          />
        </div>
        <div>
          <div>Event Venue</div>
          <input
            required
            value={conference.location}
            onChange={handleChange}
            className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
            name="location"
            type="text"
            placeholder="Enter the event's venue"
          />
        </div>
        <div>
          <div>Ministry in charge</div>
          <div className="px-4 bg-white rounded border-1 border-lime-700/50">
            <select
              required
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              className="bg-white outline-none py-2 px-4 w-full rounded"
              name="ministry_in_charge"
              type="text"
              placeholder="Ministry"
            >
              {ministries.map((ministry, index) => (
                <option className="p-2" key={index}>
                  {ministry.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {conference.state_department_id && (
          <div>
            <div>State Department</div>
            <div className="px-4 bg-white rounded border-1 border-lime-700/50">
              <select
                required
                value={conference.state_department_id}
                onChange={handleChange}
                className="bg-white outline-none py-2 px-4 w-full rounded"
                name="state_department_id"
                type="text"
                placeholder="Ministry"
              >
                {stateDepartments
                  .filter(
                    (state_department) =>
                      state_department.ministry_name === selectedMinistry
                  )
                  .map((state_department, index) => (
                    <option
                      value={state_department.id}
                      className="p-2"
                      key={index}
                    >
                      {state_department.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        <div>
          <div>Expected number of participants</div>
          <input
            required
            value={conference.expected}
            onChange={handleChange}
            className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
            name="expected"
            type="number"
            placeholder="Expected attendance"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-2">
          <div>
            <div>Contact Number</div>
            <input
              required
              value={conference.number}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
              name="number"
              type="number"
              placeholder="Telephone number"
            />
          </div>
          <div>
            <div>Contact Email</div>
            <input
              required
              value={conference.email}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-2">
          <div>
            <div>Start Date</div>
            <input
              required
              value={conference.start_date}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
              name="start_date"
              type="date"
              placeholder="Enter the event's start date"
            />
          </div>
          <div>
            <div>End Date</div>
            <input
              required
              value={conference.end_date}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-700/50"
              name="end_date"
              type="date"
              placeholder="Enter the event's end date"
            />
          </div>
        </div>

        <h2 className="font-bold text-xl text-center mt-8 mb-4">
          Event <span className="text-lime-700">Description</span>
        </h2>
        <div className="my-4">
          <div>Poster</div>
          {conference.poster ? (
            <div className="rounded-lg flex items-center justify-center w-[95%] bg-gradient-to-tr from-lime-700/10 to-white p-2 border-4 border-lime-700 mx-auto my-2 overflow-hidden">
              <img
                className="rounded-lg scale-[0.8]"
                src={conference.poster}
                alt="Event Poster"
              />
            </div>
          ) : (
            <>
              <label
                htmlFor="poster"
                className="hover:border-dotted hover:bg-lime-600/50 hover:text-white hover:border-white h-32 border-4 border-lime-600 flex items-center justify-center font-bold rounded text-lime-600"
              >
                Upload an image
              </label>
              <input
                onChange={handleImageUpload}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg, image/gif"
                className="hidden"
                id="poster"
                name="poster"
              />
            </>
          )}
        </div>
        <div className="my-4">
          <div>Description</div>
          <textarea
            required
            rows="8"
            value={conference.description}
            onChange={handleChange}
            className="outline-none w-full rounded p-4 shadow border-1 border-lime-700/50"
            name="description"
            placeholder="Description"
          ></textarea>
        </div>

        <div>
          <FileInput
            selectedIndex={selectedIndex}
            updateFiles={updateFiles}
            updateSelectedIndex={updateSelectedIndex}
            files={files}
          />
        </div>

        <button className="bg-lime-600 py-3 px-4 text-center w-full hover:scale-75 tran rounded text-white font-bold">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateConference;
