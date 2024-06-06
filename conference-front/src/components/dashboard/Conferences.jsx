import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Section from "./Section";
import ConferencePagination from "../ConferencePagination";
import { AuthContext } from "./AuthContext";
import { Dna } from "react-loader-spinner";
import ConferenceCard from "../common/ConferenceCard";

const Conferences = () => {
  const [conferences, setConferences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState([]);

  const { backendUrl } = useContext(AuthContext);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    fetch(`${backendUrl}/conferences`, {
      credentials: "include",
    }).then((response) => {
      if (response.status < 400) {
        response.json().then((data) => {
          setConferences(data);
        });
      } else {
        // Error
      }
    });
  };

  function handleFilter(filterObject) {
    setFilter(filterObject);
  }

  const sortedConferences1 = conferences.sort((a, b) => {
    const [aMonth, aDate, aTime] = a.date.split(/[ ,-]+/);
    const [bMonth, bDate, bTime] = b.date.split(/[ ,-]+/);
    const aDateObj = new Date(`${aMonth} ${aDate} ${aTime}`);
    const bDateObj = new Date(`${bMonth} ${bDate} ${bTime}`);
    return aDateObj - bDateObj;
  });

  // Sort conferences by date in ascending order
  const sortedConferences = filter.sort_dir
    ? filter.sort_dir === "ascending"
      ? sortedConferences1
      : sortedConferences1.reverse()
    : conferences;

  const filteredConferences = filter.filter_by
    ? sortedConferences.filter((conf, idx) => {
        const [start, end] = conf.date
          .split(/\s+-\s+/)
          .map((d) => Date.parse(d));
        const [fStart, fEnd] = [
          Date.parse(filter.start_date),
          Date.parse(filter.end_date),
        ];

        let flag = false;

        if (filter.filter_by === "location") {
          flag = conf.city.toLowerCase().includes(filter.city.toLowerCase());
        } else {
          flag = start > fStart && end < fEnd;
        }

        return flag;
      })
    : sortedConferences;

  const conferencesPerPage = 6;
  const lastConferenceIndex = currentPage * conferencesPerPage;
  const firstConferenceIndex = lastConferenceIndex - conferencesPerPage;

  const uniqueLocations = Array.from(
    new Set(conferences.map((conf) => conf.city))
  );

  return (
    <div>
      <Section handleFilter={handleFilter} uniqueLocations={uniqueLocations} />
      {filteredConferences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4 p-4">
          {filteredConferences
            .slice(firstConferenceIndex, lastConferenceIndex)
            .map((conference, index) => (
              <ConferenceCard
                conference={conference}
                key={index}
                onClickUrl={"/admin/conference"}
              />
            ))}
        </div>
      ) : (
        <div className="py-12 font-bold flex flex-col items-center justify-center">
          <h2>No results</h2>
          <Dna />
        </div>
      )}

      <ConferencePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalConferences={filteredConferences.length}
        conferencesPerPage={conferencesPerPage}
      />
    </div>
  );
};

export default Conferences;
