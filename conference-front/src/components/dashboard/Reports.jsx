import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "./AuthContext";
import ConferenceChart from "./ConferenceChart";

import { BiLoader } from "react-icons/bi";
import { Card } from "react-bootstrap";
import { AnimatedChart } from "../common/charts/AnimatedChart";

function LoadingData({ text }) {
  return (
    <div className="min-h-[40vh] bg-slate-300 rounded-lg flex flex-grow items-center justify-center">
      <div className="flex items-center flex-col gap-2 text-blue-900 text-[2em]">
        <h2 className="">{text}</h2>
        <div className="animate-spin text-[2em]">
          <BiLoader />
        </div>
      </div>
    </div>
  );
}

function Reports() {
  const { backendUrl, snakeCaseToTitleCase } = useContext(AuthContext);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  months = [
    ...months.slice(months.indexOf(currentMonth)),
    ...months.slice(0, months.indexOf(currentMonth)),
  ];

  const [stats, setStats] = useState({});

  const routes = [
    { path: "/monthly/tally", title: "Monthly Summary" },
    { path: "/yearly/tally", title: "Yearly Summary" },
    {
      path: "/trend/foreign/vs/kenyan",
      title: "Progressive Attendance Trend",
    },
    {
      path: "/yearly/foreign/vs/kenyan",
      title: "Yearly Attendance Trend",
    },
    {
      path: "/monthly/foreign/vs/kenyan",
      title: "Monthly Attendance Trend",
    },
    {
      path: "/state_departments/conferences/participation",
      title: "Conferences Held",
    },
    {
      path: "/ministries/conferences/participation",
      title: "Conferences Held",
    },
    {
      path: "/state_departments/attendance/participation",
      title: "Conference Attendance",
    },
    {
      path: "/ministry/attendance/participation",
      title: "Conference Attendance",
    },
    { path: "/conferences/per/city", title: "Conferences Held" },
    { path: "/attendance/per/city", title: "Conference Attendance" },
    { path: "/conferences/present/datapoints", title: "Present Statistics" },
  ];

  const lime_700 = "#65a30d";
  const lime_800 = "rgb(63 98 18)";
  const red_800 = "#dc2626";

  const [monthlyTally, setMonthlyTally] = useState(null);

  const [yearlyTally, setYearlyTally] = useState(null);

  const [progressiveForeignVsKenyan, setProgressiveForeignVsKenyan] =
    useState(null);

  const [yearlyForeignVsKenyan, setYearlyForeignVsKenyan] = useState(null);

  const [monthlyForeignVsKenyan, setMonthlyForeignVsKenyan] = useState(null);

  const [stateDepartmentsConferenceTally, setStateDepartmentsConferenceTally] =
    useState(null);
  const [stateDepartmentsAttendanceTally, setStateDepartmentsAttendanceTally] =
    useState(null);

  const [ministriesConferenceTally, setMinistriesConferenceTally] =
    useState(null);
  const [ministriesAttendanceTally, setMinistriesAttendanceTally] =
    useState(null);

  const [conferencesPerCity, setConferencesPerCity] = useState(null);
  const [attendancePerCity, setAttendancePerCity] = useState(null);

  function fetchData(paths) {
    paths?.forEach((path, index) => {
      const url = path.path;
      const currentPath = path.path;
      fetch(`${backendUrl}${url}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        if (res.status < 400) {
          res.json().then((data) => {
            if (currentPath === "/monthly/tally") {
              // Handle the case for Monthly Summary
              setMonthlyTally({
                title: "Monthly Summary",
                graph_type: "bar",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Month",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Conferences",
                      },
                    },
                  },
                },
                data: {
                  labels: months,
                  datasets: [
                    {
                      label: "Number of conferences",
                      data: months.map((month) => data[month]),
                      borderColor: lime_800,
                      backgroundColor: red_800,
                    },
                  ],
                },
              });
            } else if (currentPath === "/yearly/tally") {
              // Handle the case for Yearly Summary
              const yrs = Object.keys(data);
              setYearlyTally({
                title: "Annual Summary",
                graph_type: "bar",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Year",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Conferences",
                      },
                    },
                  },
                },
                data: {
                  labels: yrs,
                  datasets: [
                    {
                      label: "Number of conferences",
                      data: yrs.map((yr) => data[yr]),
                      borderColor: lime_800,
                      backgroundColor: lime_800,
                    },
                  ],
                },
              });
            } else if (currentPath === "/trend/foreign/vs/kenyan") {
              // Handle the case for Progressive Trend in Conference Attendance
              setProgressiveForeignVsKenyan({
                title: "Progressive Trend in Conference Attendance",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Conference [ID]",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Participants",
                      },
                    },
                  },
                },
                data: {
                  labels: data.map((c) => c.id),
                  datasets: [
                    {
                      label: "Foreigners",
                      data: data.map((c) => c["Foreigners"]),
                      lineWidth: 1,
                      borderColor: red_800,
                      tension: 0.1,
                      fill: false,
                      backgroundColor: red_800,
                    },
                    {
                      label: "Kenyans",
                      data: data.map((c) => c["Kenyans"]),
                      lineWidth: 1,
                      borderColor: lime_700,
                      tension: 0.1,
                      fill: false,
                      backgroundColor: lime_700,
                    },
                  ],
                },
              });
            } else if (currentPath === "/yearly/foreign/vs/kenyan") {
              // Handle the case for Yearly Trend in Conference Attendance
              const yrs = Object.keys(data);

              setYearlyForeignVsKenyan({
                title: "Yearly Trend in Conference Attendance",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Year",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Participants",
                      },
                    },
                  },
                },
                data: {
                  labels: yrs,
                  datasets: [
                    {
                      label: "Foreigners",
                      data: yrs.map((yr) => data[yr]["Foreigners"]),
                      lineWidth: 1,
                      borderColor: red_800,
                      tension: 0.1,
                      fill: false,
                      backgroundColor: red_800,
                    },
                    {
                      label: "Kenyans",
                      data: yrs.map((yr) => data[yr]["Kenyans"]),
                      lineWidth: 1,
                      borderColor: lime_700,
                      tension: 0.1,
                      fill: false,
                      backgroundColor: lime_700,
                    },
                  ],
                },
              });
            } else if (currentPath === "/monthly/foreign/vs/kenyan") {
              // Handle the case for Monthly Trend in Conference Attendance
              months.forEach((month) => {
                if (!Boolean(data[month])) {
                  data[month] = {
                    Foreigners: 0,
                    Kenyans: 0,
                  };
                }
              });

              setMonthlyForeignVsKenyan({
                title: "Monthly Trend in Conference Attendance",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Month",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Participants",
                      },
                    },
                  },
                },
                data: {
                  labels: months,
                  datasets: [
                    {
                      label: "Foreigners",
                      data: months.map((month) => data[month]["Foreigners"]),
                      lineWidth: 1,
                      borderColor: red_800,
                      tension: 0.1,
                      fill: false,
                      backgroundColor: red_800,
                    },
                    {
                      label: "Kenyans",
                      data: months.map((month) => data[month]["Kenyans"]),
                      lineWidth: 1,
                      borderColor: lime_700,
                      tension: 0.1,
                      fill: false,
                      backgroundColor: lime_700,
                    },
                  ],
                },
              });
            } else if (
              currentPath === "/state_departments/conferences/participation"
            ) {
              // Handle the case for Conferences Held by State Department
              const datasets = [];
              let deps = [],
                vals = [];
              const ministries = Object.keys(data);

              ministries.forEach((ministry) => {
                const state_departments = Object.keys(data[ministry]);
                deps = [...deps, ...state_departments];
                const values = state_departments.map(
                  (dep) => data[ministry][dep]
                );

                vals = [...vals, ...values];
              });

              const sortedData = deps
                .map((dep, i) => ({ k: dep, v: vals[i] }))
                .sort((a, b) => b.v - a.v);

              datasets.push({
                label: "Number of conferences",
                data: sortedData.map((dt) => dt.v),
                backgroundColor: red_800,
                borderColor: lime_800,
              });

              setStateDepartmentsConferenceTally({
                graph_type: "line",
                title: "Conferences held by state departments",
                enlargeHeight: true,
                expandXL: true,
                options: {
                  indexAxis: "y",
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "Number of Conferences",
                      },
                    },
                    y: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "State Departments",
                      },
                    },
                  },
                },
                data: {
                  labels: sortedData.map((dt) =>
                    dt.k.replace(/^State Department (for|of)\s/i, "")
                  ),
                  datasets: datasets,
                },
              });
            } else if (
              currentPath === "/ministries/conferences/participation"
            ) {
              // Handle the case for Conferences Held by Ministry
              data.sort((a, b) => b.count - a.count);
              setMinistriesConferenceTally({
                title: "Conferences held by ministries",
                enlargeHeight: true,
                options: {
                  indexAxis: "y",
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "Number of Conferences",
                      },
                    },
                    y: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "Ministries",
                      },
                    },
                  },
                },
                data: {
                  labels: data.map((m) =>
                    m.ministry.replace(/Ministry of /i, "")
                  ),
                  datasets: [
                    {
                      label: "Number of conferences",
                      data: data.map((m) => m.count),
                      backgroundColor: red_800,
                      borderColor: lime_800,
                    },
                  ],
                },
              });
            } else if (
              currentPath === "/state_departments/attendance/participation"
            ) {
              // Handle the case for Conference Attendance by State Department
              const datasets = [];
              let state_deps = [];
              const ministries = Object.keys(data);

              let vals = [];

              ministries.forEach((ministry) => {
                const state_departments = Object.keys(data[ministry]);
                state_deps = [...state_deps, ...state_departments];
                const values = state_departments.map(
                  (dep) => data[ministry][dep]
                );

                vals = [...vals, ...values];
              });

              const sortedData = state_deps
                .map((dep, i) => ({ k: dep, v: vals[i] }))
                .sort((a, b) => b.v - a.v);

              datasets.push({
                label: "Number of participants",
                data: sortedData.map((dt) => dt.v),
                backgroundColor: red_800,
                borderColor: lime_800,
              });

              setStateDepartmentsAttendanceTally({
                enlargeHeight: true,
                expandXL: true,
                title: "State Departmental Attendance",
                graph_type: "line",
                options: {
                  indexAxis: "y",
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "Number of Participants",
                      },
                    },
                    y: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "State Departments",
                      },
                    },
                  },
                },
                data: {
                  labels: sortedData.map((dt) =>
                    dt.k.replace(/^State Department (for|of)\s/i, "")
                  ),
                  datasets: datasets,
                },
              });
            } else if (currentPath === "/ministry/attendance/participation") {
              // Handle the case for Conference Attendance by Ministry
              data.sort((a, b) => b.count - a.count);
              setMinistriesAttendanceTally({
                title: "Ministry Attendance",
                enlargeHeight: true,
                options: {
                  indexAxis: "y",
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "Number of Participants",
                      },
                    },
                    y: {
                      stacked: true,
                      title: {
                        display: true,
                        text: "Ministries",
                      },
                    },
                  },
                },

                data: {
                  labels: data.map((m) =>
                    m.ministry.replace(/Ministry of /i, "")
                  ),
                  datasets: [
                    {
                      label: "Number of participants",
                      data: data.map((m) => m.count),
                      backgroundColor: red_800,
                      borderColor: lime_800,
                    },
                  ],
                },
              });
            } else if (currentPath === "/conferences/per/city") {
              // Handle the case for Conferences Held by City
              const cities = Object.keys(data).sort(
                (a, b) => data[b] - data[a]
              );
              setConferencesPerCity({
                title: "Conferences Held",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Cities",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of conferences",
                      },
                    },
                  },
                },
                data: {
                  labels: cities,
                  datasets: [
                    {
                      label: "Number of conferences",
                      data: cities.map((c) => data[c]),
                      backgroundColor: red_800,
                      borderColor: lime_800,
                    },
                  ],
                },
              });
            } else if (currentPath === "/attendance/per/city") {
              // Handle the case for Conference Attendance by City
              const cities = Object.keys(data).sort(
                (a, b) => data[b] - data[a]
              );
              setAttendancePerCity({
                title: "Conference Attendance",
                options: {
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Cities",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Number of Participants",
                      },
                    },
                  },
                },
                data: {
                  labels: cities,
                  datasets: [
                    {
                      label: "Number of participants",
                      data: cities.map((c) => data[c]),
                      backgroundColor: red_800,
                      borderColor: lime_800,
                    },
                  ],
                },
              });
            } else if (currentPath === "/conferences/present/datapoints") {
              setStats(data);
            }
          });
        }
      });
    });
  }

  useEffect(() => {
    fetchData(routes);
  }, []);

  return (
    <div className="grid gap-4 bg-slate-800">
      <h2 className="px-4 text-white text-2xl font-bold">
        Conference analysis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
        {Object.keys(stats).map((k, i) => {
          return (
            <div key={i} className="bg-white rounded">
              <div className="flex flex-col justify-center items-center inset-0 z-40">
                <div className="font-bold">{snakeCaseToTitleCase(k)}</div>
                <div className="h-24 w-36 relative m-4">
                  <div className="rounded absolute bg-white z-40 flex items-center justify-center font-bold text-xl inset-0 border-2 border-lime-700">
                    {stats[k]}
                  </div>
                  <div className="rounded absolute z-30 inset-0 translate-x-4 translate-y-4 bg-lime-700"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-2xl text-center mb-4 text-white">
          Conferences by State Departments/Ministries
        </h2>
        <div className="grid md:grid-cols-2 gap-2 px-2">
          <Report data={monthlyTally} />
          <Report data={yearlyTally} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-center mb-4 text-white">
          Conference Attendance
        </h2>
        <div className="grid grid-cols-1 md_lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2">
          <Report data={yearlyForeignVsKenyan} />
          <Report data={monthlyForeignVsKenyan} />
          <Report last={true} data={progressiveForeignVsKenyan} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-center mb-4 text-white">
          Conferences held by State Departments/Ministries
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 p-2">
          <Report data={stateDepartmentsConferenceTally} />
          <Report data={ministriesConferenceTally} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-center mb-4 text-white">
          Attendance of conferences{" "}
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 p-2">
          <Report data={stateDepartmentsAttendanceTally} />
          <Report data={ministriesAttendanceTally} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-center mb-4 text-white">
          Trend in Conference attendance in Cities
        </h2>
        <div className="grid md:grid-cols-2 gap-2 p-2">
          <Report data={conferencesPerCity} />
          <Report data={attendancePerCity} />
        </div>
      </div>
    </div>
  );
}

function Report({ data, last = false }) {
  return (
    <div
      className={`relative bg-white shadow-lg shadow-black flex rounded-lg ${
        last && "md_lg:col-span-full"
      }`}
    >
      <div className="w-full items-center flex flex-grow justify-center hover:ring hover:ring-lime-700 rounded-lg transition-transform duration-100 ease-in-out">
        {data ? <ConferenceChart plot_data={data} /> : <LoadingData />}
      </div>
    </div>
  );
}

export { Reports, Report };
