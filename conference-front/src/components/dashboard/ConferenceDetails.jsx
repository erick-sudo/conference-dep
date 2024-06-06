import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";

import {
  FaHashtag,
  FaBuilding,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCity,
  FaDownload,
} from "react-icons/fa";

import ReactPDF, {
  BlobProvider,
  Document,
  Page,
  Text,
  PDFViewer,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";

import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { loadAttachments, remoteImageToDataURL } from "./UpdateConference";
import Loading from "../common/Loading";
import { DisplayMedia } from "./DisplayMedia";

Font.register({
  family: "Times-BoldItalic",
});

const styles = StyleSheet.create({
  table: {
    width: "100%",
    border: "1px solid #000",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    border: "1px solid #000",
  },
  tableCellHeader: {
    padding: 10,
    margin: "auto",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },
  tableCell: {
    padding: 6,
    margin: "auto",
    fontSize: 10,
    textAlign: "left",
  },
});

const ConferenceDetail = () => {
  const { referenceNumber } = useParams();
  const [conference, setConference] = useState({});

  const [poster, setPoster] = useState(null);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const { backendUrl, formatText } = useContext(AuthContext);

  useEffect(() => {
    fetchConference();
  }, []);

  const ConferencePDF = ({ conference }) => {
    const image = `${backendUrl}${conference.image}`;

    return (
      <Document title="conference details" author="conference hub">
        <Page size="A4" style={{ padding: "8px" }}>
          <View
            style={{
              textAlign: "center",
              margin: 30,
              backgroundColor: "#f2f2f2",
              alignItems: "center",
            }}
          >
            <Text>REF NO: {conference.reference_number}</Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Title: {conference.title}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>
              {conference.ministry_in_charge}
            </Text>
            <Image
              src={image}
              style={{
                height: "200px",
                width: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            <Text> Phone Number: {conference.number}</Text>
            <Text> Email: {conference.email}</Text>
            <Text> City: {conference.city}</Text>
            <Text> Location: {conference.location}</Text>
            <Text> Time: {conference.time}</Text>
            <Text> Date: {conference.date}</Text>
            <Text>
              Number of Participants: {conference.participants.length}
            </Text>
          </View>
          <View>
            <Text style={{ color: "green" }}>Description</Text>
            <Text style={{ fontSize: 14 }}>{conference.description}</Text>
            <Text style={{ color: "green" }}>Resolutions/Topics</Text>
            <Text style={{ fontSize: 14 }}>{conference.description}</Text>
            <Text style={{ color: "green" }}>Issues Discussed</Text>
            <Text style={{ fontSize: 14 }}>{conference.description}</Text>
            <Text style={{ color: "green" }}>
              Recommendations and Conclusions
            </Text>
            <Text style={{ fontSize: 14 }}>{conference.description}</Text>
          </View>
          <Text style={{ textAlign: "center" }}>Participant List</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>id.</Text>
              <Text style={styles.tableCellHeader}>Name</Text>
              <Text style={styles.tableCellHeader}>Email</Text>
            </View>
            {conference.participants.map((participant) => (
              <View key={participant.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{participant.id}</Text>
                <Text style={styles.tableCell}>{participant.name}</Text>
                <Text style={styles.tableCell}>{participant.email}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  function handleDownload() {
    const pdfContent = <ConferencePDF conference={conference} />;

    const generateAndDownloadPDF = () => {
      const blobProvider = (
        <BlobProvider document={pdfContent}>
          {({ blob, url, loading }) => {
            if (loading) {
              return <div>Loading PDF...</div>;
            }

            const link = document.createElement("a");
            link.href = url;
            link.download = "conference_details.pdf";
            link.target = "_blank";
            link.click();

            URL.revokeObjectURL(url);
          }}
        </BlobProvider>
      );

      ReactDOM.render(blobProvider, document.getElementById("pdf-container"));
    };
    generateAndDownloadPDF();
  }

  function handleDelete() {
    fetch(`${backendUrl}/conference/${referenceNumber}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/admin/conferences");
      });
  }

  function fetchConference() {
    fetch(`${backendUrl}/conference/${referenceNumber}`, {}).then(
      (response) => {
        if (response.status < 400) {
          response.json().then((data) => {
            remoteImageToDataURL(
              `${backendUrl}/media/poster/${data.id}/download`
            ).then((imageDataUrl) => setPoster(imageDataUrl));

            setConference(data);
            if (data.attachment_ids?.length > 0) {
              loadAttachments(
                data.id,
                data.attachment_ids,
                setFiles,
                backendUrl,
                referenceNumber
              );
            }
          });
        }
      }
    );
  }

  if (!conference) {
    return <p>Loading conference details...</p>;
  }

  return (
    <div className="container">
      <div className=" rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
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
        <div className="my-6 p-4">
          <div className="max-w-lg flex justify-center mb-6 lg:hidden">
            <span className="inline-block h-1 w-full rounded-full bg-lime-600" />
            <span className="mx-1 inline-block h-1 w-3 rounded-full bg-black" />
            <span className="inline-block h-1 w-2 rounded-full bg-black" />
            <span className="mx-1 inline-block h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="px-4">
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
              <FaBuilding className="inline-block mr-3 text-lg text-lime-600" />
              State Department:{" "}
              <span className="font-semibold">
              {conference.state_department?.name}
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
              <FaCity className="inline-block mr-3 text-lg text-lime-600" />
              City: <span className="font-semibold">{conference.city}</span>
            </p>
            <p className="text-gray-600 mb-2">
              <FaMapMarkerAlt className="inline-block mr-3 text-lg text-lime-600" />
              Location:{" "}
              <span className="font-semibold">{conference.location}</span>
            </p>
            {/* <p className="text-gray-600 mb-2">
              <FaClock className="inline-block mr-3 text-lg text-lime-600" />
              Time: <span className="font-semibold">{conference.time}</span>
            </p> */}
            <p className="text-gray-600 mb-2">
              <FaCalendarAlt className="inline-block mr-3 text-lg text-lime-600" />
              Date: <span className="font-semibold">{conference.date}</span>
            </p>

            <p className="text-gray-600 mb-2">
              <FaCalendarAlt className="inline-block mr-3 text-lg text-lime-600" />
              Number of participants:{" "}
              <span className="font-semibold">{conference.foreigners + conference.kenyans}</span>
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8 bg-white/50 rounded px-2 py-6 min-h-[40vh]">
          <h2 className="text-xl font-bold my-2 mx-4">Media</h2>
          <DisplayMedia files={files} />
        </div>
      )}

      {/* conference description */}
      <div className="container bg-white/75 shadow grid grid-cols-1 md:grid-cols-2 mt-8 gap-2 py-2 rounded">
        <div className=" p-4 rounded border-1 border-lime-600/50">
          <h2 className="text-2xl text-lime-600 font-bold mb-2">
            Conference Description
          </h2>
          <p className="text-gray-600 mb-8">
            {conference.description && formatText(conference.description)}
          </p>
        </div>

        <div className="p-4 rounded border-1 border-lime-600/50">
          <h2 className="text-2xl text-lime-600 font-bold mb-2">
            Resolutions/Topics
          </h2>
          <p className="text-gray-600 mb-8">
            {conference.issues && formatText(conference.issues)}
          </p>
        </div>

        <div className="p-4 rounded border-1 border-lime-600/50">
          <h2 className="text-2xl text-lime-600 font-bold mb-2">
            Issues Discussed
          </h2>
          <p className="text-gray-600 mb-8">
            {conference.resolutions && formatText(conference.resolutions)}
          </p>
        </div>

        <div className="p-4 rounded border-1 border-lime-600/50">
          <h2 className="text-2xl text-lime-600 font-bold mb-2">
            Recommendations and conclusions
          </h2>
          <p className="text-gray-600 mb-8">
            {conference.recommendations &&
              formatText(conference.recommendations)}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  justify-end mt-4 gap-4">
        <button
          onClick={() => handleDownload()}
          className="ring ring-lime-600 flex items-center gap-2 justify-center hover:bg-white text-lime-600 hover:text-lime-700 font-bold py-2 px-4 rounded-md"
        >
          <FaDownload className="" />
          Download
        </button>

        <div id="pdf-container" style={{ display: "none" }}></div>
        <Link
          to={`/admin/conference/${conference.reference_number}/edit`}
          className="ring ring-lime-600 flex items-center gap-2 justify-center hover:bg-white text-lime-600 hover:text-lime-700 font-bold py-2 px-4 rounded-md"
        >
          <RiEdit2Line className="" />
          Update
        </Link>

        <button
          onClick={() => handleDelete()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
        >
          <RiDeleteBin2Line className="inline-block mr-1" />
          Delete
        </button>
      </div>

      {/* <div className="bg-white py-4 px-4 my-4 rounded border-1 border-lime-600/50">
        <h2 className="font-bold text-2xl px-4">Participants</h2>
        {conference.participants && conference.participants.length > 0 ? (
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
              {conference.participants.map((participant, index) => (
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
        ) : (
          <></>
        )}
      </div> */}
    </div>
  );
};

export default ConferenceDetail;
