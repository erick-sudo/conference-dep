import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  Button,
  Table,
  ListGroup,
  InputGroup,
  Badge,
  ListGroupItem,
} from "react-bootstrap";

import { CgAddR } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";

import { AuthContext } from "./AuthContext";
import FileInput from "./FileInput";

const remoteImageToDataURL = (imageURL) => {
  return new Promise((resolve, reject) => {
    fetch(imageURL).then((response) => {
      if (response.ok) {
        response.blob().then((blob) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve(reader.result);
          };

          reader.onerror = (error) => reject(error);

          reader.readAsDataURL(blob);
        });
      } else {
        reject("Status " + response.status);
      }
    });
  });
};

const loadAttachments = async (
  id,
  attachmentIds,
  callback,
  backendUrl,
  commonFilename
) => {
  const fileDataUrls = await Promise.all(
    attachmentIds.map((attachmentId) =>
      remoteImageToDataURL(`${backendUrl}/media/files/${id}/${attachmentId}`)
    )
  );

  callback(
    fileDataUrls.map((fileDataUrl) =>
      transformDataUrl(fileDataUrl, commonFilename)
    )
  );
};

const transformDataUrl = (dataUrl, filename) => {
  const metadata = dataUrl.slice(0, dataUrl.indexOf(","));

  const dt = {
    newFile: false,
    mime: metadata.slice(metadata.indexOf(":") + 1, metadata.indexOf(";")),
    name:
      filename +
      "." +
      metadata.slice(metadata.indexOf("/") + 1, metadata.indexOf(";")),
    dataUrl: dataUrl,
  };

  return dt;
};

const DataForm = ({ k, v, updateList, title }) => {
  const dataList = v?.split("|");
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.trim() !== "") {
      updateList(k, v + (v && "|") + data);
      setData("");
    }
  };

  const handleDelete = (idx) => {
    updateList(k, dataList.filter((dt, i) => idx !== i).join("|"));
  };

  const handleChange = (idx, val) => {
    updateList(k, dataList.map((dt, i) => (idx === i ? val : dt)).join("|"));
  };

  return (
    <div className="bg-white my-4 p-4 rounded shadow border-1 border-lime-600">
      <h2 className="font-bold text-xl text-lime-600">{title}</h2>
      <Form
        className="p-4 rounded my-4 max-w-lg border-1 border-lime-600"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formTopic">
          <Form.Control
            as="textarea"
            rows={3}
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder={title}
          />
        </Form.Group>
        <button
          className="hover:bg-lime-600 hover:text-white rounded ring ring-lime-600 text-lime-700 flex items-center justify-center text-xl px-6 py-1 w-1/2 mt-4"
          type="submit"
        >
          <CgAddR />
        </button>
      </Form>

      {dataList?.length > 0 && dataList[0] && (
        <ListGroup className="shadow border-1 border-lime-600">
          {dataList.map((dt, index) => (
            <ListGroup.Item className="text-sm relative p-1" key={index}>
              <InputGroup className="p-0">
                <Button
                  onClick={() => handleDelete(index)}
                  variant="secondary"
                  className="text-bg-secondary"
                >
                  <AiFillDelete />
                </Button>
                <Form.Control
                  as="textarea"
                  className="border-0 focus:ring-0 scroll_y"
                  onChange={(e) => handleChange(index, e.target.value)}
                  value={dt}
                />
              </InputGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

const ParticipantForm = ({ updateList, k, v }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    id_number: "",
    address: "",
    city: "",
  });
  const [showForm, setShowForm] = useState(false);

  const participants = v;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = [...participants, formData];
    updateList(k, newList, newList.length - 1);
    setFormData({
      email: "",
      phone: "",
      id_number: "",
      address: "",
      city: "",
    });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow border-1 border-lime-600">
      <h2 className="font-bold text-xl px-4">Add participants</h2>
      <Table
        className="my-2"
        variant="dark"
        striped
        bordered
        hover
        responsive
        size="sm"
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Nationality</th>
            <th>ID Number</th>
            <th>Address</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the table rows based on the data */}
          {/* Replace the `data` variable with your actual data array */}
          {/* For example: */}
          {participants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.nationality}</td>
              <td>{participant.id_number}</td>
              <td>{participant.address}</td>
              <td>{participant.city}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        className="text-bg-dark px-6 py-2 w-1/2"
        variant="dark"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close" : "Add Participant"}
      </Button>

      {showForm && (
        <Form
          className="bg-gray-100 p-4 rounded my-4 max-w-lg border-1 border-lime-600"
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              required
              placeholder="Enter phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              required
              placeholder="Enter nationality"
              value={formData.nationality || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formIDNumber">
            <Form.Label>ID Number</Form.Label>
            <Form.Control
              type="text"
              name="id_number"
              required
              placeholder="Enter ID number"
              value={formData.id_number || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              required
              placeholder="Enter address"
              value={formData.address || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              required
              placeholder="Enter city"
              value={formData.city || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button
            className="text-bg-dark my-2 w-full"
            variant="dark"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

function UpdateConference() {
  const navigate = useNavigate();

  const { backendUrl, showAlert } = useContext(AuthContext);

  const { refNumber } = useParams();

  const [editedFields, setEditedFields] = useState([]);

  const [newParticipants, setNewParticipants] = useState([]);

  const [conference, setConference] = useState({
    state_department: {},
    number: "",
    expected: 0,
    actual: 0,
    email: "",
    city: "",
    location: "",
    foreigners: 0,
    kenyans: 0,
    start_date: "",
    end_date: "",
    title: "",
    description: "",
    issues: "",
    resolutions: "",
    recommendations: "",
    participants: [],
  });

  const [files, setFiles] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  function updateFiles(files_update) {
    setFiles(files_update);
  }

  function updateSelectedIndex(idx) {
    setSelectedIndex(idx);
  }

  const [image, setImage] = useState(null);
  const [tempImageHolder, setTempImageHolder] = useState(null);

  useEffect(() => {
    fetchConference();
  }, []);

  function fetchConference() {
    fetch(`${backendUrl}/conference/${refNumber}`).then((response) => {
      if (response.status < 400) {
        response.json().then((data) => {
          remoteImageToDataURL(
            `${backendUrl}/media/poster/${data.id}/download`
          ).then((imageDataUrl) => setImage(imageDataUrl));

          setConference({
            ...conference,
            expected: data.expected ? data.expected : 0,
            actual: data.actual ? data.actual : 0,
            reference_number: data.reference_number,
            description: data.description,
            resolutions: data.resolutions,
            issues: data.issues,
            recommendations: data.recommendations,
            participants: data.participants,
            title: data.title,
            city: data.city,
            location: data.location,
            state_department: data.state_department,
            number: data.number,
            email: data.email,
            foreigners: data.foreigners ? data.foreigners : 0,
            kenyans: data.kenyans ? data.kenyans : 0,
            start_date: data.date.split(" - ")[0].trim(),
            end_date: data.date.split(" - ")[1].trim(),
          });

          loadAttachments(
            data.id,
            data.attachment_ids,
            updateFiles,
            backendUrl,
            refNumber
          );
        });
      }
    });
  }

  function handleChange(e) {
    setEditedFields(
      editedFields.find((field) => field === e.target.name)
        ? editedFields
        : [...editedFields, e.target.name]
    );
    setConference({
      ...conference,
      [e.target.name]: e.target.value,
    });
  }

  function updateList(k, v, p) {
    if (p) {
      setNewParticipants([...newParticipants, p]);
    }
    setEditedFields(
      editedFields.find((field) => field === k)
        ? editedFields
        : [...editedFields, k]
    );
    setConference({
      ...conference,
      [k]: v,
    });
  }

  function handleImageUpload(e) {
    setEditedFields(
      editedFields.find((field) => field === e.target.name)
        ? editedFields
        : [...editedFields, e.target.name]
    );
    if (Boolean(e.target.value)) {
      const fake_url = e.target.files[0];
      readImage(fake_url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const conferenceData = {};

    const newFiles = files
      .filter((file) => file.newFile)
      .map((file) => file.dataUrl);

    if (newFiles.length > 0) {
      conferenceData.files = newFiles;
    }

    editedFields.forEach((field) => {
      if (field === "start_date" || field === "end_date") {
        conferenceData[
          "date"
        ] = `${conference.start_date} - ${conference.end_date}`;
      } else if (field === "start_time" || field === "end_time") {
        conferenceData[
          "time"
        ] = `${conference.start_time} - ${conference.end_time}`;
      } else if (field === "participants") {
        conferenceData["participants"] = newParticipants.map(
          (idx) => conference.participants[idx]
        );
      } else if (field === "poster") {
        conferenceData[field] = image;
      } else {
        conferenceData[field] = conference[field];
      }
    });

    fetch(`${backendUrl}/conference/${refNumber}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(conferenceData),
    })
      .then((response) => {
        if (response.status < 400) {
          response.json().then((data) => {
            navigate(`/admin/conference/${refNumber}`);
          });
          showAlert("Conference updated", "success", "green");
        } else if (response.status === 422) {
          response.json().then((data) => {
            showAlert("Unprocessable entity", "warn", "maroon");
          });
        } else {
          showAlert("An error occured", "error", "red");
        }
      })
      .catch((err) => {
        showAlert(err, "error", "red");
      });
  }

  function readImage(fake_url) {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(fake_url);
  }

  return (
    <div className="md:max-w-[75%] mx-auto my-2 shadow-lg rounded shadow-lime-600 bg-white/50 p-4">
      <div className="">
        <h2 className="font-bold text-xl text-center">
          <span className="text-lime-700">Update</span> Event
        </h2>
        <div className="my-2 gap-4 flex flex-col md:flex-row md:items-center">
          <div className="font-bold min-w-[150px] md:text-end">REF :</div>
          <h2 className="bg-white font-bold text-gray-500 flex-grow px-2 py-3 rounded border-1 border-lime-600/50">
            {conference.reference_number}
          </h2>
        </div>
        <div className="my-2 gap-4 flex flex-col md:flex-row md:items-center">
          <div className="font-bold min-w-[150px] md:text-end">Title</div>
          <h2 className="bg-white font-bold text-gray-500 flex-grow px-2 py-3 rounded border-1 border-lime-600/50">
            {conference.title}
          </h2>
        </div>
        <div className="my-2 gap-4 flex flex-col md:flex-row md:items-center">
          <div className="font-bold min-w-[150px] md:text-end">
            Event Location
          </div>
          <h2 className="bg-white font-bold text-gray-500 flex-grow px-2 py-3 rounded border-1 border-lime-600/50">
            {conference.city}
          </h2>
        </div>
        <div className="my-2 gap-4 flex flex-col md:flex-row md:items-center">
          <div className="font-bold min-w-[150px] md:text-end">Event Venue</div>
          <h2 className="bg-white font-bold text-gray-500 flex-grow px-2 py-3 rounded border-1 border-lime-600/50">
            {conference.location}
          </h2>
        </div>
        <div className="my-2 gap-4 flex flex-col md:flex-row md:items-center">
          <div className="font-bold min-w-[150px] md:text-end">
            Ministry in charge
          </div>
          <h2 className="bg-white font-bold text-gray-500 flex-grow px-2 py-3 rounded border-1 border-lime-600/50">
            {conference.state_department?.ministry_name}
          </h2>
        </div>
        <div className="my-2 gap-4 flex flex-col md:flex-row md:items-center">
          <div className="font-bold min-w-[150px] md:text-end">
            State Department
          </div>
          <h2 className="bg-white font-bold text-gray-500 flex-grow px-2 py-3 rounded border-1 border-lime-600/50">
            {conference.state_department?.name}
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 md:gap-4 md:my-2 mx-4">
          <div className="grid md:grid-cols-2 items-center md:gap-4 my-2">
            <div className="md:text-end">Expected Number </div>
            <Badge bg="secondary" className="text-xl p-2">
              {conference.expected}
            </Badge>
          </div>
          <div className="grid items-center md:gap-4 my-2">
            <div className="text-center">Actual Attendance</div>
            <div className="grid lg:grid-cols-2 md:gap-4 my-2 mx-4">
              <ListGroup>
                <ListGroupItem>
                  <div className="">Foreigners</div>
                </ListGroupItem>
                <ListGroupItem>
                  <Form.Control
                    required
                    value={conference.foreigners}
                    onChange={handleChange}
                    name="foreigners"
                    type="number"
                    placeholder="Number of foreigners"
                  />
                </ListGroupItem>
              </ListGroup>
              <ListGroup>
                <ListGroupItem>
                  <div className="">Kenyans</div>
                </ListGroupItem>
                <ListGroupItem>
                  <Form.Control
                    required
                    value={conference.kenyans}
                    onChange={handleChange}
                    name="kenyans"
                    type="number"
                    placeholder="Number ofkenyans"
                  />
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 md:gap-4 my-2 mx-4">
          <div className="grid md:grid-cols-2 items-center md:gap-4 my-2">
            <div className="md:text-end">Contact Number</div>
            <input
              required
              value={conference.number}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-600/50"
              name="number"
              type="text"
              placeholder="Tel"
            />
          </div>
          <div className="grid md:grid-cols-2 items-center md:gap-4 my-2">
            <div className="md:text-end">Contact Email</div>
            <input
              required
              value={conference.email}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-600/50"
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 md:gap-4 my-2 mx-4">
          <div className="grid md:grid-cols-2 items-center md:gap-4 my-2">
            <div className="md:text-end">Start Date</div>
            <input
              required
              value={conference.start_date}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-600/50"
              name="start_date"
              type="date"
              placeholder="Enter the event's start date"
            />
          </div>
          <div className="grid md:grid-cols-2 items-center md:gap-4 my-2">
            <div className="md:text-end">End Date</div>
            <input
              required
              value={conference.end_date}
              onChange={handleChange}
              className="outline-none py-2 px-4 w-full rounded border-1 border-lime-600/50"
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
          <div className="grid grid-cols-2 mx-auto items-center">
            <h2 className="text-xl font-bold px-4">Poster</h2>
            {image ? (
              <div
                onClick={() => {
                  setTempImageHolder(image);
                  setImage("");
                }}
                className="bg-lime-700 rounded-lg p-2 text-center text-white hover:ring hover:ring-lime-700 hover:bg-white hover:text-lime-700 cursor-pointer"
              >
                Change
              </div>
            ) : (
              <div
                onClick={() => {
                  setImage(tempImageHolder);
                }}
                className="bg-lime-700 rounded-lg p-2 text-center text-white hover:ring hover:ring-lime-700 hover:bg-white hover:text-lime-700 cursor-pointer"
              >
                Undo
              </div>
            )}
          </div>

          {image ? (
            <div className="rounded-lg flex items-center justify-center w-[95%] bg-gradient-to-tr from-lime-700/10 to-white p-2 border-4 border-lime-700 mx-auto my-2 overflow-hidden">
              <img className="rounded-lg" src={image} alt="Event Poster" />
            </div>
          ) : (
            <>
              <label
                htmlFor="poster"
                className="hover:border-dotted hover:bg-lime-600/50 hover:text-white hover:border-white min-h-[30vh] block border-4 border-lime-600 flex items-center justify-center font-bold rounded text-lime-600 my-2"
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
        <div className="my-4 p-4 rounded bg-gray-100 shadow border-1 border-lime-600">
          <div className="mb-2 text-xl font-bold text-lime-600">
            Description
          </div>
          <textarea
            required
            rows="6"
            value={conference.description}
            onChange={handleChange}
            className="outline-none w-full rounded p-4"
            name="description"
          ></textarea>
        </div>

        <ParticipantForm
          updateList={updateList}
          k="participants"
          v={conference.participants}
        />

        <DataForm
          updateList={updateList}
          k="resolutions"
          v={conference.resolutions}
          title={"Resolutions/Topics"}
        />

        <DataForm
          updateList={updateList}
          k="issues"
          v={conference.issues}
          title={"Issues Discussed"}
        />

        <DataForm
          updateList={updateList}
          k="recommendations"
          v={conference.recommendations}
          title="Recommendations and conclusions"
        />

        <div className="mb-8">
          <FileInput
            selectedIndex={selectedIndex}
            updateFiles={updateFiles}
            updateSelectedIndex={updateSelectedIndex}
            files={files}
          />
        </div>

        <button
          disabled={
            files.filter((file) => file.newFile).length > 0
              ? false
              : editedFields.length > 0
              ? false
              : true
          }
          onClick={handleSubmit}
          className=" disabled:bg-gray-500 disabled:opacity-75 py-2 px-4 text-center w-full ring ring-lime-600 hover:bg-white hover:ring-2 hover:ring-lime-600 hover:text-lime-600 rounded font-bold"
        >
          Update Changes
        </button>
      </div>
    </div>
  );
}

export {
  UpdateConference,
  remoteImageToDataURL,
  loadAttachments,
  transformDataUrl,
};
